import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Home } from "./pages/Home";
import { TwoOne } from "./pages/2-1";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/2-1">2-1</Link>
            </li>
          </ul>
        </nav>
        <div className="container">
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/2-1" exact>
              <TwoOne />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
