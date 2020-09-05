import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./home"
import Users from "./users"
import FriendsOfFriends from "./friends_of_friends"

export default function App(props) {
  return (
    <Router>
        <Switch>
          <Route path="/users/:id">
            <Users />
          </Route>
          <Route path="/friends-of-friends/:id">
            <FriendsOfFriends />
          </Route>
          <Route {...props} exact={true} path="/" >
            <Home/>
          </Route>
        </Switch>
    </Router>
  );
}