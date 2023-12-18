import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import { Route,Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
