import { Link } from 'react-router-dom'
import { useConfig } from '../../hooks/useConfig'

export const Footer = () => {
  const config = useConfig()

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
                <Link
                  to="/competition"
                  onClick={handleLinkClick}
                  className="text-gray-400 hover:text-primary-400 text-sm transition-colors"
                >
                  Competition Info
                </Link>
              </li>
              <li>
                <Link
                  to="/practice"
                  onClick={handleLinkClick}
                  className="text-gray-400 hover:text-primary-400 text-sm transition-colors"
                >
                  Practice Tests
                </Link>
              </li>
              <li>
                <Link
                  to="/leaderboard"
                  onClick={handleLinkClick}
                  className="text-gray-400 hover:text-primary-400 text-sm transition-colors"
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  to="/archive"
                  onClick={handleLinkClick}
                  className="text-gray-400 hover:text-primary-400 text-sm transition-colors"
                >
                  Archive
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <p className="text-gray-400 text-sm">
              For questions or support, please visit our{' '}
              <Link
                to="/contributors"
                onClick={handleLinkClick}
                className="text-primary-400 hover:text-primary-300"
              >
                Contributors
              </Link>{' '}
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

