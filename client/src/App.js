import React, { useEffect } from "react";
import axios from "axios";
import WelcomePage from "./pages/WelcomePage";
import AccountPage from "./pages/AccountPage";
import Auth from "./pages/Auth";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { logInUser } from "./store/user/actions";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/api/session/").then(
      (response) => {
        dispatch(logInUser(response.data));
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  }, [dispatch]);

  if (user) {
    return (
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/account" exact component={AccountPage} />
        <Route path="*" exact component={HomePage} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact component={WelcomePage} />
      <Route path="/auth/:method" exact component={Auth} />
      <Route path="*" exact component={WelcomePage} />
    </Switch>
  );
}

export default App;
