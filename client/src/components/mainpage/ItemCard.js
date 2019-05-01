import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { addToCart } from '../../actions/cartActions'
import '../../css/itemcard.css';


class ItemCard extends Component {
  addToCart = () => {
    const item = {
      itemId: this.props.id
    }
    console.log(item);
    this.props.addToCart(item);
  }

  onCardClick = () => {
    const itemUrl = `/details/${this.props.id}` 
    this.props.history.push({
      pathname: itemUrl,
      state: {
        id: this.props.id
      }
    })
  }

  render() {
    const { isAuth } = this.props.auth
    const cartIcon = (
      <i className="fas fa-shopping-cart" onClick={ this.addToCart }></i>
    )
      
    return (
      <div className="itemCard" onClick={ this.onCardClick }>
        <img src={ require(`../../assets/${ this.props.imgUrl }`) } alt="anime" className="item-image" />
        <div className="bottomCard">
          <h3 className="ellipsis">{ this.props.name }</h3>
          <p>{ this.props.price }</p>
          { isAuth ? cartIcon : null }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default withRouter(
  connect(mapStateToProps, { addToCart })(ItemCard)
);

