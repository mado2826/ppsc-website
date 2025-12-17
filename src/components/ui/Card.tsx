import { ReactNode } from 'react'

interface CardProps {
  title?: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
  onClick?: () => void
  variant?: 'default' | 'elevated' | 'bordered'
  className?: string
}

export const Card = ({
  title,
  subtitle,
  children,
  footer,
  onClick,
  variant = 'default',
  className = '',
}: CardProps) => {
  const baseClasses = 'bg-gray-800 rounded-lg transition-all duration-200'
  
  const variantClasses = {
    default: 'border border-gray-700',
    elevated: 'shadow-lg shadow-black/20 border border-gray-700',
    bordered: 'border-2 border-primary-600',
  }

  const interactiveClasses = onClick
    ? 'cursor-pointer hover:bg-gray-700 hover:border-primary-500 hover:shadow-lg hover:shadow-primary-500/10'
    : ''

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${interactiveClasses} ${className}`}
      onClick={onClick}
    >
      {(title || subtitle) && (
        <div className="p-4 border-b border-gray-700">
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className={title || subtitle ? 'p-4' : 'p-4'}>{children}</div>
      {footer && (
        <div className="p-4 border-t border-gray-700 bg-gray-700/50 rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  )
}

