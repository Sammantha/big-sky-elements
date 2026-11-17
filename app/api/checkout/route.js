
import evaluateDiscountCode from './discountCode.js';

// export async function GET(request) {
//   return new Response(JSON.stringify(users), {
//     status: 200,
//     headers: { 'Content-Type': 'application/json' }
//   });
// }
 
export async function POST(request) {
    const DEFAULT_DISCOUNT = +process.env.NEXT_PUBLIC_DEFAULT_DISCOUNT ?? 0.00;
    const DEFAULT_SHIPPING = +process.env.NEXT_PUBLIC_SHIPPING_COST ?? 0.00;

    // trust back-end only for pricing
    const e50Price = +process.env.NEXT_PUBLIC_E50_PRICE ?? 0.00;
    const e100Price = +process.env.NEXT_PUBLIC_E100_PRICE ?? 0.00;

    // cart item =>
    //  productName:{
    //     id: string
    //     name: string
    //     price: number
    //     photoLocation: string
    //     amount: number
    //  }

    // Parse the request body for the passed-in cart details
    const body = request ? await request?.json() : {};
    const { cart, discountCode } = body;

    // Calculate the order totals
    const order = {
        cart,
        discountDollarAmount: 0,
        discountPercent: DEFAULT_DISCOUNT,
        shipping: DEFAULT_SHIPPING,
        subtotal: 0,
        total: 0
    }

    // replace passed-in cart pricing with known pricing & validate amount
    const products = Object.keys(order?.cart);
    products.forEach((productName) => {
        const cartItem = order.cart[productName];
        let price = 0;
        switch (cartItem.id) {
            case 'e50':
                price =  e50Price;
                break;
            case 'e100':
                price = e100Price;
                break;
        }

        // overwrite cart price
        order.cart[productName] =  {
            ...cartItem,
            price,
            amount: cartItem.amount > 0 && cartItem.amount < 100 ? cartItem.amount : 0
        };
    });

    // evaluate the discount code
    const discountEvaluation = evaluateDiscountCode(discountCode) ?? DEFAULT_DISCOUNT;
    order.discountPercent = discountEvaluation.discountPercent;

    // calculate subtotal & item count
    let totalNumberItems = 0;
    Object.keys(cart).map(key => {
        const cartItem = cart[key];
        order.subtotal += Math.abs((cartItem.amount) * cartItem.price);
        totalNumberItems += cartItem.amount;
    });

    // calculate total
    order.discountDollarAmount = order.subtotal * (order.discountPercent > 0.00 ? order.discountPercent : 0);
    order.shipping = totalNumberItems === 1 ? DEFAULT_SHIPPING : 0.00;
    order.total = order.subtotal - order.discountDollarAmount + order.shipping;

    return new Response(JSON.stringify(order), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    });
}
