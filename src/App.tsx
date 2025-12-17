import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout'
import Home from './pages/Home'
import CompetitionInfo from './pages/CompetitionInfo'
import PracticeTests from './pages/PracticeTests'
import Schedule from './pages/Schedule'
import Leaderboard from './pages/Leaderboard'
import Contributors from './pages/Contributors'
import Archive from './pages/Archive'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageLayout><Home /></PageLayout>} />
        <Route path="/competition" element={<PageLayout><CompetitionInfo /></PageLayout>} />
        <Route path="/practice" element={<PageLayout><PracticeTests /></PageLayout>} />
        <Route path="/schedule" element={<PageLayout><Schedule /></PageLayout>} />
        <Route path="/leaderboard" element={<PageLayout><Leaderboard /></PageLayout>} />
        <Route path="/contributors" element={<PageLayout><Contributors /></PageLayout>} />
        <Route path="/archive" element={<PageLayout><Archive /></PageLayout>} />
      </Routes>
    </Router>
  )
}

export default App

