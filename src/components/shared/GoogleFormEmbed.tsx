import { useState } from 'react'

interface GoogleFormEmbedProps {
  formUrl: string
  height?: number
  title?: string
}

export const GoogleFormEmbed = ({
  formUrl,
  height = 600,
  title = 'Registration Form',
}: GoogleFormEmbedProps) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Convert form URL to embed format if needed
  const embedUrl = formUrl.includes('/viewform')
    ? formUrl.replace('/viewform', '/viewform?embedded=true')
    : formUrl.includes('?')
    ? `${formUrl}&embedded=true`
    : `${formUrl}?embedded=true`

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      )}
      <div className="relative w-full rounded-lg overflow-hidden border border-gray-700 bg-gray-800">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <div className="text-gray-400">Loading form...</div>
          </div>
        )}
        {error ? (
          <div className="p-8 text-center">
            <p className="text-red-400 mb-4">Failed to load form</p>
            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 underline"
            >
              Open form in new tab
            </a>
          </div>
        ) : (
          <iframe
            src={embedUrl}
            width="100%"
            height={height}
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            onLoad={() => setLoading(false)}
            onError={() => {
              setError(true)
              setLoading(false)
            }}
            className="w-full"
            title={title}
          />
        )}
      </div>
    </div>
  )
}

