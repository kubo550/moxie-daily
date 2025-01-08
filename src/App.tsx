import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Mootivation} from "./pages/Motivation.tsx";
import {Affirmation} from "./pages/Affirmation.tsx";

const App = () => {
    return <Router>
        <Routes>
            <Route path="/" element={<Mootivation/>}/>
            <Route path="/motivation" element={<Mootivation/>}/>
            <Route path="/affirmation" element={<Affirmation/>}/>
        </Routes>
    </Router>


};

export default App
