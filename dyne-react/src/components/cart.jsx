import React, { Component } from "react";
import SimpleFoodItem from "./simpleFoodItem";

class Cart extends Component {
  state = {};

  render() {
    console.log("===================================");
    console.log(this.props);
    
    var simpleFoodItems = {};
    if (this.props.foodItems) {
        this.props.foodItems.forEach((foodItem) => {
            const id = foodItem.id;
            if (id in simpleFoodItems) {
                simpleFoodItems[id].count = simpleFoodItems[id].count + 1;
            } else {
                simpleFoodItems[id] = {};
                simpleFoodItems[id].name = foodItem.name;
                simpleFoodItems[id].price = foodItem.price;
                simpleFoodItems[id].count = 1;
            }
        })
    }
    const totalPrice = Object.values(simpleFoodItems).reduce(((a, c) => {
        return a + (c.price * c.count);
    }), 0);
    console.log(totalPrice);

    return (
        <>
        <div className="container">
            <h5>Cart</h5>
            {Object.values(simpleFoodItems).map((foodItem) => (
                <SimpleFoodItem key={foodItem.id} foodItem={foodItem} />
            ))}
        </div>
        <h>Total Price: ${totalPrice}</h>
        </>
    );
  }
}

export default Cart;