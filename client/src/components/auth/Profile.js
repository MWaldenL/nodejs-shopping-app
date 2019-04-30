import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadUser } from '../../actions/authActions'


class Profile extends Component {
    componentDidMount() {
        console.log('async componentDidMount() called')
        this.props.loadUser()
    }

    render() {
        const { user } = this.props.auth
        let productList;
        if (user.productList) 
            productList = user.productList.map( ({ name }) => (<p>{ name }</p>));
        
        return (
            <div>
                <h1>{ user.number }</h1>
                <p>{ productList }</p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { loadUser })(Profile)
