import { ReactNode } from 'react'

interface SectionProps {
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export const Section = ({
  title,
  subtitle,
  children,
  className = '',
}: SectionProps) => {
  return (
    <section className={`py-8 md:py-12 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-8">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-gray-400 whitespace-pre-line">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </section>
  )
}

