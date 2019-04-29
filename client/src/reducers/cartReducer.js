import { ADD_TO_CART, GET_CART } from '../actions/types'


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
            //   ...state,
              items: action.payload
            }
        default: 
            return state
    }
}