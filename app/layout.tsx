'use client'

// RootLayout.tsx

import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import { Provider } from 'react-redux';       // Importing Provider
import store from './components/redux/store';




const inter = Inter({ subsets: ['latin'] });







export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (

    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Header onMenuToggle={toggleMenu} isMenuOpen={isMenuOpen} />
          <main>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <Menu isVisible={isMenuOpen} />
              <main className="pt-[48px]">
                {children}</main>
            </div>
            <Footer />
          </main>
        </Provider>
      </body>

    </html>

  );
}


