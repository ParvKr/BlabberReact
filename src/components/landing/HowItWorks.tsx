const steps = [
  {
    title: 'Sign in with Google',
    description: 'One click, no new password to remember.',
  },
  {
    title: 'Send a connection request',
    description: 'Enter a colleague’s email and wait for them to accept.',
  },
  {
    title: 'Start the conversation',
    description: 'Once connected, you can message each other instantly.',
  },
]

export default function HowItWorks() {
  return (
    <section className='mx-auto max-w-5xl px-6 py-20'>
      <div className='reveal max-w-xl'>
        <p className='text-sm font-medium text-indigo-600'>How it works</p>
        <h2 className='mt-2 text-3xl font-semibold tracking-tight text-gray-900'>
          Up and running in a minute.
        </h2>
      </div>

      <ol className='mt-12 grid gap-10 md:grid-cols-3'>
        {steps.map(({ title, description }, i) => (
          <li key={title} className='reveal'>
            <span className='text-sm font-medium tabular-nums text-gray-400'>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className='mt-3 border-t border-gray-200 pt-4'>
              <h3 className='text-base font-semibold text-gray-900'>{title}</h3>
              <p className='mt-2 text-sm leading-6 text-gray-500'>
                {description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
