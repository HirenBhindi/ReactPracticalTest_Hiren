import Navbar from "./components/Navbar";
import SinglePost from "./components/SinglePost";
import { ReadPost } from "./components/ReadPost";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ReadPost />} />
          <Route path="/detail/:id" element={<SinglePost />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
