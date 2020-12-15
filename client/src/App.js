import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import WelcomePage from "./pages/WelcomePage";
import AccountPage from "./pages/AccountPage";
import Auth from "./pages/Auth";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import MessangerIndex from "./pages/Messanger/MessangerIndex";
import { useDispatch, useSelector } from "react-redux";
import { logInUser } from "./store/user/actions";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const [response, setResponse] = useState("");
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/api/session/").then(
      (response) => {
        if (user === null) {
          dispatch(logInUser(response.data));
        } else setResponse(response.data.message);
      },
      (error) => {
        setResponse(error.response.data.message);
      }
    );
  }, [dispatch]);

  if (user) {
    return (
      <Switch>
        <Route path="/home" exact component={HomePage} />
        <Route path="/account" exact component={AccountPage} />
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
