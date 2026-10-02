import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Routes, Route } from "react-router-dom"
import Library from './pages/Library';

function App() { 
  return (
    <div>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spells" element={<Library />} />
      </Routes>

      </div>
  );
}

export default App;
