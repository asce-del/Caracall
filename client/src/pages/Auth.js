import React, {useState} from "react"
import "./Auth.css"

import {Link, useParams} from "react-router-dom"
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from "axios"
import {useDispatch} from "react-redux";
import {logInUser} from "../store/user/actions";


const Auth = () => {

    const [form, setForm] = useState({
        name: '', email: '', password: ''
    })

    const [response, setResponse] = useState('')

    const changeForm = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    let {method} = useParams()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (method === "register") {
            axios.post("http://localhost:5000/api/auth/register", {
                ...form
            })
                .then((response) => {
                    setResponse(response.data.message)
                    dispatch(logInUser(response.data))
                }, (error) => {
                    setResponse(error.response.data.message)
                })
        } else {
            axios.post("http://localhost:5000/api/auth/login", {
                ...form
            })
                .then((response) => {
                    setResponse(response.data.message)
                    dispatch(logInUser(response.data))
                }, (error) => {
                    setResponse(error.response.data.message)
                })
        }
    }

    return (
        <>
            <div className="auth--container">
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

