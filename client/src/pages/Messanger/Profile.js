import React from "react"
import Avatar from '@material-ui/core/Avatar';
import {useSelector} from "react-redux"

const Profile = () => {

    const user = useSelector(state => state.user.currentUser)

    return (
        <div className="msg-profile">
            <Avatar className="msg-profile-avatar" alt={user.name}  src="/static/images/avatar/1.jpg" />
        </div>
    )
}

export default Profile