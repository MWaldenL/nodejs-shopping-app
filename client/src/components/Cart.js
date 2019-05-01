import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadUser } from '../actions/authActions'
import { getCart, removeFromCart } from '../actions/cartActions'
import CartItemCard from './CartItemCard'
import '../css/itemcard.css'


class Cart extends Component {
  componentDidMount() {
    this.props.loadUser();
    this.props.getCart();
  }

  render() {
    const { items } = this.props.cart;
      
    const itemList = ( 
      items.map( ({ _id, name, imgUrl }) => (
        <CartItemCard key={_id} id={_id} name={name} imgUrl={imgUrl} /> 
      ))
    )

    return ( 
      <div className="main-container"> 
        { itemList }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  auth: state.auth
})

export default connect(mapStateToProps, { getCart, removeFromCart, loadUser })(Cart);
