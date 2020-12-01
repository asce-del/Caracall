import React from "react";
import "./HomePage.css"
import {Typography} from "@material-ui/core";
import CallMadeIcon from '@material-ui/icons/CallMade';
import Header from "../components/Header";
import {Link} from "react-router-dom"

const HomePage = () => {
    return (
        <>
            <Header />
            <div className="home--container">
                <div className="home--text">
                    <p>From person to person!</p>
                    <p style={{padding: 10}}>Start sharing your ideas with friends right now!</p>
                    <Link to="/friends"><p className="home--friend">Find new friends <CallMadeIcon style={{fontSize: 32}} /></p></Link>
                </div>
                <div className="home--image">
                </div>
            </div>
        </>
    )
}

export default HomePage