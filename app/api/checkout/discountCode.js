export default function evaluateDiscountCode(discountCode) {
    const FIRST_RESPONDER_DISCOUNT_CODE = process.env.NEXT_PUBLIC_FIRST_RESPONDER_DISCOUNT_CODE ?? '';
    const discountCodeLower = discountCode?.toLowerCase();
    let discountPercent = 0.00;

    switch (discountCodeLower) {
        case FIRST_RESPONDER_DISCOUNT_CODE:
            discountPercent = +process.env.NEXT_PUBLIC_FIRST_RESPONDER_DISCOUNT_PERCENT ?? 0
            break;
        default:
            discountPercent = 0.00;
            break;
    }
    return {discountCode, discountPercent};
}
