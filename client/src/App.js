import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import WelcomePage from "./pages/WelcomePage";
import AccountPage from "./pages/AccountPage";
import FriendsPage from "./pages/FriendsPage";
import Auth from "./pages/Auth";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import MessangerIndex from "./pages/Messanger/MessangerIndex";
import { useDispatch, useSelector } from "react-redux";
import {logInUser} from "./store/user/actions"

function App() {
  const isAuth = useSelector((state) => state.user.currentUser);
  const [session, setSession] = useState([]);
  const [response, setResponse] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
      axios.get("/api/session/").then(
        (response) => {
          setSession(response.data);
          dispatch(logInUser(response.data));
        },
        (error) => {
          setResponse(error.response.data.message);
        }
      );
    }, []);


  if (isAuth) {
    return (
      <Switch>
        <Route path="/home" exact component={HomePage} />
        <Route path="/account" exact component={AccountPage} />
        <Route path="/friends" exact component={FriendsPage} />
        <Route path="/messanger" exact component={MessangerIndex} />
        <Redirect to="/home" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact component={WelcomePage} />
      <Route path="/auth/:method" exact component={Auth} />
      <Redirect to="/" />
    </Switch>
  );
}

export default App;
