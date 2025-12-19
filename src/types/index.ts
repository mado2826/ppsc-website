// Leaderboard types matching Google Sheets schema
export interface LeaderboardEntry {
  competition_id: string;        // YYYY-MM format
  participant_name: string;
  score: number;
  time_seconds: number;
  time_formatted?: string;
  results_published: boolean;
  submitted_at?: string;
  notes?: string;
}

export interface GroupedLeaderboard {
  competition_id: string;
  entries: LeaderboardEntry[];
  published: boolean;  // true if any entry has results_published = true
}

export interface SortedLeaderboardEntry extends LeaderboardEntry {
  rank: number;  // Calculated after sorting
}

// Competition types
export interface Competition {
  id: string;  // YYYY-MM format to match competition_id
  startDate: string; // ISO date - competition start
  endDate: string; // ISO date - competition end
  name: string;
  description: string;
  registrationDeadline?: string;
  countdownTarget?: 'start' | 'end'; // What the countdown timer should target (default: 'start')
  status: 'upcoming' | 'current' | 'past';
}

// Practice test types
export interface PracticeTest {
  id: string;
  title: string;
  // duration: number; // minutes
  // difficulty: 'beginner' | 'intermediate' | 'advanced';
  link?: string;
  // questions?: number;
}

export interface PracticeTestCategory {
  id: string;
  name: string;
  description: string;
  tests: PracticeTest[];
}

// Contributor types
export interface Contributor {
  id: string;
  name: string;
  role: string;
  affiliation?: string;
  email?: string;
}

// Form types
export interface Forms {
  registration: string;
  surveys: string[];
  feedback?: string;
}

// Rules types
export interface Rules {
  format: string;
  duration: string;
  scoring: string;
  eligibility: string;
}

// Leaderboard settings
export interface LeaderboardSettings {
  topPerformersCount: number;
  defaultSortBy: 'score' | 'time' | 'name';
  showUnpublished: boolean;
}

// Google Sheets config
export interface GoogleSheetsConfig {
  leaderboardSheetId: string;
  apiKey?: string;
  range: string;
  webAppUrl?: string;
}

// Theme config
export interface ThemeConfig {
  primaryColor?: string;
  accentColor?: string;
}

// Main config interface
export interface CompetitionConfig {
  siteName: string;
  siteDescription: string;
  competitionDates: Competition[];
  forms: Forms;
  googleSheets: GoogleSheetsConfig;
  rules: Rules;
  practiceTests: {
    categories: PracticeTestCategory[];
  };
  contributors: Contributor[];
  socials?: {
    instagram?: string
    discord?: string
  }
  leaderboard: LeaderboardSettings;
  theme?: ThemeConfig;
}

