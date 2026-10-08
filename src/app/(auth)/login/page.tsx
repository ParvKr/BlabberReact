import ChatPreview from '@/components/ChatPreview'
import { Icons } from '@/components/Icons'
import LoginButton from '@/components/LoginButton'

export const metadata = {
  title: 'Blabber | Sign in',
}

interface PageProps {
  searchParams: Promise<{ error?: string }>
}

export default async function Page({ searchParams }: PageProps) {
  // NextAuth redirects here with ?error=... when a sign-in fails
  const { error } = await searchParams

  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-14 px-6 py-16'>
      <div className='flex w-full max-w-xs flex-col items-center gap-8 text-center'>
        <div className='flex flex-col items-center gap-4'>
          <Icons.Logo className='h-9 w-auto text-indigo-600' />
          <h1 className='text-4xl font-semibold tracking-tight text-gray-900'>
            Blabber
          </h1>
          <p className='text-base text-gray-500'>
            Focused, real-time chat for professionals.
          </p>
        </div>

        <div className='flex w-full flex-col items-center gap-3'>
          <LoginButton />
          {error ? (
            <p role='alert' className='text-sm text-red-600'>
              We couldn&apos;t sign you in. Please try again.
            </p>
          ) : null}
        </div>
      </div>

      <ChatPreview />
    </main>
  )
}
