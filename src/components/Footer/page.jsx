"use client";
import React from "react";
import {
  FaUserFriends,
  FaCoins,
  FaShoppingCart,
} from "react-icons/fa";
import { GiFarmer } from "react-icons/gi";
import { BsMinecart } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import SatoshiImage from "../../assets/satoshi.png";

const Footer = () => {
  const pathname = usePathname();

  function getPathName() {
    const parts = pathname.split("/").filter(Boolean); // Filter out empty strings
    if (parts.length === 0) return "Farm"; // For root path "/"
    return parts[0]; // For paths like "/mine", "/shop", etc.
  }

  const selectedPage = getPathName();

  const array = [
    {
      name: "Farm",
      icon: (
        <GiFarmer
          className={`mx-auto ${
            selectedPage === "Farm" ? "text-white" : "text-gray-500"
          }`}
          size={24} // Reduced icon size (change this to adjust icon size)
        />
      ),
    },
    {
      name: "mine",
      icon: (
        <BsMinecart
          className={`mx-auto ${
            selectedPage === "mine" ? "text-white" : "text-gray-500"
          }`}
          size={24} // Reduced icon size (change this to adjust icon size)
        />
      ),
    },
    {
      name: "shop",
      icon: (
        <FaShoppingCart
          className={`mx-auto ${
            selectedPage === "shop" ? "text-white" : "text-gray-500"
          }`}
          size={24} // Reduced icon size (change this to adjust icon size)
        />
      ),
    },
    {
      name: "friends",
      icon: (
        <FaUserFriends
          className={`mx-auto ${
            selectedPage === "friends" ? "text-white" : "text-gray-500"
          }`}
          size={24} // Reduced icon size (change this to adjust icon size)
        />
      ),
    },
    {
      name: "earn",
      icon: (
        <FaCoins
          className={`mx-auto ${
            selectedPage === "earn" ? "text-white" : "text-gray-500"
          }`}
          size={24} // Reduced icon size (change this to adjust icon size)
        />
      ),
    },
    {
      name: "airdrop",
      icon: (
        <Image
          src={SatoshiImage}
          alt="Satoshi"
          className={`mx-auto ${
            selectedPage === "airdrop" ? "text-white" : "text-gray-500"
          }`}
          width={24} // Reduced image width (change this to adjust image size)
          height={24} // Reduced image height (change this to adjust image size)
        />
      ),
    },
  ];

  return (
      <div class="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-gray-900 flex justify-between items-center z-50 text-xs p-1 md:w-auto md:mx-auto ">

      {/* Reduced padding (change p-1 to adjust padding) */}
      {array.map((item, index) => (
        <Link
          href={item.name === "Farm" ? "/" : `/${item.name}`}
          id={item.name}
          key={index}
        >
          <div
            className={`flex flex-col items-center text-center w-12 p-2 rounded-xl transition-all duration-200 cursor-pointer ${
              selectedPage === item.name
                ? "bg-gray-700 text-white shadow-md shadow-yellow-500"
                : "bg-gray-800 text-gray-500"
            }`}
          > 
            {/* Adjusted width (change w-12 to adjust button width) */}
            {/* Adjusted padding (change p-1 to adjust padding inside each button) */}
            {item.icon}
            <p
              className={`mt-1 text-xs ${
                selectedPage === item.name ? "text-white" : "text-gray-500"
              }`}
            >
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Footer;
