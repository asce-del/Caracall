import React from "react";
import "./HomePage.css";
import Header from "../components/Header";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";

const HomePage = () => {
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
