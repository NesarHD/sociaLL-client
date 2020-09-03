import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./home"
import Users from "./users"

export default function App(props) {
  return (
    <Router>
        <Switch>
          <Route path="/users/:id">
            <Users />
          </Route>
          <Route {...props} exact={true} path="/" >
            <Home/>
          </Route>
        </Switch>
    </Router>
  );
}