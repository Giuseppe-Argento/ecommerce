//@ts-nocheck

// Card.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import Detail from './Detail';
import CartModal from './CartModal';
import { useDispatch } from 'react-redux';
import { addToCart } from './redux/cart.slice';


interface CardProps {
    name: string;
    price: number;
    image: string;
    slug: string;
    stripe:string;
    product: Product;
    stripePrice: string
}

const Card: React.FC<CardProps> = ({ name, image, slug, stripe, stripePrice, product, price }) => {

    const dispatch = useDispatch();

    const [isDeatilsOpen, setIsDeatilsOpen] = useState(false);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);

    const openDeatils = () => {
        setIsDeatilsOpen(true);
    };

    const closeDeatils = () => {
        setIsDeatilsOpen(false);
    };

    const openCartModal = () => {
        dispatch(addToCart(product))
        setIsCartModalOpen(true);
    };

    const closeCartModal = () => {
        setIsCartModalOpen(false);
    };

    return (
        <div className='card flex flex-col justify-between gap-4 relative'>
            <div className='productImage relative'>
                <Image src={image} alt='product' fill={true} />
            </div>
            <p className='productTitle'>{name}</p>
            <p className='productTitle'>€ {price}</p>
            <div className='flex flex-wrap gap-2 m-auto'>
                <button
                    onClick={openDeatils}
                    className='border-[2px] border-black p-2 px-5 text-sm font-semibold rounded'
                >
                    View Details
                </button>
                <button
                    className='bg-black p-2 px-5 text-sm font-semibold text-white rounded'
                    onClick={openCartModal}
                >
                    Add to Cart
                </button>
            </div>

            {isDeatilsOpen && (
                <Detail name={name} image={image} price={price} onClose={closeDeatils} />
            )}

            {isCartModalOpen && (
                <CartModal onClose={closeCartModal} />
            )}
        </div>
    );
};

export default Card;


