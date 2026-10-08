import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { pusherServer } from '@/lib/pusher-server'
import { toPusherKey } from '@/lib/utils'
import {
  Message,
  messageValidator,
  sendMessageValidator,
} from '@/lib/validations/message'
import { nanoid } from 'nanoid'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return new Response('Unauthorized', { status: 401 })

    const { text, chatId } = sendMessageValidator.parse(await req.json())

    const [userId1, userId2] = chatId.split('--')

    if (session.user.id !== userId1 && session.user.id !== userId2) {
      return new Response('Unauthorized', { status: 401 })
    }

    const friendId = session.user.id === userId1 ? userId2 : userId1

    const isFriend = (await fetchRedis(
      'sismember',
      `user:${session.user.id}:friends`,
      friendId
    )) as 0 | 1

    if (!isFriend) {
      return new Response('Unauthorized', { status: 401 })
    }

    const rawSender = (await fetchRedis(
      'get',
      `user:${session.user.id}`
    )) as string
    const sender = JSON.parse(rawSender) as User

    const timestamp = Date.now()

    const messageData: Message = {
      id: nanoid(),
      senderId: session.user.id,
      text,
      timestamp,
    }

    const message = messageValidator.parse(messageData)

    // persist first so a failed write never leaves a "ghost" message on clients
    await db.zadd(`chat:${chatId}:messages`, {
      score: timestamp,
      member: JSON.stringify(message),
    })

    // notify all connected chat room clients
    await Promise.all([
      pusherServer.trigger(
        toPusherKey(`chat:${chatId}`),
        'incoming-message',
        message
      ),
      pusherServer.trigger(toPusherKey(`user:${friendId}:chats`), 'new_message', {
        ...message,
        senderImg: sender.image,
        senderName: sender.name,
      }),
    ])

    return new Response('OK')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request payload', { status: 422 })
    }

    return new Response('Internal Server Error', { status: 500 })
  }
}
