import { CompetitionConfig } from '../types'
import { format, parseISO, isAfter, isBefore, isWithinInterval, startOfToday } from 'date-fns'

// Single comprehensive configuration file
// Update all competition-specific data here
export const competitionConfig: CompetitionConfig = {
  // Site metadata
  siteName: 'North Carolina Physics Olympiad',
  siteDescription: 'A monthly recurring physics competition for students and enthusiasts',

  // Competition schedule
  // IMPORTANT: id must be in YYYY-MM format to match competition_id in Google Sheets
  competitionDates: [
    // {
    //   id: '2024-01',
    //   date: '2024-01-15T10:00:00Z',
    //   name: 'January 2024 Competition',
    //   description: 'Mechanics and Kinematics',
    //   registrationDeadline: '2024-01-10T23:59:59Z',
    //   status: 'past',
    // },
    // {
    //   id: '2024-02',
    //   date: '2024-02-15T10:00:00Z',
    //   name: 'February 2024 Competition',
    //   description: 'Electromagnetism',
    //   registrationDeadline: '2024-02-10T23:59:59Z',
    //   status: 'past',
    // },
    // {
    //   id: '2024-03',
    //   date: '2024-03-15T10:00:00Z',
    //   name: 'March 2024 Competition',
    //   description: 'Thermodynamics and Waves',
    //   registrationDeadline: '2024-03-10T23:59:59Z',
    //   status: 'current',
    // },
    {
      id: '2026-01',
      startDate: '2026-01-10T05:00:00Z',
      endDate: '2026-01-17T23:59:59Z',
      name: 'January 2026 Competition',
      description: 'First competition of the year!',
      registrationDeadline: '2025-12-31T23:59:59Z',
      countdownTarget: 'start',
      status: 'upcoming',
    },
  ],

  // Google Forms
  forms: {
    registration: 'https://docs.google.com/forms/d/e/1FAIpQLSeaGqVKQ4kgsVsWJlATgjXjFPpyAzNUzwQGr7rt6XQLQNNKOg/viewform?usp=header',
    surveys: [
      'https://forms.gle/example-survey-1',
      'https://forms.gle/example-survey-2',
    ],
    feedback: 'https://forms.gle/example-feedback-form',
  },

  // Google Sheets Integration
  // Option 1: Use webAppUrl (Recommended - more secure)
  // Option 2: Use apiKey with public sheet
  googleSheets: {
    leaderboardSheetId: 'YOUR_GOOGLE_SHEET_ID_HERE',
    // For Google Apps Script Web App (recommended):
    webAppUrl: 'https://script.google.com/macros/s/YOUR_WEB_APP_ID/exec',
    // OR for direct API access (requires public sheet):
    // apiKey: 'YOUR_API_KEY_HERE',
    range: 'Leaderboard!A1:H1000', // Adjust range as needed
  },

  // Competition rules & info
  rules: {
    format: 'Online, timed competition with 25 multiple choice questions.',
    duration: '1 week',
    scoring: [ '4 points awarded per correct answer for the first 20 questions', 
               '6 points awarded per correct answer for the last 5 questions', 
               '1 points awarded for a blank answer',
               'No pentalty for incorrect answers.' ].join('; '),
    eligibility: 'Open to all high school students who are physics enthusiasts.',
  },

  // Practice tests
  practiceTests: {
    categories: [
      {
        id: 'mechanics',
        name: 'Mechanics',
        description: 'Kinematics, dynamics, energy, momentum, and rotational motion',
        tests: [
        //   {
        //     id: 'mech-1',
        //     title: 'Kinematics Basics',
        //     duration: 30,
        //     difficulty: 'beginner',
        //     questions: 10,
        //     link: 'https://example.com/test/mech-1',
        //   },
        //   {
        //     id: 'mech-2',
        //     title: 'Newton\'s Laws',
        //     duration: 45,
        //     difficulty: 'intermediate',
        //     questions: 15,
        //     link: 'https://example.com/test/mech-2',
        //   },
        //   {
        //     id: 'mech-3',
        //     title: 'Energy and Momentum',
        //     duration: 60,
        //     difficulty: 'advanced',
        //     questions: 20,
        //     link: 'https://example.com/test/mech-3',
        //   },
        ],
      },
      {
        id: 'electromagnetism',
        name: 'Electromagnetism',
        description: 'Electric fields, magnetic fields, circuits, and electromagnetic waves',
        tests: [
        //   {
        //     id: 'em-1',
        //     title: 'Electric Fields',
        //     duration: 30,
        //     difficulty: 'beginner',
        //     questions: 10,
        //     link: 'https://example.com/test/em-1',
        //   },
        //   {
        //     id: 'em-2',
        //     title: 'Magnetic Fields',
        //     duration: 45,
        //     difficulty: 'intermediate',
        //     questions: 15,
        //     link: 'https://example.com/test/em-2',
        //   },
        ],
      },
      {
        id: 'thermodynamics',
        name: 'Thermodynamics',
        description: 'Heat, temperature, entropy, and thermodynamic processes',
        tests: [
        //   {
        //     id: 'thermo-1',
        //     title: 'Heat and Temperature',
        //     duration: 30,
        //     difficulty: 'beginner',
        //     questions: 10,
        //     link: 'https://example.com/test/thermo-1',
        //   },
        ],
      },
    ],
  },

  // Contributors
  contributors: [
    {
      id: 'contrib-1',
      name: 'Dillan Garner',
      role: 'PPSC President, Cofounder, Logistics Lead',
      affiliation: 'NCSSM',
      email: 'garner27d@ncssm.edu',
    },
    {
      id: 'contrib-2',
      name: 'Nikhil Mehta',
      role: 'PPSC President, Cofounder, Logistics Lead',
      affiliation: 'NCSSM',
      email: 'mehta27n@ncssm.edu',
    },
    {
      id: 'contrib-3',
      name: 'David Osinuga',
      role: 'PPSC Vice President, Cofounder, Logistics Lead, Web Developer',
      affiliation: 'NCSSM',
      email: 'osinuga27m@ncssm.edu',
    },
    {
      id: 'contrib-4',
      name: 'Pranava Kumar',
      role: 'PPSC Co-President, Marketing Lead',
      affiliation: 'NCSSM',
      email: 'kumar27p@ncssm.edu',
    },
  ],

  // Leaderboard settings
  leaderboard: {
    topPerformersCount: 3,
    defaultSortBy: 'score',
    showUnpublished: false, // Only show results where results_published = TRUE
  },

  // Theme customization (optional)
  theme: {
    primaryColor: '#0284c7', // blue-600
    accentColor: '#a855f7',  // purple-500
  },
}

