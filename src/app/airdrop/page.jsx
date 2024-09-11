"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SatoshiImage from "../../assets/satoshi.png";
import Footer from "@/components/Footer/page";
import "./airdrop.css";
// import { TonConnect, isMobile } from "@tonconnect/sdk";

// const Airdrop = () => {
//   const [tonConnect, setTonConnect] = useState(null);
//   const [walletAddress, setWalletAddress] = useState(null);

//   // Initialize TonConnect
//   useEffect(() => {
//     const connector = new TonConnect();
//     setTonConnect(connector);

//     // Restore connection if previously connected
//     if (connector.connected) {
//       setWalletAddress(connector.wallet.address);
//     }
//   }, []);

//   // Handle TON wallet connection
//   const handleConnectTonWallet = async () => {
//     if (!tonConnect) return;

//     try {
//       // Show a QR code or open the mobile app for connection
//       const result = await tonConnect.connectWallet();
//       if (result) {
//         // Successfully connected, set wallet address
//         setWalletAddress(result.wallet.address);
//         console.log("Connected to TON wallet:", result.wallet.address);
//       }
//     } catch (error) {
//       console.error("Error connecting to TON wallet:", error);
//       alert("Failed to connect to TON wallet. Please try again.");
//     }
//   };

  return (
    <div className="airdrop-bg-gradient-to-b flex flex-col min-h-screen justify-between text-white w-full">
      <div className="flex-grow flex flex-col justify-center items-center text-center h-screen">
        <div className="relative flex justify-center items-center">
          <div className="airdrop-glow-circle"></div>
          <Image
            loading="lazy"
            src={SatoshiImage}
            alt="Satoshi"
            width={150}
            height={150}
            className="rounded-full relative z-10 airdrop-image-pulse"
          />
        </div>
        <h1 className="mt-6 text-3xl font-bold airdrop-text-gradient">
          Airdrop
        </h1>
        <p className="mt-2 text-lg airdrop-text-gradient">
          Listing is on its way. Stay tuned!!
        </p>


        {/* {!walletAddress ? (
          <button
            onClick={handleConnectTonWallet}
            className="mt-6 px-8 py-3 text-lg font-semibold rounded-full airdrop-connect-btn transition-all duration-300 hover:bg-opacity-80"
          >
            Connect TON Wallet
          </button>
        ) : (
          <p className="mt-6 text-lg">
            Connected to: <span className="font-semibold">{walletAddress}</span>
          </p>
        )} */}
      </div>
      <Footer />
    </div>
  );


export default Airdrop;
