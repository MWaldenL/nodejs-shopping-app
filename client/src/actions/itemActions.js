import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, GET_ITEM_BY_ID } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';


export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get('/api/products')
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getItemById = id => dispatch => {
  axios.get(`/api/products/${id}`)
    .then(res => 
        dispatch({
          type: GET_ITEM_BY_ID,
          payload: res.data
        }))
    .catch(err => {
      console.log(id)
      dispatch(returnErrors(err.response.data, err.response.status))
    }
    )
};

export const addItem = item => (dispatch, getState) => {
  axios
    .post('/api/products', item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`/api/products/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
