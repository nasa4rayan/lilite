import logo from '@/assets/logo.png'
import { cn } from '@/lib/utils'

interface LogoMarkProps {
  className?: string
  alt?: string
}

export function LogoMark({ className, alt = 'Lilite logo' }: LogoMarkProps) {
  return <img src={logo} alt={alt} className={cn('h-6 w-6 rounded object-cover', className)} loading="lazy" />
}
