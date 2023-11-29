// Deatils.tsx
import React from 'react';
import Image from 'next/image';
import { CreditCardIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';



interface DeatilsProps {
  image: string;
  name: string;
  price: number;
  stripe: string;
  link:string
  onClose: () => void;
}

const Deatils: React.FC<DeatilsProps> = ({ name, image, price, onClose }) => {

  
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50'>
      <div className='fixed inset-y-0 right-0 max-w-full w-1/2 bg-white p-4 transform translate-x-0 transition-transform ease-in-out duration-300 grid place-items-center overflow-y-auto'>
        {/* Apply overflow-y-auto to enable scrolling */}
        <div className='flex flex-col gap-12 py-12'>
          <p className='text-xl font-semibold mb-4 text-center'>{name}</p>
          <p className='text-xl font-semibold mb-4 text-center'>€ {price}</p>
          <Image className="m-auto" src={image} alt='product detail' width={400} height={600} />
          <div className='flex flex-col justify-center items-center w-full gap-4'>
            <Link className='flex flex-wrap w-full' href='#'>
              <button
                className='bg-[#ffe500] p-2 px-5 text-sm font-semibold text-black py-4 rounded grow flex flex-wrap items-center gap-2 justify-center'
              >
                Buy Now <span className='uppercase font-bold'>€ {price.toString()}</span>
                <CreditCardIcon className='h-6 w-6'/>
              </button>
            </Link>
            <p className='uppercase font-bold text-[12px]'>or</p>
            <button
              className='bg-black p-2 px-5 text-sm font-semibold text-white py-4 rounded grow w-full'
            >
              Add to Cart
            </button>
            <p className='text-[12px] font-semibold mb-4 text-center'>*ships in 1-3 working days</p>
          </div>
        </div>
        <button
          className='absolute top-4 right-4'
          onClick={onClose}
        >
          <XMarkIcon className='w-6 h-6' />
        </button>
      </div>
    </div>
  );
};

export default Deatils;
