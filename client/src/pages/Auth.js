import React, {useState} from "react"
import "./Auth.css"

import {Link, useParams, useHistory} from "react-router-dom"
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from "axios"
import {useDispatch} from "react-redux";
import {logInUser} from "../store/user/actions";
import Snackbar from "../components/SnackBar"


const Auth = () => {

    const [form, setForm] = useState({
        name: '', email: '', password: ''
    })


    const [open, setOpen] = useState(false);

    const [response, setResponse] = useState('')

    const changeForm = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    let {method} = useParams()
    let history = useHistory()
    const dispatch = useDispatch()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setOpen(true);
        if (method === "register") {
            axios.post("/api/auth/register", {
                ...form
            })
                .then((response) => {
                    setResponse(response.data.message)
                    dispatch(logInUser(response.data))
                    history.push("/home")
                }, (error) => {
                    setResponse(error.response.data.message)
                })
        } else {
            axios.post("/api/auth/login", {
                ...form
            })
                .then((response) => {
                    setResponse(response.data.message)
                    dispatch(logInUser(response.data))
                    history.push("/home")
                }, (error) => {
                    setResponse(error.response.data.message)
                })
        }
    }

    return (
        <>
            <div className="auth--container">
                <Snackbar msg={response} open={open} handleClose={handleClose} />
                <Link to="/">
                    <div className="auth--back"><ArrowBackIcon style={{color: "white"}}/>Back</div>
                </Link>
                <div className="auth--form--control">
                    <form className="auth--form" noValidate autoComplete="off">
                        {
                            method === "register" && <TextField
                                className="text-field"
                                required id="name-required"
                                label="Name"
                                name="name"
                                value={form.name}
                                onChange={changeForm}
                            />
                        }
                        <TextField
                            className="text-field"
                            required id="email-required"
                            label="Email"
                            name="email"
                            value={form.email}
                            onChange={changeForm}
                        />
                        <TextField
                            className="text-field"
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            name="password"
                            value={form.password}
                            onChange={changeForm}
                        />
                        <div className="form-actions">
                            <Button onClick={handleSubmit} style={{float: "right"}} variant="contained">
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Auth

