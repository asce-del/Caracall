import React, { useEffect } from "react";
import axios from "axios";
import "./HomePage.css";
import { Typography } from "@material-ui/core";
import CallMadeIcon from "@material-ui/icons/CallMade";
import Header from "../components/Header";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";

const HomePage = () => {

  //<Link to="/friends"><p className="home--friend">Find new friends <CallMadeIcon style={{fontSize: 32}} /></p></Link>

  return (
    <>
      <Header />
      <div className="home--container">
        <div className="home--text">
          <p className="company-name">Caracall</p>
          <span className="desc-text">From person to person!</span>
          <span className="desc-text">
            Start sharing your ideas with friends right now!
          </span>
          <Button variant="dark" className="button-find">
            <Link to="/friends">Find new friends</Link>
          </Button>{" "}
        </div>
        <div className="home--image"></div>
      </div>
    </>
  );
};

export default HomePage;
