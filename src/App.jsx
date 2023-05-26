import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./style/style.css";
import LevelPage from "./Components/LevelPage";
import Nav from "./Components/Nav";
import { FirebaseProvider } from "./Context/FirebaseContext";
import Leaderboard from "./Components/Leaderboard";

function App() {
  return (
    <Router>
      <div className="App">
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>  
        <Nav />
        <FirebaseProvider>
          <div className="content">
            <Routes>
              <Route path="/" element = {<HomePage />} />
              <Route path="/:id" element = {<LevelPage />} />
              <Route path="/leaderboard" element = {<Leaderboard />} />
            </Routes>
          </div>
        </FirebaseProvider>

      </div>
    </Router>
  );
}

const HomePage = () => {
  return(
    <div className="home">
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
      <div className="levels">
        <Link to = {"/1"}>
          <div className="level">
            <img className="level-img" src = {`./img/1.jpg`} alt="fashionable people" />
          </div>
        </Link>
        <Link to = {"/2"}>
          <div className="level">
            <img className="level-img" src = {`./img/2.jpg`} alt="fashionable people" />
          </div>
        </Link>
        <Link to = {"/3"}>
          <div className="level">
            <img className="level-img" src = {`./img/3.jpg`} alt="fashionable people" />
          </div>
        </Link>
        <Link to = {"/4"}>
          <div className="level">
            <img className="level-img" src = {`./img/4.jpg`} alt="fashionable people" />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default App;
