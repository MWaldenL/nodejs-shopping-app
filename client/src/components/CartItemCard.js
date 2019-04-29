import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeFromCart } from '../actions/cartActions'


class CartItemCard extends Component {
    removeFromCart = () => {
        let item = {
            itemId: this.props.id
        }

        this.props.removeFromCart(item);
    }

    render() {
        return (
            <div className="itemCard">
                <img src={ require(`../assets/${ this.props.imgUrl }`) } alt="anime" className="item-image" />
                <div className="bottomCard">
                    <h4 className="ellipsis">{ this.props.name }</h4>
                    <button className="btn" 
                            onClick={ this.removeFromCart }>
                            Remove from Cart
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cart: state.cart
})

export default connect(mapStateToProps, { removeFromCart })(CartItemCard);