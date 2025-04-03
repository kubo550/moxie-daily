import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {DailyQuote} from "./pages/DailyQuote.tsx";
import {BackgroundVideo} from "./components/BackgroundVideo.tsx";
import {Navbar} from "./components/Navbar.tsx";
import {FooterNavbar} from "@/components/FooterNavbar.tsx";



const App = () => {
    return (
        <>
            <Navbar />
            <BackgroundVideo />
            <Router>
                <Routes>
                    <Route path="/" element={<DailyQuote/>}/>
                    <Route path="/:type" element={<DailyQuote/>}/>
                </Routes>
                <FooterNavbar />
            </Router>
        </>
    )
};

export default App
