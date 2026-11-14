"use client";

import { useEffect, useState } from 'react';
import CartItem from './cartItem';
import DiscountCode from './discountCode';

const DEFAULT_CART = {
    e50:{
        id: "e50",
        name: "Element Fire Extinguisher E50",
        price: +process.env.NEXT_PUBLIC_E50_PRICE ?? 0.00,
        photoLocation: "img/E50_logo.png",
        amount: 1
    },
    e100: {
        id: "e100",
        name: "Element Fire Extinguisher E100",
        price: +process.env.NEXT_PUBLIC_E100_PRICE ?? 0.00,
        photoLocation: "img/E100_logo.png",
        amount: 0
    }
};
const DEFAULT_DISCOUNT = +process.env.NEXT_PUBLIC_DEFAULT_DISCOUNT ?? 0.00;
const DEFAULT_SHIPPING = +process.env.NEXT_PUBLIC_SHIPPING_COST ?? 0.00;
const DEFAULT_STATE = {
    cart: DEFAULT_CART,
    shipping: DEFAULT_SHIPPING,
    subtotal: 0,
    discountPercent: DEFAULT_DISCOUNT,
    discountDollarAmount: 0,
    total: 0
};

export default function Cart(props) {
    const { onCheckout } = props;
    const [state, setState] = useState(DEFAULT_STATE);

    // load the existing cart from the local storage on component load
    useEffect(() => {
        let cart = localStorage.getItem("cart");
        if (cart) {
            const parsed = JSON.parse(cart);
            // only override the default cart if the localStorage has a value
            setStateAndUpdateTotals(parsed.length > 0 ? cart : DEFAULT_CART);
        } else {
            setState(DEFAULT_STATE);
        }
    }, []);

    const setStateAndUpdateTotals = cart => {
        let discountPercent = state.discountPercent;
        let discountDollarAmount = 0;
        let subtotal = 0;
        let shipping = 0;
        let total = 0;
        // set the cart state, overwrite subtotal, shipping, discountDollarAmount, & total, & retain discount
        setState({ cart, subtotal, shipping, discountPercent, discountDollarAmount, total });
        // calculate subtotal & item count
        let totalNumberItems = 0;
        Object.keys(cart).map(key => {
            const cartItem = cart[key];
            subtotal += Math.abs((cartItem.amount) * cartItem.price);
            totalNumberItems += cartItem.amount;
        });
        // calculate total
        discountDollarAmount = subtotal * ((discountPercent > 0.00) ? (discountPercent) : 0);
        shipping = totalNumberItems === 1 ? DEFAULT_SHIPPING : 0.00;
        total = subtotal - discountDollarAmount + shipping;
        // set the subtotal, shipping, & total states, retaining the cart state & discount
        setState({ cart, subtotal, shipping, discountPercent, discountDollarAmount, total });
    }

    // appends the item using the item ID as key for the cart object
    const addToCart = cartItem => {
        let cart = state.cart;
        // checks the cart object to see if an item with that key exists
        if (cart[cartItem.id]) {
            // If it does, it increases/decreases the amount
            const amountToAdd = +cartItem.amount;
            const potentialAmount = amountToAdd + cart[cartItem.id].amount;
            // disallow amounts over 25?
            // if (potentialAmount > 25) {
            //     console.log('For bulk orders of over 25, please email the seller directly.');
            // } else 
            // disallow negative numbers
            if (potentialAmount < 0) {
                cart[cartItem.id].amount = 0;
            } else if (potentialAmount >= 0 || potentialAmount <= 25) {
                cart[cartItem.id].amount += amountToAdd;
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        // setState({ cart, subtotal });
        setStateAndUpdateTotals(cart);
    };

    // overwrites the desired amount of the item using the item ID as key for the cart object
    const overwriteAmount = cartItem => {
        let cart = state.cart;
        // checks the cart object to see if an item with that key exists
        if (cart[cartItem.id]) {
            // If it does, it overwrites the amount
            const potentialAmount = +cartItem.amount;
            // disallow amounts over 25?
            // if (potentialAmount > 25) {
            //     console.log('For bulk orders of over 25, please email the seller directly.');
            // } else 
            // disallow negative numbers
            if (potentialAmount < 0) {
                cart[cartItem.id].amount = 0;
            } else if (potentialAmount >= 0 || potentialAmount <= 25) {
                cart[cartItem.id].amount += +cartItem.amount;
            }
            cart[cartItem.id].amount = potentialAmount;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        // setState({ cart, subtotal });
        setStateAndUpdateTotals(cart);
    };

    // change the discount, or reset it to the default discount if the discount is unusual
    const changeDiscount = discountAmount => {
        state.discountPercent = discountAmount > 0.00 && discountAmount < .1 ? discountAmount : DEFAULT_DISCOUNT;
        setStateAndUpdateTotals(state.cart);
    }

    const checkout = () => {
        // pass along all cart details so email can be sent and review order page is accurate
        onCheckout(state);
    }

    return (
        <div className="bg-white p-3">
            {Object.keys(state.cart || {}).length
                ? ( <>
                {/*  CART ITEMS */}
                {Object.keys(state.cart || {}).map(key => (
                    <div className="flex p-3" key={key}>                                
                        <div className="w-1/2">
                            <CartItem
                                cartKey={key}
                                cartItem={state.cart[key]}
                                addToCart={addToCart}
                                overwriteAmount={overwriteAmount}
                            />
                        </div>
                        <div className="flex w-1/2 items-end justify-end">
                            ${Math.abs((state.cart[key].amount) * state.cart[key].price).toFixed(2)}
                        </div>
                    </div>
                    ))}

                    {/* DISCOUNT INPUT */}
                    <DiscountCode changeDiscount={changeDiscount}/>

                    {/* TOTALS */}
                    <div className='flex flex-col items-end p-3'>
                        <div><strong className="mr-3">Subtotal:</strong>${(state.subtotal || 0).toFixed(2)}</div>
                        <div className={state.discountDollarAmount > 0.00 ? '' : 'hidden'}><div className='text-red-500'><strong className="mr-3">Discount:</strong> - ${state.discountDollarAmount.toFixed(2)}</div></div>
                        <div><strong className="mr-7">Flat Shipping Fee:</strong>${(state.shipping ?? 0).toFixed(2)}</div>
                        <div><strong className="mr-3">Total:</strong> ${(state.total || 0).toFixed(2)}</div>
                    </div>

                    {/*  CHECKOUT */}
                    <div className='flex justify-center mt-3'>
                        <button className="bg-red-500 text-white p-5 w-100" onClick={checkout}>Checkout</button>
                    </div>
                </>) : (<>
                    {/* when the cart is empty */}
                    <p>Nothing in the cart!</p>
                </>
            )}
        </div>
    );
};
