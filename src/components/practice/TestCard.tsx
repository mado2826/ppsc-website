import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { PracticeTest } from '../../types'

interface TestCardProps {
  test: PracticeTest
  onClick?: () => void
}

export const TestCard = ({ test, onClick }: TestCardProps) => {
  const difficultyColors = {
    beginner: 'success',
    intermediate: 'primary',
    advanced: 'accent',
  } as const

  return (
    <Card
      title={test.title}
      variant="elevated"
      onClick={onClick}
      className="h-full"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant={difficultyColors[test.difficulty]}>
            {test.difficulty.charAt(0).toUpperCase() + test.difficulty.slice(1)}
          </Badge>
          <span className="text-sm text-gray-400">
            {test.duration} min
          </span>
        </div>

        {test.questions && (
          <p className="text-sm text-gray-400">
            {test.questions} questions
          </p>
        )}

        {test.link && (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={(e) => {
              e.stopPropagation()
              if (test.link) {
                window.open(test.link, '_blank', 'noopener,noreferrer')
              }
            }}
          >
            Start Test
          </Button>
        )}
      </div>
    </Card>
  )
}

