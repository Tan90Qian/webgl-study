import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { config } from "./router/router";
import { renderRoute, renderMenu } from "./router/utils";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <nav className="nav">{renderMenu(config)}</nav>
        <div className="container">
          <Switch>{renderRoute(config)}</Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
