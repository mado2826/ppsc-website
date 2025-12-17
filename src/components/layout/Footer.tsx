import { useConfig } from '../../hooks/useConfig'

export const Footer = () => {
  const config = useConfig()

  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              {config.siteName}
            </h3>
            <p className="text-gray-400 text-sm">{config.siteDescription}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/competition"
                  className="text-gray-400 hover:text-primary-400 text-sm transition-colors"
                >
                  Competition Info
                </a>
              </li>
              <li>
                <a
                  href="/practice"
                  className="text-gray-400 hover:text-primary-400 text-sm transition-colors"
                >
                  Practice Tests
                </a>
              </li>
              <li>
                <a
                  href="/leaderboard"
                  className="text-gray-400 hover:text-primary-400 text-sm transition-colors"
                >
                  Leaderboard
                </a>
              </li>
              <li>
                <a
                  href="/archive"
                  className="text-gray-400 hover:text-primary-400 text-sm transition-colors"
                >
                  Archive
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <p className="text-gray-400 text-sm">
              For questions or support, please visit our{' '}
              <a
                href="/contributors"
                className="text-primary-400 hover:text-primary-300"
              >
                Contributors
              </a>{' '}
              page.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {config.siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

