import React from 'react'

const SearchFriend = ({friend, isFriend, onAdd}) => {
    console.log(friend)
    console.log(isFriend)

    return (
        <div className='main-container'>
           <div className='main-container__name' >
               {friend.name}
           </div>
           {
               isFriend
               ? (
                   <div>
                       Already friend
                   </div>
               )
               : (
                   <div className='main-container__button'>
                       Add
                   </div>
               )
           } 
        </div>
    );
}

export default SearchFriend;