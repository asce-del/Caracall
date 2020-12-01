import React from "react"
import "./AccountPage.css"
import Auth from "./Auth"
import Snackbar from "../components/SnackBar";
import {Link} from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";

const AccountPage = () => {
    return (
            <>
            <Auth updateMethod={true}/>
            </>
    )
}

export default AccountPage