import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {DailyQuote} from "./pages/DailyQuote.tsx";
import {BackgroundVideo} from "./components/BackgroundVideo.tsx";



const App = () => {
    return (
        <>
            <BackgroundVideo />
            <Router>
                <Routes>
                    <Route path="/" element={<DailyQuote/>}/>
                    <Route path="/:type" element={<DailyQuote/>}/>
                </Routes>
            </Router>
        </>
    )
};

export default App
