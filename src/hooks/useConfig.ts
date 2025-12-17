import { competitionConfig } from '../config/competitionConfig'
import { CompetitionConfig } from '../types'

/**
 * Hook to access the competition configuration
 * Returns the full config object
 */
export const useConfig = (): CompetitionConfig => {
  return competitionConfig
}

/**
 * Hook to get competitions
 */
export const useCompetitions = () => {
  return competitionConfig.competitionDates
}

/**
 * Hook to get practice tests
 */
export const usePracticeTests = () => {
  return competitionConfig.practiceTests.categories
}

/**
 * Hook to get contributors
 */
export const useContributors = () => {
  return competitionConfig.contributors
}

