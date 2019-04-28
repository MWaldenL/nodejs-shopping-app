import React, { Component } from 'react'
import ItemCard from './ItemCard';
import { getItems } from '../actions/itemActions';
import { connect } from 'react-redux';
import '../css/mainpage.css'


class MainPage extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  render() {
    const { items } = this.props.item;
    console.log(this.props.auth);

    const itemList = (
      items.map( ({ _id, name, unitPrice, imgUrl }) => (
          <ItemCard key={_id} name={ name } price={ unitPrice } imgUrl={ imgUrl } />
      ))
    )

    return (
      <div className="main-container"> 
        { this.props.isAuth ? itemList : null }
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
