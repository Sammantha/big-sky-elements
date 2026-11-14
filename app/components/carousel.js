"use client";

import Glider from 'react-glider';
import 'glider-js/glider.min.css';

export default function Carousel({children}) {
    return <Glider 
        draggable 
        hasArrows 
        hasDots 
        slidesToShow={1} 
        slidesToScroll={1} 
        responsive={[
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]}>{children}</Glider>
}