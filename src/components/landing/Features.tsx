import { BellRing, MessageSquare, UserCheck } from 'lucide-react'

const features = [
  {
    Icon: MessageSquare,
    title: 'Real-time messaging',
    description:
      'Direct one-to-one conversations where messages arrive the moment they are sent.',
  },
  {
    Icon: UserCheck,
    title: 'Connect by invitation',
    description:
      'Add someone by email and they choose to accept. Only people you approve can message you.',
  },
  {
    Icon: BellRing,
    title: 'Never miss a message',
    description:
      'Unread badges and instant notifications keep you on top of every conversation.',
  },
]

export default function Features() {
  return (
    <section className='border-t border-gray-100 bg-gray-50/60'>
      <div className='mx-auto max-w-5xl px-6 py-20'>
        <div className='reveal max-w-xl'>
          <p className='text-sm font-medium text-indigo-600'>Features</p>
          <h2 className='mt-2 text-3xl font-semibold tracking-tight text-gray-900'>
            Everything you need, nothing you don&apos;t.
          </h2>
        </div>

        <div className='mt-12 grid gap-6 md:grid-cols-3'>
          {features.map(({ Icon, title, description }) => (
            <div
              key={title}
              className='reveal rounded-2xl border border-gray-200 bg-white p-6'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600'>
                <Icon className='h-5 w-5' />
              </div>
              <h3 className='mt-5 text-base font-semibold text-gray-900'>
                {title}
              </h3>
              <p className='mt-2 text-sm leading-6 text-gray-500'>
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
