import Link from 'next/link'

const FirstPost = () => {
  return (
  <>
  <h1>First Post 🐒</h1>
  <h3>
  <Link href={'/'}>
      <a>Back to the Home page</a>
  </Link>
  </h3>
  </>
  )
}

export default FirstPost