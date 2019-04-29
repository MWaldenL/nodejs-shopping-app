import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import cartReducer from './cartReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  item: itemReducer,
  cart: cartReducer,
  error: errorReducer,
  auth: authReducer
});
