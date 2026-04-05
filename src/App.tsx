import { Route, Routes } from 'react-router-dom'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { ChatWidget } from '@/components/chat-widget'
import { useTheme } from '@/hooks/useTheme'
import { ArchPage } from '@/pages/ArchPage'
import { DebianPage } from '@/pages/DebianPage'
import { DistroChooserPage } from '@/pages/DistroChooserPage'
import { FedoraPage } from '@/pages/FedoraPage'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <div className="flex-1 overflow-x-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/get-started" element={<DistroChooserPage />} />
          <Route path="/distro/arch-based" element={<ArchPage />} />
          <Route path="/distro/debian-based" element={<DebianPage />} />
          <Route path="/distro/fedora-based" element={<FedoraPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <ChatWidget />
      <Footer />
    </div>
  )
}
