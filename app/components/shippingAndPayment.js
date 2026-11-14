import { useState } from "react";
import Payment from "./payment";
import ShippingAddress from "./shippingAddress";

export default function ShippingAndPayment(props) {
    const { onReview } = props;

    const [shippingInfo, setShippingInfo] = useState({});
    const [shippingReady, setShippingReady] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState({});
    const [paymentReady, setPaymentReady] = useState(false);

    const updateShippingInfo = (shippingInfo) => {
        setShippingInfo(shippingInfo);
        setShippingReady(!(shippingInfo.name === '' || shippingInfo.lineOne === '' || shippingInfo.city === '' || shippingInfo.state === '' || shippingInfo.zip === '' || shippingInfo.email === '' ));
    };

    const updatePaymentInfo = (paymentInfo) => {
        setPaymentInfo(paymentInfo);
        setPaymentReady(!(paymentInfo.number === '' || paymentInfo.name === '' || paymentInfo.expiry === '' || paymentInfo.cvc === ''));
    };

    const onReviewOrder = () => {
        onReview({
            payment: paymentInfo,
            address: shippingInfo
        });
    }

    return (
        <div className="bg-white p-6">
            <div className="flex">
                <div className="w-1/2 mr-3">
                    <strong className="mr-3">Shipping Address</strong>
                    <div className="flex mt-3 w-full">
                        {/* SHIPPING ADDRESS */}                     
                        <ShippingAddress setShippingReady={updateShippingInfo} />
                    </div>
                </div>

                <div className="w-1/2">
                    <strong className="mr-3">Payment</strong>
                    <div className="flex mt-3 w-full">
                        {/* PAYMENT */}                     
                        <Payment setPaymentReady={updatePaymentInfo} />
                    </div>
                </div>
            </div>

            {/*  REVIEW ORDER */}
            <div className='flex justify-center mt-3'>
                <button className="bg-red-500 text-white p-5 w-100 disabled:bg-gray-400" disabled={!(shippingReady && paymentReady)} onClick={onReviewOrder}>Review Order</button>
            </div>
        </div>
    );
}