import Navbar from "./components/Navbar";
import PopUp from "./components/PopUp";
import { ReadPost } from "./components/ReadPost";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ReadPost />} />
          <Route path="/detail/:id" element={<PopUp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
