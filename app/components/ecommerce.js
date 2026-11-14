"use client";

import { useState } from "react";
import Cart from "./cart";
import ReviewOrder from "./reviewOrder";
import ShippingAndPayment from './shippingAndPayment';
import ThankYou from "./thankYou";

export default function Ecommerce() {
    /**
     * 0 = cart
     * 1 = shipping & payment
     * 2 = review purchase
     * 3 = thank you
     */
    const [page, setPage] = useState(0);
    const [cart, setCart] = useState({});
    const [address, setAddress] = useState(null);

    const advancePage = () => {
        setPage(page + 1);
    };

    const reversePage = () => {
        setPage(page - 1);
    };

    const saveCartInfo = (cartInfo) => {
        // look at the top of cart.js for how cartInfo is structured
        setCart(cartInfo);
        advancePage();
    };

    const saveShippingInfo = (shippingInfo) => {
        setAddress(shippingInfo);
        advancePage();
    }

    return (
        <div>
            {/* Display cart on load */}
            <div className={page > 0 ? "hidden" : ""}>
                <Cart onCheckout={(cartInfo) => saveCartInfo(cartInfo)}/>
            </div>

            {/* When the Checkout button is clicked, display Shipping Address & Payment */}
            <div className={page !== 1 ? "hidden" : ""}>
                <ShippingAndPayment onReview={(shippingInfo) => saveShippingInfo(shippingInfo)}/>
                <button className="p-3" onClick={reversePage} >{`< back`}</button>
            </div>
            {/* When the Review button is clicked, display a review of the order */}
            <div className={page !== 2 ? "hidden" : ""}>
                <ReviewOrder onPayment={advancePage} cart={cart} details={address}/>
                <button className="p-3" onClick={reversePage} >{`< back`}</button>
            </div>
            {/* When the Place Order button is clicked, display a thank you page */}
            <div className={page < 3 ? "hidden" : ""}>
                <ThankYou/>
            </div>
        </div>
    );
}