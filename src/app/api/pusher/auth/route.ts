import { authOptions } from '@/lib/auth'
import { pusherServer } from '@/lib/pusher-server'
import { toPusherKey } from '@/lib/utils'
import { getServerSession } from 'next-auth'

/**
 * A user may only subscribe to channels that belong to them:
 *  - their own `user:{id}:*` channels
 *  - `chat:{idA}--{idB}` channels they are one of the two participants of
 */
function canSubscribe(userId: string, channelName: string) {
  const ownChannels = ['chats', 'friends', 'incoming_friend_requests'].map(
    (suffix) => toPusherKey(`user:${userId}:${suffix}`)
  )
  if (ownChannels.includes(channelName)) return true

  const chatPrefix = toPusherKey('chat:')
  if (channelName.startsWith(chatPrefix)) {
    const participants = channelName.slice(chatPrefix.length).split('--')
    return participants.length === 2 && participants.includes(userId)
  }

  return false
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return new Response('Unauthorized', { status: 401 })

  const data = await req.formData()
  const socketId = data.get('socket_id')
  const channelName = data.get('channel_name')

  if (typeof socketId !== 'string' || typeof channelName !== 'string') {
    return new Response('Invalid request', { status: 400 })
  }

  if (!canSubscribe(session.user.id, channelName)) {
    return new Response('Forbidden', { status: 403 })
  }

  return Response.json(pusherServer.authorizeChannel(socketId, channelName))
}
