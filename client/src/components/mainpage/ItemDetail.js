import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getItemById } from '../../actions/itemActions'
import { addToCart } from '../../actions/cartActions'
import { loadUser } from '../../actions/authActions'
import itemImage from '../../assets/mitsuha.jpg'
import '../../css/itemdetail.css'


class ItemDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.id
        }
    }

    componentDidMount() {
        this.props.loadUser();
        this.props.getItemById(this.props.location.state.id)
    }
    
    addToCart = () => {
        const item = {
            itemId: this.state.id
        }
        this.props.addToCart(item);
    }
    
    navigateBack = () => {
        this.props.history.goBack()
    }

    render() {
        const { item } = this.props.item;
        const { isAuth } = this.props.auth;

        return (    
                <div className="detail-container">
                    <div className="left-side">
                        <nav className="navbar detail-nav">
                            <i className="fas fa-chevron-left" onClick={ this.navigateBack }></i>
                        </nav>
                        <div className="detail-text">
                            <h1>{ item.name }</h1>
                            <p>{ item.description }</p>
                            <h2>{ item.unitPrice }</h2>
                            { 
                                isAuth ? 
                                <button className="btn" onClick={ this.addToCart }>Add to Cart</button> : 
                                null 
                            }
                        </div>
                    </div>
                    <div className="right-side">
                        <img src={ itemImage } className="detail-image" alt="chan" />
                    </div>
                </div>

        )
    }
}

const mapStateToProps = state => ({
    item: state.item,
    cart: state.cart,
    auth: state.auth
})

export default withRouter(
    connect(mapStateToProps, { getItemById, addToCart, loadUser })(ItemDetail)
)