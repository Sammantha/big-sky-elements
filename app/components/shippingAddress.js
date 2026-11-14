"use client";

import { useEffect, useState } from "react";

export default function ShippingAddress(props){
    const [name, setName] = useState('');
    const [lineOne, setLineOne] = useState('');
    const [lineTwo, setLineTwo] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        props.setShippingReady({name, lineOne, city, state, zip, email});
    }, [name, lineOne, city, state, zip, email]);

    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const onStreetChange = (event) => {
        setLineOne(event.target.value);
    }

    const onAptChange = (event) => {
        setLineTwo(event.target.value);
    }

    const onCityChange = (event) => {
        setCity(event.target.value);
    }

    const onStateChange = (event) => {
        setState(event.target.value);
    }

    const onZipChange = (event) => {
        setZip(event.target.value);
    }

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    return (
        <div className="flex w-full">
            {/* SHIPPING ADDRESS */}                     
            <div className="flex flex-col w-full">
                <input value={name} onChange={onNameChange} placeholder="Name"/>
                <input value={lineOne} onChange={onStreetChange} placeholder="Address Line 1"/>
                <input value={lineTwo} onChange={onAptChange} placeholder="Address Line 2"/>
                <input value={city} onChange={onCityChange} placeholder="City"/>
                <input value={state} onChange={onStateChange} placeholder="State"/>
                <input value={zip} onChange={onZipChange} type='number' placeholder="Zip"/>
                <input value={email} onChange={onEmailChange} placeholder="Email"/>
            </div>
        </div>
    );
}
