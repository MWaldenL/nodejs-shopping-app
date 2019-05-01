import axios from 'axios'
import { GET_CART, ADD_TO_CART, REMOVE_FROM_CART } from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'


export const addToCart = item => (dispatch, getState) => {
    axios.post('/api/cart', item, tokenConfig(getState))
      .then(res => {
        dispatch({
          type: ADD_TO_CART,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status))
      })
  }

export const getCart = () => (dispatch, getState) => {
  axios.get('/api/cart', tokenConfig(getState))
    .then(res => {
      console.log(tokenConfig(getState))
      dispatch({
        type: GET_CART,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
    })
}

export const removeFromCart = id => (dispatch, getState) => {
  axios.delete(`/api/cart/${id}`, tokenConfig(getState))
    .then(res => dispatch({ 
      type: REMOVE_FROM_CART,
      payload: res.data
     }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
    })
}
