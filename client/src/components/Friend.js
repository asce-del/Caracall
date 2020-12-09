import React from 'react'

import './Friend.css'

import RemoveIcon from '@material-ui/icons/Remove'
import ChatIcon from '@material-ui/icons/Chat'

const Friend = ({friend, handleDeleteFriend}) => {

    return (
        <div className='friend-container'>
            <div className='friend-container__info'>
                <span className='friend-container__name'>{friend.name}</span>
                <span className='friend-container__email'>{friend.email}</span>
            </div>
            <div className='friend-container__buttons' >
                <div className='friend-button-container'>
                    <ChatIcon style={{fontSize: 16, color: 'green'}} />
                </div>
                <div className='friend-button-container' onClick={() => handleDeleteFriend(friend)}>
                    <RemoveIcon style={{fontSize: 16, color: 'red'}} />
                </div>
            </div>
        </div>
    )
}


export default Friend