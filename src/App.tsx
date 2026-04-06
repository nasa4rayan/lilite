import { Route, Routes } from 'react-router-dom'
import { AlpinePage } from '@/pages/AlpinePage'
import { Analytics } from '@vercel/analytics/react'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { ChatWidget } from '@/components/chat-widget'
import { useTheme } from '@/hooks/useTheme'
import { ArchPage } from '@/pages/ArchPage'
import { DebianPage } from '@/pages/DebianPage'
import { DistroChooserPage } from '@/pages/DistroChooserPage'
import { EndeavourOsPage } from '@/pages/EndeavourOsPage'
import { FedoraPage } from '@/pages/FedoraPage'
import { GarudaPage } from '@/pages/GarudaPage'
import { HomePage } from '@/pages/HomePage'
import { KaliPage } from '@/pages/KaliPage'
import { ManjaroPage } from '@/pages/ManjaroPage'
import { MintPage } from '@/pages/MintPage'
import { NobaraPage } from '@/pages/NobaraPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { OpenSusePage } from '@/pages/OpenSusePage'
import { ParrotPage } from '@/pages/ParrotPage'
import { PopOsPage } from '@/pages/PopOsPage'
import { UbuntuPage } from '@/pages/UbuntuPage'
import { ZorinPage } from '@/pages/ZorinPage'
import { useLanguage } from '@/hooks/useLanguage'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const { messages } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="skip-link">
        {messages.common.skipToContent}
      </a>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <div id="main-content" tabIndex={-1} className="flex-1 overflow-x-hidden focus:outline-none">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/get-started" element={<DistroChooserPage />} />
          <Route path="/distro/arch-based" element={<ArchPage />} />
          <Route path="/distro/debian-based" element={<DebianPage />} />
          <Route path="/distro/fedora-based" element={<FedoraPage />} />
          <Route path="/distro/opensuse-based" element={<OpenSusePage />} />
          <Route path="/distro/alpine-based" element={<AlpinePage />} />
          <Route path="/distro/ubuntu-based" element={<UbuntuPage />} />
          <Route path="/distro/kali-based" element={<KaliPage />} />
          <Route path="/distro/manjaro-based" element={<ManjaroPage />} />
          <Route path="/distro/mint-based" element={<MintPage />} />
          <Route path="/distro/popos-based" element={<PopOsPage />} />
          <Route path="/distro/zorin-based" element={<ZorinPage />} />
          <Route path="/distro/parrot-based" element={<ParrotPage />} />
          <Route path="/distro/endeavouros-based" element={<EndeavourOsPage />} />
          <Route path="/distro/garuda-based" element={<GarudaPage />} />
          <Route path="/distro/nobara-based" element={<NobaraPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <ChatWidget />
      <Footer />
      <Analytics />
    </div>
  )
}
