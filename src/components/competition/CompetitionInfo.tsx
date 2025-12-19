import { useConfig } from '../../hooks/useConfig'
import { getCurrentCompetition } from '../../config/competitionConfig'
import { Section } from '../ui/Section'
import { GoogleFormEmbed } from '../shared/GoogleFormEmbed'
import { Card } from '../ui/Card'
import { formatDateRange } from '../../utils/dateUtils'

export const CompetitionInfo = () => {
  const config = useConfig()
  const currentCompetition = getCurrentCompetition()

  return (
    <div className="py-8">
      <Section
        title="Competition Information"
        subtitle="Learn about the competition format, rules, and how to participate"
      >
        <div className="space-y-8">
          {/* Current Competition */}
          {currentCompetition && (
            <Card title="Current Competition" variant="elevated">
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {currentCompetition.name}
                  </h4>
                  <p className="text-gray-300">{currentCompetition.description}</p>
                </div>
                <div className="text-sm text-gray-400">
                  <p>Date: {formatDateRange(currentCompetition.startDate, currentCompetition.endDate)}</p>
                  {currentCompetition.registrationDeadline && (
                    <p>
                      Registration Deadline:{' '}
                      {new Date(currentCompetition.registrationDeadline).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Rules */}
          <Card title="Competition Rules" variant="elevated">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Format</h4>
                <p className="text-gray-300">{config.rules.format}</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Duration</h4>
                <p className="text-gray-300">{config.rules.duration}</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Scoring</h4>
                <p className="text-gray-300 whitespace-pre-line">{config.rules.scoring}</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Eligibility</h4>
                <p className="text-gray-300">{config.rules.eligibility}</p>
              </div>
            </div>
          </Card>

          {/* Registration Form */}
          {config.forms.registration && (
            <div>
              <GoogleFormEmbed
                formUrl={config.forms.registration}
                title="Registration Form"
                height={800}
              />
            </div>
          )}
        </div>
      </Section>
    </div>
  )
}

