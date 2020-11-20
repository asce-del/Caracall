import React from "react";
import WelcomePage from "./pages/WelcomePage";
import Auth from "./pages/Auth"
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import "./App.css"
import HomePage from "./pages/HomePage";
import {useSelector} from "react-redux";


function App() {

    const isAuth = useSelector(state => state.user.currentUser)

    if (isAuth) {
        return (
            <Switch>
                <Route path="/home" exact component={HomePage}/>
                <Redirect to="/home"/>
            </Switch>
        )
    }

    return (
            <Switch>
                <Route path="/" exact component={WelcomePage}/>
                <Route path="/auth/:method" exact component={Auth}/>
                <Redirect to="/"/>
            </Switch>
    );
}

export default App;
