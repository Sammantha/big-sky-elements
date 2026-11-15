'use client'

import { useEffect, useState, React } from "react";

export default function Banner() {
    const [activeSales, setActiveSales] = useState([]);

    const getActiveSales = () => {
        let sales = [];
        const nowMountain = new Date().toLocaleString('en', {timeZone: 'America/Denver'});
        const november26thMountain = new Date(2026, 10, 26, 0, 0, 0, 0).toLocaleString('en', {timeZone: 'America/Denver'}); // months are 1-indexed
        // const novemberFirstMountain = new Date(2026, 10, 1, 0, 0, 0, 0).toLocaleString('en', {timeZone: 'America/Denver'}); // months are 1-indexed
        
        if (nowMountain >= november26thMountain) {
            sales.push('Black Friday 10% off! Use code BFRIDAY at checkout');
        }
        return sales;
    };

    useEffect(() => {
        setActiveSales(getActiveSales());
    }, []);

    return (
        <>
        { activeSales.length > 0 && activeSales.map((sale) => {
            return (
                <div className='max-w bg-yellow-400 text-center p-3 flex justify-evenly'>
                    <p>{sale}</p>
                </div>
            );
        })}
        </>
    );
}
