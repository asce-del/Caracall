import React from "react";
import WelcomePage from "./pages/WelcomePage";
import Auth from "./pages/Auth"
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import "./App.css"
import HomePage from "./pages/HomePage";


function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={WelcomePage}/>
                <Route path="/auth/:method" exact component={Auth}/>
                <Route path="/home" exact component={HomePage}/>
                <Redirect to="/"/>
            </Switch>
        </Router>
    );
}

export default App;
