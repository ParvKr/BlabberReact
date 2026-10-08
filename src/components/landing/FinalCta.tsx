import LoginButton from '@/components/LoginButton'

export default function FinalCta() {
  return (
    <section className='border-t border-gray-100 bg-gray-50/60'>
      <div className='reveal mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-20 text-center'>
        <h2 className='max-w-lg text-3xl font-semibold tracking-tight text-gray-900'>
          Start a conversation that matters.
        </h2>
        <p className='max-w-md text-gray-500'>
          Free to use. Sign in with Google and invite your first connection.
        </p>
        <div className='w-full max-w-xs'>
          <LoginButton />
        </div>
      </div>
    </section>
  )
}
