import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {DailyQuote} from "./pages/DailyQuote.tsx";

const App = () => {
    return <Router>
        <Routes>
            <Route path="/" element={<DailyQuote />}/>
            <Route path="/:type" element={<DailyQuote />}/>
        </Routes>
    </Router>
};

export default App
