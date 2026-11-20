import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary'

const styles: Record<Variant, string> = {
  primary: 'bg-accent text-on-accent hover:brightness-110',
  secondary: 'border border-line-strong text-ink hover:border-ink hover:bg-raised',
}

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; children: ReactNode }

/** A link that looks like a button. It presses in on click. */
export function Button({ variant = 'primary', className = '', children, ...rest }: Props) {
  return (
    <a
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium transition-[background-color,border-color,filter,transform] duration-200 ease-out active:scale-[.97] ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}
