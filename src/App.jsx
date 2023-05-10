import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./style/style.css";

function App() {
  return (
    <Router>
      <div className="App">
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>  

        <div className="content">
          <HomePage />
        </div>
      </div>
    </Router>
  );
}

const HomePage = () => {
  return(
    <div className="home">
      <div className="levels">
        <div className="level">
          <img className="level-img" src = {`./img/level1.jpg`} alt="fashionable people" />
        </div>

        <div className="level">
          <img className="level-img" src = {`./img/level2.jpg`} alt="fashionable people" />
        </div>

        <div className="level">
          <img className="level-img" src = {`./img/level3.jpg`} alt="fashionable people" />
        </div>

        <div className="level">
          <img className="level-img" src = {`./img/level4.jpg`} alt="fashionable people" />
        </div>
      </div>
    </div>
  )
}

export default App;
