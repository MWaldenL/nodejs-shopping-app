import axios from 'axios'
import { GET_CART, ADD_TO_CART } from './types'
import { tokenConfig } from './authActions'


export const addToCart = item => (dispatch, getState) => {
    axios.post('/api/cart', item, tokenConfig(getState))
      .then(res => {
        dispatch({
          type: ADD_TO_CART,
          payload: res.data
        })
      })
  }
  
  export const getCart = () => (dispatch, getState) => {
    axios.get('/api/cart', tokenConfig(getState))
      .then(res => {
        dispatch({
          type: GET_CART,
          payload: res.data
        })
      })
  }