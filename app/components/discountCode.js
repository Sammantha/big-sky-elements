"use client";

import { useCallback, useState } from "react";
import evaluateDiscountCode from '../api/checkout/discountCode';
import debounce from 'debounce';

export default function DiscountCode(props) {
    const [state, setState] = useState('');

    // debounce 0.75 seconds
    const debouncedPassBack = useCallback(debounce((discountCodeClean) => {
        props.changeDiscount(evaluateDiscountCode(discountCodeClean));
    }, 750), []);

    const onChangeDiscountCode = (event) => {
        const discountCodeClean = event.target.value.trim();
        setState(discountCodeClean);
        debouncedPassBack(discountCodeClean);
    };

    return (
        <div className="p-6 w-1/2">
            <p>Discount Code:</p>
            <input value={state} onChange={onChangeDiscountCode} className="border border-gray-400"/>
        </div>
    );
}
