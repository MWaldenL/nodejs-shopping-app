import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from '../actions/cartActions'
import '../css/itemcard.css';


export default class ItemCard extends Component {
  render() {
    return (
      <div className="itemCard">
        <img src={ require(`../assets/${this.props.imgUrl}`) } className="item-image" />
        <div className="bottomCard">
          <h4 className="ellipsis">{ this.props.name }</h4>
          <h3>{ this.props.price }</h3>
          <button className="btn">Add to Cart</button>
        </div>
      </div>
    )
  }
}

// const mapStateToProps = state => ({
//   cart: state.cart
// })

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
}

// export default connect(null, { addToCart })(ItemCard);