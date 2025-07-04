import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Home from "./pages/home.jsx";
import Books from "./pages/books.jsx";
import Icons from "./pages/icons.jsx";
import Other from "./pages/other.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/icons" element={<Icons />} />
        <Route path="/other" element={<Other />} />
      </Routes>
    </Router>
  );
}

export default App;
