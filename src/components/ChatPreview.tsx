import { cn } from '@/lib/utils'

const bubbles = [
  { text: 'Can you review the proposal?', mine: false },
  { text: 'Sure, send it over', mine: true },
  { text: 'Just shared it. Thanks!', mine: false },
]

/** Decorative, purely presentational mini conversation for the login page. */
export default function ChatPreview() {
  return (
    <div
      aria-hidden='true'
      className='flex w-full max-w-xs select-none flex-col gap-2 text-sm'>
      {bubbles.map(({ text, mine }, i) => (
        <div
          key={text}
          style={{ animationDelay: `${0.4 + i * 0.7}s` }}
          className={cn(
            'animate-fade-up motion-reduce:animate-none w-fit max-w-[80%] rounded-2xl px-4 py-2',
            mine
              ? 'self-end rounded-br-md bg-indigo-600 text-white'
              : 'self-start rounded-bl-md bg-gray-100 text-gray-800'
          )}>
          {text}
        </div>
      ))}

      <div
        style={{ animationDelay: `${0.4 + bubbles.length * 0.7}s` }}
        className='animate-fade-up motion-reduce:animate-none flex w-fit items-center gap-1 self-end rounded-2xl rounded-br-md bg-indigo-600/10 px-4 py-3'>
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            style={{ animationDelay: `${dot * 0.15}s` }}
            className='animate-typing motion-reduce:animate-none h-1.5 w-1.5 rounded-full bg-indigo-600'
          />
        ))}
      </div>
    </div>
  )
}
