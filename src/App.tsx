import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {DailyQuotePage} from "./pages/DailyQuotePage.tsx";
import {BackgroundVideo} from "./components/BackgroundVideo.tsx";
import {Navbar} from "./components/Navbar.tsx";
import {FooterNavbar} from "@/components/FooterNavbar.tsx";
import {AboutMePage} from "@/pages/AboutMePage.tsx";



const App = () => {
    return (
        <>
            <Navbar />
            <BackgroundVideo />
            <Router>
                <Routes>
                    <Route path="/" element={<DailyQuotePage/>}/>
                    <Route path="/:type" element={<DailyQuotePage/>}/>
                    <Route path="/pages/chat" element={<div> todo </div>}/>
                    <Route path="/pages/about" element={<AboutMePage/>}/>
                </Routes>
                <FooterNavbar />
            </Router>
        </>
    )
};

export default App
