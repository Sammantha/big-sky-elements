"use client";

import { useState } from "react";

const FIRST_RESPONDER_DISCOUNT_CODE = process.env.NEXT_PUBLIC_FIRST_RESPONDER_DISCOUNT_CODE ?? '';

const DiscountCode = props => {
    const [state, setState] = useState('');

    const evaluateDiscountCode = (discountCode) => {
        const discountCodeLower = discountCode.toLowerCase();
        let discountPercent = 0.00;

        switch (discountCodeLower) {
            case FIRST_RESPONDER_DISCOUNT_CODE:
                discountPercent = +process.env.NEXT_PUBLIC_FIRST_RESPONDER_DISCOUNT_PERCENT ?? 0
                break;
            default:
                discountPercent = 0.00;
                break;
        }
        return discountPercent;
    }

    const onChangeDiscountCode = (event) => {
        const discountCodeClean = event.target.value.trim()
        setState(discountCodeClean);
        const discountPercent = evaluateDiscountCode(discountCodeClean);
        props.changeDiscount(discountPercent);
    }

    return (
        <div className="p-3">
            <p>Discount Code:</p>
            <input value={state} onChange={onChangeDiscountCode} className="border border-gray-400"/>
        </div>
    );
}

export default DiscountCode;