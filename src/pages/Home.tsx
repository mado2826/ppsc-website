import { CountdownTimer } from '../components/shared/CountdownTimer'
import { Section } from '../components/ui/Section'
import { Button } from '../components/ui/Button'
import { useConfig } from '../hooks/useConfig'
import { Link } from 'react-router-dom'

export default function Home() {
  const config = useConfig()

  return (
    <div className="py-12 md:py-16">
      <Section>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
            {config.siteName}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            {config.siteDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/competition">
              <Button variant="primary" size="lg">
                Learn More
              </Button>
            </Link>
            <Link to="/practice">
              <Button variant="outline" size="lg">
                Practice Tests
              </Button>
            </Link>
          </div>
        </div>

        <div className="mb-12">
          <CountdownTimer />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">Monthly Competitions</h3>
            <p className="text-gray-400">
              Participate in our monthly physics competitions and test your knowledge.
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">Practice Tests</h3>
            <p className="text-gray-400">
              Prepare with categorized practice tests covering all physics topics.
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">Leaderboard</h3>
            <p className="text-gray-400">
              Compete with others and see how you rank on our leaderboard.
            </p>
          </div>
        </div>
      </Section>
    </div>
  )
}

