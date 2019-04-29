import { ADD_TO_CART, GET_CART, REMOVE_FROM_CART } from '../actions/types'


const initialState = {
    items: []
}

export default function(state=initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case GET_CART:
            return {
                ...state,
                items: action.payload
            }
        case REMOVE_FROM_CART:
            return {
                ...state
            }
        default: 
            return state
    }
}