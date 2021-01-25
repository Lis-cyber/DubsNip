
import { combineReducers } from 'redux';
import products from './products';
import categories from './categories';
import cart from './cart';
import users from "./users";
import order from "./order";
import review from "./review";


export default combineReducers({
  products,
  categories,
  cart,
  users,
  order,
  review
})
