import ChatPreview from '@/components/ChatPreview'

/** A small, decorative "app window" framing the animated conversation. */
export default function ChatWindow() {
  return (
    <div
      aria-hidden='true'
      className='mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-200/60'>
      <div className='flex items-center gap-3 border-b border-gray-100 px-5 py-4'>
        <div className='flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700'>
          PN
        </div>
        <div className='leading-tight'>
          <p className='text-sm font-semibold text-gray-900'>Priya Nair</p>
          <p className='flex items-center gap-1.5 text-xs text-gray-500'>
            <span className='h-1.5 w-1.5 rounded-full bg-green-500' />
            Product Lead
          </p>
        </div>
      </div>

      <div className='px-5 py-6'>
        <ChatPreview />
      </div>
    </div>
  )
}
