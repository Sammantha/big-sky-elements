import { useEffect, useState } from 'react';

const CARD_TYPES = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
};

export default function Payment(props) {
    const [cardInfo, setCardInfo] = useState({
        number: '',
        name: '',
        expiry: '',
        cvc: '',
    });
    const [cardType, setCardType] = useState('unknown');

    useEffect(() => {
        props.setPaymentReady({number: cardInfo.number, name: cardInfo.name, expiry: cardInfo.expiry, cvc: cardInfo.cvc, type: cardType});
    }, [cardInfo.number, cardInfo.name, cardInfo.expiry, cardInfo.cvc]);

    const formatCardNumber = (number) => {
        // Format number for display, ex "1234 5678 9012 3456"
        const numberWithoutSpaces = number.replace(/\s+/g, '');
        return numberWithoutSpaces.replace(/(\d{4})/g, '$1 ').trim();
    };

    const formatExpiry = (number) => {
        // Format number for display, ex "12/30"
        const numberWithoutSlashes = number.replace(/\/+/g, '');
        return numberWithoutSlashes.replace(/(\d{2})/g, '$1/').trim();
    };

    const getCardType = (number) => {
        return Object.keys(CARD_TYPES).find((type) => CARD_TYPES[type].test(number)) || 'unknown';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;
        if (name === 'number') {
            formattedValue = formatCardNumber(value).slice(0,19);
            setCardType(getCardType(value));
        } else if (name === 'expiry') {
            formattedValue = formatExpiry(value).slice(0,5);
        }
        // Other validations for expiry and cvc can be added here
        setCardInfo({ ...cardInfo, [name]: formattedValue });
    };

    return (
        <div className={`w-full card-type-${cardType}`}>
            <div className='flex w-full items-end'>
                { cardType === 'visa' || cardType == 'unknown' ? <img width="32" src="img/svg/visa.svg" /> : <img width="32" src="img/svg/visaGray.svg" /> }
                { cardType === 'mastercard' || cardType == 'unknown' ? <img width="32" src="img/svg/masterCard.svg" /> : <img width="32" src="img/svg/masterCardGray.svg" /> }
                { cardType === 'amex' || cardType == 'unknown' ? <img width="32" src="img/svg/amex.svg" /> : <img width="32" src="img/svg/amexGray.svg" /> }
            </div>
            <input className="w-full" type="text" name="number" value={cardInfo.number} onChange={handleInputChange} placeholder="Card Number" />
            <div className='flex'>
                <input className="mr-3" type="text" name="expiry" value={cardInfo.expiry} onChange={handleInputChange} placeholder="Expiration Date (MM/YY)"/>
                <div className="flex">
                    <input type="text" name="cvc" value={cardInfo.cvc} onChange={handleInputChange} placeholder="Security Code" maxLength={4}/>
                    <img src="img/svg/cvc.svg" />
                </div>
            </div>
            <input className="w-full" type="text" name="name" value={cardInfo.name} onChange={handleInputChange} placeholder="Cardholder Name"/>
        </div>
    )
}