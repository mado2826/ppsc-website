import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: boolean
  className?: string
}

export const Container = ({
  children,
  maxWidth = 'xl',
  padding = true,
  className = '',
}: ContainerProps) => {
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  }

  return (
    <div
      className={`mx-auto ${maxWidthClasses[maxWidth]} ${
        padding ? 'px-4 sm:px-6 lg:px-8' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

