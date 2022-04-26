import Link from 'next/link'
function Header() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between p-6">
      <div className="flex items-center space-x-12">
        <Link href="/">
          <img
            src="https://lever-client-logos.s3.us-west-2.amazonaws.com/762fd4bd-7d50-4ac3-80d3-bad44702bf87-1604363975963.png"
            alt="logo"
            className="my-0 w-44 cursor-pointer object-contain"
          />
        </Link>
        <div className="hidden items-center space-x-5 md:inline-flex">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="rounded-full bg-green-600 px-4 py-1 text-white">
            Follow
          </h3>
        </div>
      </div>
      <div className="flex items-center space-x-5">
        <h3>Sign In</h3>
        <h3 className="cursor-pointer rounded-full border border-green-600 px-4 py-1 hover:bg-green-600 ">
          Get Started
        </h3>
      </div>
    </header>
  )
}

export default Header
