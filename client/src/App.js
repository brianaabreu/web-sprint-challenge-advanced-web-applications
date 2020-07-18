import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from './components/PrivateRoute';
import BubblePage from './components/BubblePage';
import "./styles.scss";

const logout = (e) => {
  window.localStorage.removeItem("token");
};

function App() {
  return (
    <Router>
      <div>
        <ul className="Front-UL">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/login" onClick={logout}>
              Log out
            </Link>
          </li>
          <li>
            <Link to="/colors">Dashboard</Link>
          </li>
        </ul>
        <Switch>
          <PrivateRoute exact path="/colors" component={BubblePage} />
          <Route path="/login" component={Login} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
