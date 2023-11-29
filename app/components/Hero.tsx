//@ts-nocheck

'use client'

import React, { useState, useEffect, useReducer } from 'react';





function Hero() {
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    }

    return (
        <div className='w-full'>
            <div className='absolute h-screen w-full grid place-items-center top-0 z-10'>
                <div className='mt-8'>
                    <h1 className='text-[7.2rem] font-bold text-white'>LARGO MARADONA 10</h1>
                    <p className='capitalize text-[4.8rem] font-bold text-white text-center'>a tribute t-shirt shop</p>
                    <p className='text-[4.8rem] font-bold text-white text-center'>#fromnapolitotheworld</p>
                </div>
            </div>
            <video autoPlay loop muted className="bg-vid">
                <source src='./video.mp4' type="video/mp4" />
            </video>

        </div >

    );
}

export default Hero;