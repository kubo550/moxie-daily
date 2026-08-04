import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DailyQuotePage } from './pages/DailyQuotePage.tsx';
import { Navbar } from './components/Navbar.tsx';
import { FooterNavbar } from '@/components/FooterNavbar.tsx';
import { AboutMePage } from '@/pages/AboutMePage.tsx';
import { ChatListPage } from '@/pages/ChatListPage.tsx';
import { ChatPage } from '@/pages/ChatPage.tsx';
import { ChallengesListPage } from '@/pages/ChallengesListPage.tsx';
import { QuickSupportPage } from '@/pages/QuickSupportPage.tsx';
import { RecoverySupportPage } from '@/pages/RecoverySupportPage.tsx';
import { CrisisResourcesFAB } from '@/components/CrisisResourcesFAB.tsx';

const App = () => {
  return (
    <Router>
      <div className="fixed inset-0 bg-gradient-to-b from-black via-gray-900 to-black -z-10" />

      <div className="flex w-full max-w-7xl h-[100dvh] flex-col overflow-hidden mx-auto">
        <Navbar />
        <main className="no-scrollbar flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          <Routes>
            <Route path="/" element={<DailyQuotePage />} />
            <Route path="/:type" element={<DailyQuotePage />} />
            <Route path="/pages/chat" element={<ChatListPage />} />
            <Route path="/pages/chat/:type" element={<ChatPage />} />
            <Route path="/pages/about" element={<AboutMePage />} />
            <Route path="/pages/challenges" element={<ChallengesListPage />} />
            <Route path="/pages/support/:type" element={<QuickSupportPage />} />
            <Route path="/pages/recovery" element={<RecoverySupportPage />} />
          </Routes>
        </main>
        <FooterNavbar />
      </div>
      <CrisisResourcesFAB />
    </Router>
  );
};

export default App;
