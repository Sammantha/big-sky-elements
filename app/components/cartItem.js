"use client";

import React from "react";
import './cartItem.css';

const CartItem = props => {
  const { cartItem } = props;
  const displayModifierButtons = !!props.addToCart;
  const disableCountInput = !(!!props.overwriteAmount);

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
      <div className="flex flex-row">
        <img className="m-2" src={photoLocation} alt={name} width={100}/>
        <div className="flex flex-col justify-between">
          <b>{name}</b>
          <div id="adjust-cart-count" className="flex justify-between items-center">
            {/* Increase/Decrease Buttons & Count display */}
            <div id="quantityControl" className="flex bg-gray-200 rounded-xl mr-3">
              {/* If props.addToCart is not provided, do not display - button */}
              { displayModifierButtons && <button className="m-1.5 ml-3 mr-3" onClick={onAmountDecrease}>-</button> }
              {/* If props.overwriteAmount is not provided, disable the input */}
              <input className="w-10 text-center" disabled={disableCountInput} value={amount} onChange={onAmountChange} type="number"/>
              {/* If props.addToCart is not provided, do not display + button */}
              { displayModifierButtons && <button className="m-1.5 ml-3 mr-3" onClick={onAmountIncrease}>+</button> }
            </div>
            <span>${price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;