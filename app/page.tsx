//@ts-nocheck

'use client'

// components/Home.tsx
import React, { useEffect, useState } from 'react';
import Marquee from './components/Marquee';
import Loader from './components/Loader';
import Card from './components/Card';
import Hero from './components/Hero';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  slug: string;
}

interface ApiResponse {
  data: {
    id: string;
    object: string;
    active: boolean;
    billing_scheme: string;
    created: number;
    currency: string;
    custom_unit_amount: any;
    livemode: boolean;
    lookup_key: any;
    metadata: any;
    nickname: any;
    product: {
      id: string;
      object: string;
      active: boolean;
      attributes: any[];
      created: number;
      default_price: string;
      description: string;
      features: any[];
      images: string[];
      livemode: boolean;
      metadata: any;
      name: string;
      package_dimensions: any;
      shippable: any;
      statement_descriptor: any;
      tax_code: any;
      type: string;
      unit_label: any;
      updated: number;
      url: any;
      link:string
    };
    recurring: {
      aggregate_usage: any;
      interval: string;
      interval_count: number;
      trial_period_days: any;
      usage_type: string;
    };
    tax_behavior: string;
    tiers_mode: any;
    transform_quantity: any;
    type: string;
    unit_amount: number;
    unit_amount_decimal: string;
  }[];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('/api/products')
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        // Assuming the data structure has a 'data' property containing the products
        const productsData = data.data || [];
        const formattedProducts: Product[] = productsData.map((item) => ({
          id: item.id,
          name: item.product.name,
          price: item.unit_amount / 100, // Remove the last two digits
          images: item.product.images,
          slug: item.product.name.toLowerCase().replace(' ', '-'),
          }));
        setProducts(formattedProducts);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

 
  return (
    <>
      <Loader />
      <Hero />
      <div key='index' className='ruledGrid'>
        {products.map((product) => (
          <Card
            key={product.id}
            name={product.name}
            image={product.images[0]}
            slug={product.slug}
            product={product}
            price={product.price}
            link={product.link}
          />
        ))}
      </div>
      <Marquee />
    </>
  );
}
