import React, { Component } from 'react'
import ItemCard from './ItemCard';
import SellerCard from './SellerCard';
import { getItems } from '../../actions/itemActions';
import { connect } from 'react-redux';
import '../../css/mainpage.css'


class MainPage extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  render() {
    const { items } = this.props.item;

    const itemList = (
      items.map( ({ _id, name, unitPrice, imgUrl }) => (
          <ItemCard key={_id} 
            id={_id} 
            name={ name } 
            price={ unitPrice } 
            imgUrl={ imgUrl } />
      ))
    )

    return (
        <div className="item-container">
          <div className="banner" />
          <h1>Products on Sale</h1>
          <div className="item-container"> 
            { itemList }
          </div>
          <h1>Shop by Manufacturer</h1>
          <div className="item-container mb-3"> 
            <SellerCard />
            <SellerCard />
            <SellerCard />
            <SellerCard />
            <SellerCard />
            <SellerCard />
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { getItems })(MainPage);
