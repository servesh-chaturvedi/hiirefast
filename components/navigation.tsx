'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

const routes = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Pricing',
    href: '/pricing',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
]
export const Navigation = () => {
  const pathname = usePathname()
  return (
    <nav className="flex items-center gap-x-2">
      {routes.map((route) => (
        <NavLink
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathname === route.href}
        />
      ))}
    </nav>
  )
}

type LinkProps = {
  href: string
  label: string
  isActive?: boolean
}
const NavLink = ({ href, label, isActive = false }: LinkProps) => {
  return (
    <Button asChild variant="ghost" size="sm">
      <Link href={href}>{label}</Link>
    </Button>
  )
}
