import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { ParticleBackground } from './ParticleBackground'
import { Container } from '../ui/Container'

interface PageLayoutProps {
  children: ReactNode
  showBackground?: boolean
}

export const PageLayout = ({
  children,
  showBackground = true,
}: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 relative">
      {showBackground && <ParticleBackground />}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Container>{children}</Container>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default PageLayout

