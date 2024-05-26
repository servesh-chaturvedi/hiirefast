'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useMedia } from 'react-use'
import { useState } from 'react'
import { Menu } from 'lucide-react'

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
  const [isOpen, setIsOpen] = useState(false)

  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useMedia('(max-width: 768px)', false)

  const onClick = (href: string) => {
    router.push(href)
    setIsOpen(false)
  }

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button variant="ghost">
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-2">
          <nav className="flex flex-col gap-2 mt-12">
            {routes.map((r) => (
              <Button
                key={r.href}
                variant={r.href === pathname ? 'secondary' : 'ghost'}
                onClick={() => onClick(r.href)}
              >
                {r.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    )
  }

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
    <Button asChild variant="ghost" className="text-base">
      <Link href={href}>{label}</Link>
    </Button>
  )
}
