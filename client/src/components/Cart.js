import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getCart } from '../actions/cartActions'


class Cart extends Component {
  componentDidMount() {
    this.props.getCart();
  }

  render() {
    const cart = this.props.cart.items;
    console.log(this.props.cart.items[0]);
      
    const itemList = (cart.map(
      ({ id, name, imgUrl }) => (
        <Fragment key={id}>
          <div className="itemCard">
            <img src={ require(`../assets/${ imgUrl }`) } className="item-image" />
            <h4 className="ellipsis">{ name }</h4>
          </div>
        </Fragment>
      )
    ))

    return ( 
      <div> 
        { itemList }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(mapStateToProps, { getCart })(Cart);
