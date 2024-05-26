import Image from 'next/image'
import Link from 'next/link'

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="logo" width={28} height={28} priority />
        <span className="text-2xl font-semibold hidden md:block">
          Hiirefast
        </span>
      </div>
    </Link>
  )
}
