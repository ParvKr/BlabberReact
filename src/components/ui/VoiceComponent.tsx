'use client';

import { useConversation } from '@11labs/react';
import { useCallback } from 'react';

export function VoiceComponent() {
  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
  });

  const startConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID as string,
      });

    } catch (error) {
      console.error('Failed to start conversation:', (error as Error).message, error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white shadow-lg rounded-xl border border-gray-200">
    <h2 className="text-md font-semibold leading-6 text-gray-950">AI Assistant Eric</h2>

      <div className="flex gap-3">
        <button
          onClick={startConversation}
          disabled={conversation.status === 'connected'}
          className={`px-5 py-2 rounded-lg font-medium transition-all ${
            conversation.status === 'connected'
              ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Start
        </button>

        <button
          onClick={stopConversation}
          disabled={conversation.status !== 'connected'}
          className={`px-5 py-2 rounded-lg font-medium transition-all ${
            conversation.status !== 'connected'
              ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          Stop
        </button>
      </div>
    </div>
  );
}
