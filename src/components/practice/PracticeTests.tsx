import { usePracticeTests } from '../../hooks/useConfig'
import { TestCategoryGrid } from './TestCategoryGrid'
import { Section } from '../ui/Section'

export const PracticeTests = () => {
  const categories = usePracticeTests()

  return (
    <div className="py-8">
      <Section
        title="Practice Tests"
        subtitle="Prepare for the competition with categorized practice tests"
      >
        <TestCategoryGrid categories={categories} />
      </Section>
    </div>
  )
}

