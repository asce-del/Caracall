import React from 'react'

import DoneIcon from "@material-ui/icons/Done";
import AddIcon from "@material-ui/icons/Add"

import './SearchFriend.css'

const SearchFriend = ({friend, isFriend, onAdd}) => {
    return (
        <div className='search-friend-container'>
           <div className='search-friend__name' >
               {friend.name}
           </div>
           {
               isFriend
               ? (
                   <div>
                       <DoneIcon style={{color: 'green', fontSize: 16}} />
                   </div>
               )
               : (
                   <div className='search-friend__button' onClick={() => onAdd(friend)}>
                       <AddIcon style={{color: 'grey', fontSize: 16}} />
                   </div>
               )
           } 
        </div>
    );
}

export default SearchFriend;