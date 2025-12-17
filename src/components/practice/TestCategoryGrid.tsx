import { PracticeTestCategory } from '../../types'
import { TestCard } from './TestCard'
import { Section } from '../ui/Section'
import { Card } from '../ui/Card'

interface TestCategoryGridProps {
  categories: PracticeTestCategory[]
}

export const TestCategoryGrid = ({ categories }: TestCategoryGridProps) => {
  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <Section
          key={category.id}
          title={category.name}
          subtitle={category.description}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.tests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        </Section>
      ))}
    </div>
  )
}

