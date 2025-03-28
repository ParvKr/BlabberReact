'use client'

import { pusherClient } from '@/lib/pusher'
import { cn, toPusherKey } from '@/lib/utils'
import { Message } from '@/lib/validations/message'
import { format } from 'date-fns'
import Image from 'next/image'
import { FC, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Phone } from 'lucide-react' // Call icon

interface MessagesProps {
  initialMessages: Message[]
  sessionId: string
  chatId: string
  sessionImg: string | null | undefined
  chatPartner: User
}

const Messages: FC<MessagesProps> = ({
  initialMessages,
  sessionId,
  chatId,
  chatPartner,
  sessionImg,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const router = useRouter(); // For navigation

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`chat:${chatId}`))

    const messageHandler = (message: Message) => {
      setMessages((prev) => [message, ...prev])
    }

    pusherClient.bind('incoming-message', messageHandler)

    return () => {
      pusherClient.unsubscribe(toPusherKey(`chat:${chatId}`))
      pusherClient.unbind('incoming-message', messageHandler)
    }
  }, [chatId])

  const scrollDownRef = useRef<HTMLDivElement | null>(null)

  const formatTimestamp = (timestamp: number) => {
    return format(timestamp, 'HH:mm')
  }

  // Function to initiate a call
  const handleCall = () => {
    router.push(`/call/${chatPartner.id}`) // Navigate to call page with user ID
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header with Call Button */}
      <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
        <div className="flex items-center gap-2">
          <Image
            src={chatPartner.image}
            width={40}
            height={40}
            alt="User"
            className="rounded-full"
          />
          <h2 className="text-lg font-semibold">{chatPartner.name}</h2>
        </div>
        <button 
          onClick={handleCall} 
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          <Phone size={20} />
        </button>
      </div>

      {/* Chat Messages */}
      <div
        id='messages'
        className='flex-1 flex flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
        <div ref={scrollDownRef} />

        {messages.map((message, index) => {
          const isCurrentUser = message.senderId === sessionId
          const hasNextMessageFromSameUser =
            messages[index - 1]?.senderId === messages[index].senderId

          return (
            <div className='chat-message' key={`${message.id}-${message.timestamp}`}>
              <div className={cn('flex items-end', { 'justify-end': isCurrentUser })}>
                <div className={cn('flex flex-col space-y-2 text-base max-w-xs mx-2', {
                    'order-1 items-end': isCurrentUser,
                    'order-2 items-start': !isCurrentUser,
                  })}>
                  <span
                    className={cn('px-4 py-2 rounded-lg inline-block', {
                      'bg-indigo-600 text-white': isCurrentUser,
                      'bg-gray-200 text-gray-900': !isCurrentUser,
                      'rounded-br-none': !hasNextMessageFromSameUser && isCurrentUser,
                      'rounded-bl-none': !hasNextMessageFromSameUser && !isCurrentUser,
                    })}>
                    {message.text}{' '}
                    <span className='ml-2 text-xs text-gray-400'>
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </span>
                </div>

                <div className={cn('relative w-6 h-6', {
                    'order-2': isCurrentUser,
                    'order-1': !isCurrentUser,
                    invisible: hasNextMessageFromSameUser,
                  })}>
                  <Image
                    fill
                    src={isCurrentUser ? (sessionImg as string) : chatPartner.image}
                    alt='Profile picture'
                    referrerPolicy='no-referrer'
                    className='rounded-full'
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Messages
