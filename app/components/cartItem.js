"use client";

import React from "react";
import './cartItem.css';

const CartItem = props => {
  const { cartItem } = props;

  const onAmountChange = (event) => {
    const amountDesired = event.target.value;
    props.overwriteAmount({
      ...cartItem,
      amount: amountDesired
    });
  };

  const onAmountIncrease = (event) => {
    event.preventDefault();
    props.addToCart({
      ...cartItem,
      amount: 1
    });
  };

  const onAmountDecrease = (event) => {
    event.preventDefault();
    props.addToCart({
      ...cartItem,
      amount: -1
    });
  };

  const { name, price, photoLocation, amount } = cartItem;
  return (
    <div className="cartItem my-3">
      <div>
        <figure>
          <img
            src={photoLocation}
            alt={name}
          />
        </figure>
      </div>
      <div>
        <b style={{ textTransform: "capitalize" }}>
          {name}{" "}
          <span className="tag is-primary">${price}</span>
        </b>
        <div className="adjust-cart-count border border-gray-400">
          <button onClick={onAmountDecrease}>-</button>
          <input value={amount} onChange={onAmountChange} type="number"/>
          <button onClick={onAmountIncrease}>+</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;