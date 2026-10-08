export default function Footer() {
  return (
    <footer className='border-t border-gray-100'>
      <div className='mx-auto flex max-w-5xl items-center justify-between px-6 py-8 text-sm text-gray-500'>
        <p>&copy; {new Date().getFullYear()} Blabber</p>
        <a
          href='https://github.com/ParvKr/BlabberReact'
          target='_blank'
          rel='noopener noreferrer'
          className='transition-colors hover:text-gray-900'>
          GitHub
        </a>
      </div>
    </footer>
  )
}
