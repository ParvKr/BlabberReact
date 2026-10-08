import { Icons } from '@/components/Icons'
import Link from 'next/link'

export default function Nav() {
  return (
    <header className='sticky top-0 z-10 border-b border-gray-100 bg-white/80 backdrop-blur'>
      <div className='mx-auto flex h-16 max-w-5xl items-center justify-between px-6'>
        <Link href='/' className='flex items-center gap-2'>
          <Icons.Logo className='h-6 w-auto text-indigo-600' />
          <span className='text-lg font-semibold tracking-tight text-gray-900'>
            Blabber
          </span>
        </Link>

        <Link
          href='/login'
          className='rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900'>
          Sign in
        </Link>
      </div>
    </header>
  )
}
