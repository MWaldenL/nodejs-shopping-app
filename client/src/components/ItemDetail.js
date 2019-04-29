import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getItemById } from '../actions/itemActions'
import '../css/itemdetail.css'


class ItemDetail extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getItemById(this.state.id)
    }

    render() {
        console.log(this.props.items);

        return (    
            <div className="detail-container">
                <h1>Name</h1>
                {/* <img></img> */}
                <p>Description</p>
                <h2>Price</h2>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    items: state.items
})

export default connect(null, { getItemById })(ItemDetail)