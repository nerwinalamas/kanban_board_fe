import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Board from "./pages/Board";

const App = () => {
    return (
        <div className="min-h-screen mx-auto bg-slate-900 text-white">
            <Router>
                <Routes>
                    <Route path="/" element={<Board />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
