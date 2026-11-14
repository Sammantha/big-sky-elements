"use client";

import { useState } from "react";
import CartItem from "./cartItem";

export default function ReviewOrder(props){
    const { details, cart, onPayment } = props;
    const [state, setState] = useState('');

    const onPayNow = () => {
        // Possible TODO: implement locking so customer cannot click Pay Now twice?
        // TODO: reach out to Square to post the details
        // TODO: then clear state right after the success comes through
        onPayment();
        // TODO: if failure, display error from Square & unlock button(?)
    }

    return (
        <div className="bg-white p-3">
            <div className="flex p-3">
                <div className="flex flex-col w-1/2">
                    <div className="mb-5">
                        {/* Shipping Address */}
                        <strong>Shipping Address:</strong>
                        <div>{details?.address?.name}</div>
                        <div>{details?.address?.lineOne}</div>
                        {details?.address?.lineTwo !== null && <div>{details?.address?.lineTwo}</div> }
                        <div>{`${details?.address?.city}, ${details?.address?.state} ${details?.address?.zip}`}</div>
                        <div>{details?.address?.email}</div>
                    </div>
                    <div>
                        {/* Payment method */}
                        <strong>Payment:</strong>
                        <div className="flex items-center">
                            { details?.payment?.type === 'visa' && <img width="32" src="img/svg/visa.svg" /> }
                            { details?.payment?.type === 'mastercard' && <img width="32" src="img/svg/masterCard.svg" /> }
                            { details?.payment?.type === 'amex' && <img width="32" src="img/svg/amex.svg" /> }
                            { - details?.payment?.number.substring(details?.payment?.number.length - 4, details?.payment?.number.length) }
                        </div>
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="mb-5">
                        {/* Cart Details */}
                        {Object.keys(cart.cart || {}).map((key) => (
                            cart.cart[key].amount > 0 
                            && <CartItem
                                    key={key}
                                    cartKey={key}
                                    cartItem={cart.cart[key]}
                                />
                        ))}
                    </div>

                    {/* TOTALS */}
                    <div className='flex flex-col items-end'>
                        <div><strong className="mr-3">Subtotal:</strong>${(cart?.subtotal || 0).toFixed(2)}</div>
                        <div className={cart?.discountDollarAmount > 0.00 ? '' : 'hidden'}><div className='text-red-500'><strong className="mr-3">Discount:</strong> - ${cart?.discountDollarAmount?.toFixed(2)}</div></div>
                        <div><strong className="mr-7">Flat Shipping Fee:</strong>${(cart?.shipping ?? 0).toFixed(2)}</div>
                        <div><strong className="mr-3">Total:</strong> ${(cart?.total || 0).toFixed(2)}</div>
                    </div>
                </div>
            </div>


            {/*  PAY */}
            <div className='flex justify-center'>
                {/* This wil be replaced with a Square button */}
                <button className="bg-red-500 text-white p-5 w-100" onClick={onPayNow}>Pay Now</button>
            </div>
        </div>
    );
}
