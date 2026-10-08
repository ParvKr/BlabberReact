'use client'

import { useConversation } from '@elevenlabs/react'
import { useCallback } from 'react'
import Button from './Button'

export function VoiceComponent() {
  const conversation = useConversation({
    onError: (error) => console.error('Voice assistant error:', error),
  })

  const isConnected = conversation.status === 'connected'

  const startConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })

      await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID as string,
        connectionType: 'webrtc',
      })
    } catch (error) {
      console.error('Failed to start conversation:', error)
    }
  }, [conversation])

  const stopConversation = useCallback(async () => {
    await conversation.endSession()
  }, [conversation])

  return (
    <div className='flex flex-col items-center gap-3 w-full max-w-md p-4 bg-white shadow-lg rounded-xl border border-gray-200'>
      <h2 className='text-md font-semibold leading-6 text-gray-950'>
        AI Assistant Eric
      </h2>

      <div className='flex gap-3'>
        <Button onClick={startConversation} disabled={isConnected}>
          Start
        </Button>
        <Button
          variant='ghost'
          onClick={stopConversation}
          disabled={!isConnected}>
          Stop
        </Button>
      </div>
    </div>
  )
}
