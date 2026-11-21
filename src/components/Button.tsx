import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary'

const styles: Record<Variant, string> = {
  primary: 'bg-ink text-bg hover:bg-accent hover:text-on-accent',
  secondary: 'bg-card text-ink ring-1 ring-line-strong hover:ring-ink',
}

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; children: ReactNode }

/** A link that looks like a button; it presses in on click. */
export function Button({ variant = 'primary', className = '', children, ...rest }: Props) {
  return (
    <a
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 font-mono text-sm font-medium transition-[background-color,color,box-shadow,transform] duration-200 ease-out active:scale-[.97] ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}
