import React from "react";
import "./HomePage.css"
import {Typography} from "@material-ui/core";
import Header from "../components/Header";

const HomePage = () => {
    return (
        <>
            <Header />
            <div className="home--container">
                <div className="home--head" style={{marginTop: 50}}>
                    <Typography variant="h2" style={{lineHeight: 2}}>
                        Crypter
                    </Typography>
                    <p>From person to person!</p>
                </div>
            </div>
        </>
    )
}

export default HomePage