import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCart, removeFromCart } from '../actions/cartActions'
import CartItemCard from './CartItemCard'
import '../css/itemcard.css'


class Cart extends Component {
  componentDidMount() {
    this.props.getCart();
  }

  render() {
    const cart = this.props.cart.items;
      
    const itemList = ( 
      cart.map( ({ id, name, imgUrl }) => (
        <CartItemCard key={id} id={id} name={name} imgUrl={imgUrl} /> 
      ))
    )

    return ( 
      <div className="main-container"> 
        <nav className="navbar">
          <a href="/"><i className="fas fa-arrow-left"></i></a>
        </nav>
        { itemList }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(mapStateToProps, { getCart, removeFromCart })(Cart);
