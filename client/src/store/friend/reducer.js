import {ADD_FRIEND, DELETE_FRIEND} from "./consts";

const initialState = {
    friends: []
}

const friendReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FRIEND:

            let friendList = []
            const alreadyAdded = state.friends.find((friend) => {
                return friend._id === action.payload._id
            })

            if (alreadyAdded) {
                friendList = state.friends.map((friend) => {
                    return friend._id === action.payload._id ? {
                        ...friend
                    } : friend
                })
            } else {
                friendList =  [...state.friends, {...action.payload}]
            }

            return {
                ...state,
                friends: friendList
            }
        case DELETE_FRIEND:
            return {
                ...state,
                friends: state.friends.filter((friend) => friend._id !== action.payload._id)
            }
        default :
            return state;
    }
}

export default friendReducer