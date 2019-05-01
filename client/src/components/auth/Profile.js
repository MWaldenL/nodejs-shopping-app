import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadUser } from '../../actions/authActions'
import { addItem } from '../../actions/itemActions'


class Profile extends Component {
    componentDidMount() {
        this.props.loadUser()
    }

    onAddItem = () => {
        
    }

    render() {
        const { user } = this.props.auth
        let productList;
        if (user.productList) 
            productList = user.productList.map( ({ name }) => (<p>{ name }</p>));
        
        return (
            <div>
                <h1>{ user.name }</h1>
                <h2>My Products</h2>
                <p>{ productList }</p>
                <button className="btn" onClick={ this.onAddItem }>Add New Item</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    item: state.item
})

export default connect(mapStateToProps, { loadUser, addItem })(Profile)
