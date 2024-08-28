"use client";
import React from 'react';
import Image from 'next/image';
import SatoshiImage from '../../../assets/satoshi.png'; 
import Footer from '@/components/Footer/page'; 
import './airdrop.css'; 

const Airdrop = () => {
  return (
    <div className="airdrop-bg-gradient-to-b flex flex-col min-h-screen justify-between text-white w-full">
      <div className="flex-grow flex flex-col justify-center items-center text-center h-screen">
        <div className="relative flex justify-center items-center">
          <div className="airdrop-glow-circle"></div>
          <Image
            src={SatoshiImage}
            alt="Satoshi"
            width={150}
            height={150}
            className="rounded-full relative z-10 airdrop-image-pulse"
          />
        </div>
        <h1 className="mt-6 text-3xl font-bold airdrop-text-gradient">Airdrop</h1>
        <p className="mt-2 text-lg airdrop-text-gradient">Listing is on its way. Stay tuned!!</p>
      </div>
      <Footer />
    </div>
  );
}

export default Airdrop;