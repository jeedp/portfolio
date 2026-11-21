import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary'

const styles: Record<Variant, string> = {
  primary: 'bg-ink text-bg hover:bg-accent hover:text-on-accent',
  secondary: 'border border-line-strong bg-card text-ink hover:border-ink/40 hover:bg-card-hover',
}

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; children: ReactNode }

/** A link that looks like a button; colour shifts on hover and it presses in on click. */
export function Button({ variant = 'primary', className = '', children, ...rest }: Props) {
  return (
    <a
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-[background-color,color,border-color,transform] duration-200 ease-out active:scale-[.97] ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}
