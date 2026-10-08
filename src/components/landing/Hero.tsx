import LoginButton from '@/components/LoginButton'
import ChatWindow from './ChatWindow'

export default function Hero() {
  return (
    <section className='mx-auto grid max-w-5xl items-center gap-14 px-6 py-20 md:grid-cols-2 md:py-28'>
      <div className='flex flex-col items-start gap-6'>
        <h1 className='text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl md:leading-[1.1]'>
          Professional conversations, without the noise.
        </h1>
        <p className='max-w-md text-lg text-gray-500'>
          Blabber is a focused messaging app for people who work. Connect by
          invitation, chat in real time, and keep every conversation in one
          place.
        </p>
        <div className='w-full max-w-xs'>
          <LoginButton />
        </div>
      </div>

      <ChatWindow />
    </section>
  )
}
