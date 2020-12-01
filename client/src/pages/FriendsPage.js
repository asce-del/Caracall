import React, {useState} from "react"
import "./FriendsPage.css"
import {TextField} from "@material-ui/core";
import Header from "../components/Header";
import {useDispatch} from "react-redux";
import axios from "axios";

const FriendsPage = () => {
    const dispatch = useDispatch()
    const [friend, setFriend] = useState('')
    const [dataUsers, setDataUsers] = useState([])

    const changeForm = e => {
        setFriend(e.target.value)
    }


    const handleSearch = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            axios.get(`/api/friends/${friend}`).then((res) => {
                setDataUsers(res.data)
            })
        }
    }

    console.log(dataUsers)


    return (
        <>
            <Header/>
            <div className="home--container">
                <form className="auth--form" noValidate autoComplete="off">
                    <TextField
                        id="standard-basic"
                        onChange={changeForm}
                        value={friend}
                        name="friend"
                        label="Find friends..."
                        onKeyPress={handleSearch}
                    />
                </form>
                <div className="auth--form">
                    <p style={{textAlign: "center", fontWeight: 500, color: "#1f1f1e"}}>Friend list:</p>
                    <div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default FriendsPage