# Physics Competition Landing Page

A modern, dark-themed landing website for monthly recurring physics competitions. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **Dark, Modern UI**: Physics-inspired design with animated particle background
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Dynamic Leaderboard**: Fetches data from Google Sheets with real-time updates
- **Monthly Competitions**: Support for recurring competitions with archive
- **Practice Tests**: Categorized practice tests by physics topic
- **Countdown Timer**: Dynamic countdown to next competition
- **Google Forms Integration**: Embed registration and survey forms

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **date-fns** for date handling
- **Framer Motion** for animations

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Configuration

All competition-specific data is centralized in `src/config/competitionConfig.ts`. This includes:

- Competition dates and metadata
- Google Form links
- Practice test categories
- Contributor information
- Competition rules
- Google Sheets configuration

### Updating Competition Data

Edit `src/config/competitionConfig.ts`:

1. **Competition Dates**: Update the `competitionDates` array
   - `id` must be in `YYYY-MM` format (e.g., "2024-01")
   - Set `status` to 'upcoming', 'current', or 'past'

2. **Google Forms**: Update the `forms` object with your form URLs

3. **Practice Tests**: Add or modify tests in `practiceTests.categories`

4. **Contributors**: Update the `contributors` array

5. **Rules**: Modify the `rules` object

## Google Sheets Integration

The leaderboard is driven entirely from Google Sheets. Each row represents one participant's result for a competition.

### Google Sheets Schema

Your Google Sheet should have the following columns (first row is headers):

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| competition_id | string | Yes | Format: `YYYY-MM` (e.g., "2024-01") |
| participant_name | string | Yes | Participant's name |
| score | number | Yes | Score out of 100 |
| time_seconds | number | Yes | Completion time in seconds |
| time_formatted | string | No | Human-readable time (e.g., "30:00") |
| results_published | boolean | Yes | Set to `TRUE` to show results, `FALSE` to hide |
| submitted_at | string | No | ISO date string |
| notes | string | No | Additional notes |

### Setting Up Google Sheets

#### Option 1: Google Apps Script Web App (Recommended)

1. Create a Google Sheet with the leaderboard data
2. Open **Extensions** → **Apps Script**
3. Create a new script:

```javascript
function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leaderboard');
  const data = sheet.getDataRange().getValues();
  
  // Return as JSON
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Click **Deploy** → **New deployment**
5. Select type: **Web app**
6. Set:
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Click **Deploy** and copy the Web App URL
8. Add the URL to `competitionConfig.ts` → `googleSheets.webAppUrl`

#### Option 2: Google Sheets API (Public Sheet)

1. Create a Google Sheet with the leaderboard data
2. Share the sheet publicly (View-only)
3. Get the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`
4. Create a Google Cloud project
5. Enable the Google Sheets API
6. Create an API key (restrict to Sheets API for security)
7. Add to `competitionConfig.ts`:
   - `googleSheets.leaderboardSheetId`: Your Sheet ID
   - `googleSheets.apiKey`: Your API key
   - `googleSheets.range`: e.g., "Leaderboard!A1:H1000"

### Admin Workflow

**All leaderboard updates happen in Google Sheets - no code changes needed!**

1. **Add new competition results**:
   - Add rows with `competition_id` (YYYY-MM format)
   - Fill in participant data
   - Set `results_published = FALSE` until ready
   - Set `results_published = TRUE` to make visible on the site

2. **Update existing results**:
   - Edit rows directly in Google Sheet
   - Changes reflect on the site (may require cache refresh)

3. **Publish/unpublish results**:
   - Toggle `results_published` column
   - Site automatically shows/hides based on value

### Leaderboard Features

- **Automatic Grouping**: Entries grouped by `competition_id`
- **Smart Sorting**: Score (descending), then time (ascending)
- **Publication Control**: Only shows entries where `results_published = TRUE`
- **Monthly Support**: Competition IDs in YYYY-MM format
- **Archive**: All past competitions accessible

## Project Structure

```
app/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI primitives
│   │   ├── layout/          # Layout components
│   │   ├── competition/     # Competition components
│   │   ├── leaderboard/     # Leaderboard components
│   │   ├── practice/        # Practice test components
│   │   └── shared/          # Shared components
│   ├── config/
│   │   └── competitionConfig.ts  # Single config file
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── types/               # TypeScript types
│   └── pages/               # Page components
├── public/                  # Static assets
└── package.json
```

## Component Architecture

The project uses a reusable component architecture:

- **UI Primitives**: Base components (Button, Card, Table, etc.)
- **Layout Components**: Page structure (Header, Footer, PageLayout)
- **Feature Components**: Built using primitives (CompetitionCard, LeaderboardTable)
- **Pages**: Composed of feature components

## Development

### Code Style

- TypeScript for type safety
- Functional components with hooks
- Tailwind CSS for styling
- Clear component separation

### Adding New Features

1. **New UI Component**: Add to `src/components/ui/`
2. **New Feature**: Create in appropriate feature folder
3. **New Page**: Add to `src/pages/` and update `App.tsx` routes
4. **Config Update**: Edit `src/config/competitionConfig.ts`

## Troubleshooting

### Leaderboard Not Loading

1. Check Google Sheets configuration in `competitionConfig.ts`
2. Verify Sheet ID and range are correct
3. For Web App: Ensure deployment is active and accessible
4. For API: Check API key is valid and sheet is public
5. Check browser console for errors

### Countdown Timer Not Working

1. Verify `getNextCompetitionDate()` returns a valid date
2. Check competition dates in config have correct status
3. Ensure dates are in ISO format

### Forms Not Embedding

1. Verify form URL is correct
2. Check if form allows embedding
3. Try opening form URL directly in browser

## License

[Your License Here]

## Support

For questions or issues, please contact the contributors listed on the Contributors page.

