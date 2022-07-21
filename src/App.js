import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/home';

function App() {
  return (
    <>
      <Navbar />
      <Home/>
    </>
  );
}

export default App;
