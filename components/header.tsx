import { HeaderLogo } from './header-logo'
import { Navigation } from './navigation'

export const Header = () => {
  return (
    <header className="flex items-center gap-x-16">
      <HeaderLogo />
      <Navigation />
    </header>
  )
}
