import React, {useState, useEffect} from "react";
import "./WelcomePage.css"
import {Button, Typography} from "@material-ui/core";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import {logInUser} from "../store/user/actions"
import axios from "axios";

const WelcomePage = () => {
    return (
        <div className="welcome--screen">
            <div className="welcome--options">
                <Typography variant="h2" color="initial" style={{textAlign: "center"}}>
                    Welcome to Caracall!
                </Typography>
                <div className="welcome--actions">
                    <Link to="/auth/login">
                        <Button variant="contained" style={{marginRight: 10}}>
                            Login
                        </Button>
                    </Link>
                    <Link to="/auth/register">
                        <Button variant="contained">
                            Register
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage