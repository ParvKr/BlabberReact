import ChatInput from '@/components/ChatInput'
import Messages from '@/components/Messages'
import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { messageArrayValidator } from '@/lib/validations/message'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ chatId: string }>
}

/** Resolves the other participant of the chat, or 404s if the user may not see it. */
async function getChatPartner(chatId: string) {
  const session = await getServerSession(authOptions)
  if (!session) notFound()

  const [userId1, userId2] = chatId.split('--')
  const { user } = session

  if (user.id !== userId1 && user.id !== userId2) notFound()

  const chatPartnerId = user.id === userId1 ? userId2 : userId1
  const chatPartnerRaw = (await fetchRedis('get', `user:${chatPartnerId}`)) as
    | string
    | null
  if (!chatPartnerRaw) notFound()

  return { session, chatPartner: JSON.parse(chatPartnerRaw) as User }
}

export async function generateMetadata({ params }: PageProps) {
  const { chatId } = await params
  const { chatPartner } = await getChatPartner(chatId)

  return { title: `Blabber | ${chatPartner.name}` }
}

async function getChatMessages(chatId: string) {
  try {
    const results: string[] = await fetchRedis(
      'zrange',
      `chat:${chatId}:messages`,
      0,
      -1
    )

    // the UI renders newest-first (flex-col-reverse)
    const dbMessages = results.map((message) => JSON.parse(message)).reverse()

    return messageArrayValidator.parse(dbMessages)
  } catch {
    notFound()
  }
}

export default async function Page({ params }: PageProps) {
  const { chatId } = await params
  const { session, chatPartner } = await getChatPartner(chatId)
  const initialMessages = await getChatMessages(chatId)

  return (
    <div className='flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)]'>
      <div className='flex sm:items-center justify-between py-3 border-b-2 border-gray-200'>
        <div className='relative flex items-center space-x-4'>
          <div className='relative'>
            <div className='relative w-8 sm:w-12 h-8 sm:h-12'>
              <Image
                fill
                referrerPolicy='no-referrer'
                src={chatPartner.image}
                alt={`${chatPartner.name} profile picture`}
                className='rounded-full'
              />
            </div>
          </div>

          <div className='flex flex-col leading-tight'>
            <div className='text-xl flex items-center'>
              <span className='text-gray-700 mr-3 font-semibold'>
                {chatPartner.name}
              </span>
            </div>
            <span className='text-sm text-gray-600'>{chatPartner.email}</span>
          </div>
        </div>
      </div>

      <Messages
        chatId={chatId}
        chatPartner={chatPartner}
        sessionImg={session.user.image}
        sessionId={session.user.id}
        initialMessages={initialMessages}
      />
      <ChatInput chatId={chatId} chatPartner={chatPartner} />
    </div>
  )
}
