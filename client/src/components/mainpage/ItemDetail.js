import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getItemById } from '../../actions/itemActions'
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
        this.props.getItemById(this.props.location.state.id)
    }
    
    render() {
        const { item } = this.props.item;
        console.log(item);

        return (    
            <div className="detail-container">
                <div className="left-side">
                    <h1>{ item.name }</h1>
                    <p>{ item.description }</p>
                    <h2>{ item.unitPrice }</h2>
                    <button className="btn">Add to Cart</button>
                </div>
                <div className="right-side">
                    <img src={ itemImage } className="detail-image" alt="chan" />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    item: state.item
})

export default connect(mapStateToProps, { getItemById })(ItemDetail)