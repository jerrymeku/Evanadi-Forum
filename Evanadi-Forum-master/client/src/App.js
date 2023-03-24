import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import Home from "./pages/home/Home";
import Answer from "./pages/Answers/Answer";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import Questions from "./pages/Questions/Questions";
import Login from "././pages/Login/Login";
import Signup from "./pages/signUp/SignUp";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Header /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Questions" element={<Questions />} /> 
          <Route path="/Login" element={<Login />} /> 
          <Route path="/Signup" element={<Signup />} /> 
          <Route path="" element={<About />} /> 
          <Route path="/questions/:id" element={<Answer />} /> 
          <Route path="/AskQuestion" element={<AskQuestion />} />           
        </Routes>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
