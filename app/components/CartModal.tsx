//@ts-nocheck

// Deatils.tsx
import React from 'react';
import { MinusSmallIcon, PlusSmallIcon, SparklesIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
// Importing hooks from react-redux
import { useSelector, useDispatch } from 'react-redux';
import { checkout } from '../utils/checkout';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51Gvs9lG8Eb6lvUjg4RzBs2fuVZPaHU1RQBbuGNq4F1gRhdzLRdFFAGEjrf2vboEMg866Hv392EXdzzcEkOlcaeyh00TymnI58x');

import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from './redux/cart.slice';


interface DeatilsProps {
  image: string;
  title: string;
  price: number;
  stripePrice: string

  onClose: () => void;
}

const CartModal: React.FC<DeatilsProps> = ({ title, image, price, onClose }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const shippingPrice = 10;

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0
    );
  };

  const getGrandTotalPrice = () => {
    return getTotalPrice() + shippingPrice;
  };

  const handlecheckout = async (event) => {

  
    try {
      // Create a session with line items
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: cart.map(item => ({
          price: item.id,
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: 'https://your-website.com/success',
        cancel_url: 'https://your-website.com/cancel',
      });
  
      // Store the session ID in the user's session or handle it as needed
      // This is a simplified example and may vary based on your server framework
      // For Express.js, you might use req.session.sessionId = session.id
      // Make sure to configure your session management appropriately
      // This data would typically be stored in a database in a real-world scenario
      const sessionId = session.id;
  
      // Redirect the user to the Stripe checkout page
      // You may want to send the session ID to the client and handle redirection there
      // For example, window.location.href = session.url;
      console.log('Redirecting to checkout:', session.url);
    } catch (error) {
      console.error('Error creating checkout session:', error.message);
    }
  };
  

  return (
    <>


      <div className='fixed inset-0 bg-black bg-opacity-50 z-50'>
        <div className='fixed inset-y-0 right-0 max-w-full w-1/2 bg-white p-4 transform translate-x-0 transition-transform ease-in-out duration-300 overflow-y-auto'>
          <div className='flex flex-col gap-4 min-h-[80vh] mt-4'>
            <h1 className='text-xl font-semibold text-center z-50'>Cart</h1>
            {cart.length === 0 ? (
              <div className='w-full h-[100vh] grid place-items-center fixed bg-white z-40'>
                <div className='grid place-items-center gap-2 bg-[#ffe500] w-[240px] h-[240px] rounded-full opacity-85'>
                  <div className='flex flex-col items-center'>
                    <SparklesIcon className='h-8 w-8' />
                    <h1 className='font-bold'>Your cart is empty..</h1>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.id} className='flex flex-wrap justify-between gap-4 items-center border-b-[1px] border-dotted border-black py-6'>
                    <Image src={item.images[0]} height="90" width="65" alt="cart image" />
                    <p className='text-sm font-semibold w-1/3'>{item.name}</p>
                    <div className='flex flex-col items-center -mt-3'>
                      <p className='text-[8px]'>Price</p>
                      <p className='text-sm font-bold'>€ {item.price}</p>
                    </div>
                    <div className='flex flex-wrap items-center gap-4 font-semibold'>
                      <button className="grid place-items-center p-1 rounded-full bg-black text-white" onClick={() => dispatch(decrementQuantity(item.id))}>
                        <MinusSmallIcon className='h-4 w-4 text-white' />
                      </button>
                      <div className='flex flex-col items-center -mt-3'>
                        <p className='text-[8px]'>Qty</p>
                        <p>{item.quantity}</p>
                      </div>
                      <button className="grid place-items-center p-1 rounded-full bg-black text-white" onClick={() => dispatch(incrementQuantity(item.id))}>
                        <PlusSmallIcon className='h-4 w-4 text-white' />
                      </button>
                    </div>
                    <div className='flex flex-col items-center -mt-3'>
                      <p className='text-[8px]'>Total</p>
                      <p className='text-sm font-bold'>€ {item.quantity * item.price}</p>
                    </div>
                    <button className='border-[1px] border-gray-600 rounded-md p-1' onClick={() => dispatch(removeFromCart(item.id))}>
                      <TrashIcon className='w-3 h-3 text-gray-600' />
                    </button>
                  </div>
                ))}

              </>
            )}
            <div className='py-4 w-full flex flex-wrap justify-end gap-6 itemas-center'>
              <h2 className='font-bold text-md text-right'><span className='font-semibold text-sm mr-1'>Shipping</span> € {shippingPrice}</h2>
              <h2 className='font-bold text-md text-right'><span className='font-semibold text-sm mr-1'>Tax</span> € 0</h2>
              <h2 className='font-bold text-md text-right'><span className='font-semibold text-sm mr-1'>Total</span> € {getTotalPrice()}</h2>
            </div>
          </div>

          <div className='w-full flex flex-wrap justify-center'>
            <button
              className='bg-black p-2 px-5 text-sm font-semibold text-white py-4 w-1/3 mb-12 rounded mt-8'
              onClick={handlecheckout}
            >
              Checkout € {getGrandTotalPrice() + shippingPrice}
            </button>
          </div>

          <button
            className='absolute top-4 right-4 z-50'
            onClick={onClose}
          >
            <XMarkIcon className='w-6 h-6' />
          </button>
        </div>

      </div>

    </>

  );
};

export default CartModal;