// Helper functions to access competition data
export const getNextCompetitionDate = (): Date | null => {
  const today = startOfToday()
  const upcoming = competitionConfig.competitionDates
    .map(c => {
      const startDateObj = parseISO(c.startDate)
      const endDateObj = parseISO(c.endDate)
      const targetDate = c.countdownTarget === 'end' ? endDateObj : startDateObj
      return { ...c, startDateObj, endDateObj, targetDate }
    })
    .filter(c => {
      // Include if target date is in future, or if competition is current
      return isAfter(c.targetDate, today) || 
             (c.status === 'current' && isWithinInterval(today, { start: c.startDateObj, end: c.endDateObj }))
    })
    .sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime())[0]

  return upcoming ? upcoming.targetDate : null
}

export const getCurrentCompetition = () => {
  const today = startOfToday()
  // First check explicitly set status
  let current = competitionConfig.competitionDates.find(c => c.status === 'current')
  
  // If no explicit current, check date ranges
  if (!current) {
    current = competitionConfig.competitionDates.find(c => {
      const startDate = parseISO(c.startDate)
      const endDate = parseISO(c.endDate)
      return isWithinInterval(today, { start: startDate, end: endDate })
    })
  }
  
  return current
}

export const getPastCompetitions = () => {
  const today = startOfToday()
  return competitionConfig.competitionDates.filter(c => {
    // If explicitly marked as past, return it
    if (c.status === 'past') return true
    // Otherwise check if end date has passed
    const endDate = parseISO(c.endDate)
    return isBefore(endDate, today) && c.status !== 'current' && c.status !== 'upcoming'
  })
}

export const getUpcomingCompetitions = () => {
  const today = startOfToday()
  return competitionConfig.competitionDates.filter(c => {
    // If explicitly marked as upcoming, return it
    if (c.status === 'upcoming') return true
    // Otherwise check if start date is in future and not current
    const startDate = parseISO(c.startDate)
    return isAfter(startDate, today) && c.status !== 'current' && c.status !== 'past'
  })
}

export const getCompetitionById = (id: string) => {
  return competitionConfig.competitionDates.find(c => c.id === id)
}

// Format competition date for display
export const formatCompetitionDate = (dateString: string): string => {
  try {
    return format(parseISO(dateString), 'MMMM d, yyyy')
  } catch {
    return dateString
  }
}

