// Header.tsx

//@ts-nocheck

import { Bars2Icon, HeartIcon, ShoppingCartIcon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import CartModal from './CartModal';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMenuOpen }) => {

  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  // Selecting cart from global state
  const cart = useSelector((state) => state.cart);

  // Getting the count of items
  const getItemsCount = () => {
    return cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
  };

  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };


  return (
    <header className="fixed w-full h-[48px] flex flex-wrap items-center justify-between z-30 px-[24px]">
      <div className="logo">LM10</div>
      <div className='flex flex-wrap items-center gap-6'>
        <div className='flex flex-wrap items-center gap-4 pt-1'>
          <UserIcon className='h-6 w-6' />
          <HeartIcon className='h-6 w-6' />
          <span className='flex flex-wrap items-center cursor-pointer' onClick={openCartModal} >
            <button>
              <ShoppingCartIcon className='h-6 w-6' />
            </button>
            <div className='grid place-items-center rounded-full bg-black text-white absolute ml-4 -mt-4'>
              <p className='text-xs  font-bold px-1'>{getItemsCount()}</p>
            </div>
          </span>


        </div>
        <button
          onClick={onMenuToggle}
          className="grid place-items-center p-1 bg-[#ffe500] rounded-full"
        >
          {isMenuOpen ? <XMarkIcon className='h-6 w-6 text-black' /> : <Bars2Icon className='h-6 w-6 text-black' />}
        </button>
      </div>
      {isCartModalOpen && (
        <CartModal onClose={closeCartModal} />
      )}
    </header>
  );
};

export default Header;

