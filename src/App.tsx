import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DailyQuotePage } from './pages/DailyQuotePage.tsx';
import { Navbar } from './components/Navbar.tsx';
import { FooterNavbar } from '@/components/FooterNavbar.tsx';
import { AboutMePage } from '@/pages/AboutMePage.tsx';
import { ChatListPage } from '@/pages/ChatListPage.tsx';
import { ChatPage } from '@/pages/ChatPage.tsx';
import { ImmediateSupportPage } from '@/pages/ImmediateSupportPage.tsx';

const App = () => {
  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-b from-black via-gray-900 to-black -z-10" />

      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<DailyQuotePage />} />
          <Route path="/:type" element={<DailyQuotePage />} />
          <Route path="/pages/chat" element={<ChatListPage />} />
          <Route path="/pages/chat/:type" element={<ChatPage />} />
          <Route path="/pages/about" element={<AboutMePage />} />
          <Route path="/pages/support" element={<ImmediateSupportPage />} />
        </Routes>
        <FooterNavbar />
      </Router>
    </>
  );
};

export default App;
