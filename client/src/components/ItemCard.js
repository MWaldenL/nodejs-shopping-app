import React, { Component } from 'react';
import '../css/itemcard.css';


export default class ItemCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="itemcard">
        <img src={ require(`../assets/${this.props.imgUrl}`) } className="item-image" />
        <h3>{ this.props.name }</h3>
        <h3>{ this.props.price }</h3>
        <button>Add to Cart</button>
      </div>
    )
  }
}
