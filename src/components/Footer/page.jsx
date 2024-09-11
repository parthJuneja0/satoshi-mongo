"use client";
import React from "react";
import {
  FaExchangeAlt,
  FaUserFriends,
  FaCoins,
  FaShoppingCart,
} from "react-icons/fa";
import { BsMinecart } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import SatoshiImage from "../../assets/satoshi.png";

const Footer = () => {
  const pathname = usePathname();
  // function getPathName() {
  //   if (pathname === "/") return "exchange";
  //   else return pathname.split("/")[2];
  // }
  function getPathName() {
    const parts = pathname.split("/").filter(Boolean); // Filter out empty strings
    if (parts.length === 0) return "exchange"; // For root path "/"
    return parts[0]; // For paths like "/mine", "/shop", etc.
  }
  
  const selectedPage = getPathName();

  const array = [
    {
      name: "exchange",
      icon: (
        <FaExchangeAlt
          className={`mx-auto ${
            selectedPage === "exchange" ? "text-white" : "text-gray-500"
          }`}
          size={24}
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
          size={24}
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
          size={24}
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
          size={24}
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
          size={24}
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
          width={24}
          height={24}
        />
      ),
    },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-gray-900 flex justify-between items-center z-50 rounded-t-3xl text-xs p-2 md:w-auto md:mx-auto">
      {array.map((item, index) => (
        <Link
          href={item.name === "exchange" ? "/" : `/${item.name}`}
          id={item.name}
          key={index}
        >
          <div
            className={`flex flex-col items-center text-center w-16 p-1.5 rounded-2xl transition-all duration-200 cursor-pointer ${
              selectedPage === item.name
                ? "bg-gray-700 text-white shadow-md shadow-yellow-500"
                : "bg-gray-800 text-gray-500"
            }`}
          >
            {item.icon}
            <p
              className={`mt-1 ${
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
