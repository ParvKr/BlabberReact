'use client'

import { pusherClient } from '@/lib/pusher-client'
import { cn, toPusherKey } from '@/lib/utils'
import { Message } from '@/lib/validations/message'
import { format } from 'date-fns'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'

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

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`chat:${chatId}`))

    const messageHandler = (message: Message) => {
      setMessages((prev) =>
        prev.some((m) => m.id === message.id) ? prev : [message, ...prev]
      )
    }

    pusherClient.bind('incoming-message', messageHandler)

    return () => {
      pusherClient.unsubscribe(toPusherKey(`chat:${chatId}`))
      pusherClient.unbind('incoming-message', messageHandler)
    }
  }, [chatId])

  const formatTimestamp = (timestamp: number) => {
    return format(timestamp, 'HH:mm')
  }

  return (
    <div className="flex flex-col h-full">
      <div
        id='messages'
        className='flex-1 flex flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
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
                  {(isCurrentUser ? sessionImg : chatPartner.image) ? (
                    <Image
                      fill
                      src={(isCurrentUser ? sessionImg : chatPartner.image) as string}
                      alt='Profile picture'
                      referrerPolicy='no-referrer'
                      className='rounded-full'
                    />
                  ) : null}
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
