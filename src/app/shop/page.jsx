"use client";
import React, { useContext, useEffect, useState } from "react";
import { FaAppleAlt, FaSeedling, FaOilCan } from "react-icons/fa";
import Image from "next/image";
import food from "@/assets/shop/food.png";
import fertilizer from "@/assets/shop/fertilizer.png";
import oil from "@/assets/shop/oil.png";
import "./Shop.css";
import Coin from "@/assets/coin.png";
import Footer from "@/components/Footer/page";
import { userDataContext } from "@/context/userDataContext";
import { transactionsContext } from "@/context/transactionsContext";

const products = {
  food: {
    name: "Animal Food",
    price: 1000,
    image: food,
    details: "Buy Food to unlock Cards in the Mine Section",
  },
  fertilizer: {
    name: "Tree Fertilizer",
    price: 1000,
    image: fertilizer,
    details: "Buy Fertilizer to unlock Cards in the Mine Section",
  },
  oil: {
    name: "Machine Oil",
    price: 1000,
    image: oil,
    details: "Buy Oil to unlock Cards in the Mine Section",
  },
};

const Shop = () => {
  const { userInfo, setUserInfo } = useContext(userDataContext);
  const { shopPurchase } = useContext(transactionsContext);
  const [loading, setLoading] = useState({}); // Initialize as an empty object
  const [quantities, setQuantities] = useState({
    food: 1,
    fertilizer: 1,
    oil: 1,
  });
  const [costs, setCosts] = useState({
    food: 1000,
    fertilizer: 1000,
    oil: 1000,
  });
  const [disablePurchase, setDisablePurchase] = useState({});

  useEffect(() => {
    if (!userInfo) return;

    setDisablePurchase({
      food: Math.floor(userInfo.coins) < costs.food,
      fertilizer: Math.floor(userInfo.coins) < costs.fertilizer,
      oil: Math.floor(userInfo.coins) < costs.oil,
    });
  }, [userInfo, costs]);

  const items = [
    {
      key: "food",
      icon: <FaAppleAlt size={24} />,
      product: products.food,
      glowClass: "glow-yellow",
    },
    {
      key: "fertilizer",
      icon: <FaSeedling size={24} />,
      product: products.fertilizer,
      glowClass: "glow-green",
    },
    {
      key: "oil",
      icon: <FaOilCan size={24} />,
      product: products.oil,
      glowClass: "glow-white",
    },
  ];

  const updateQuantity = (key, value) => { 
    const parsedValue = parseInt(value, 10);
  
    if (isNaN(parsedValue) || parsedValue < 1) {
      return;
    }
  
    setQuantities((prevQuantities) => {
      updateCosts(key, parsedValue);
      return { ...prevQuantities, [key]: parsedValue };
    });
  };
  
  
  const increaseQuantity = (key) => {
    setQuantities((prevQuantities) => {
      const newQuantity = prevQuantities[key] + 1;
      updateCosts(key, newQuantity);
      return { ...prevQuantities, [key]: newQuantity };
    });
  };

  const decreaseQuantity = (key) => {
    setQuantities((prevQuantities) => {
      if (prevQuantities[key] > 1) {
        const newQuantity = prevQuantities[key] - 1;
        updateCosts(key, newQuantity);
        return { ...prevQuantities, [key]: newQuantity };
      }
      return prevQuantities;
    });
  };

  const updateCosts = (key, newQuantity) => {
    setCosts((prevCosts) => ({
      ...prevCosts,
      [key]: products[key].price * newQuantity,
    }));
  };

  const purchaseItem = async (key) => {
    const cost = products[key].price * quantities[key];
    if (Math.floor(userInfo.coins) >= cost) {
      setLoading((prevLoading) => ({ ...prevLoading, [key]: true }));
      try {
        const userData = await shopPurchase(
          userInfo.telegramId,
          cost,
          quantities[key],
          key
        );
        setUserInfo(userData);
        setQuantities((prevQuantities) => ({ ...prevQuantities, [key]: 1 }));
        updateCosts(key, 1);
      } catch (error) {
        console.error("Error during purchase:", error);
        alert("An error occurred during the purchase.");
      } finally {
        setLoading((prevLoading) => ({ ...prevLoading, [key]: false }));
      }
    } else {
      alert("Not enough coins");
    }
  };

  function formatNumberWithK(num) {
    return num >= 1000 ? (num / 1000).toFixed(1) + "k" : num;
  }

  return (
    <div className="shop-container">
      <h1 className="shop-heading">Shop</h1>
      <div className="balances">
        <div className="balance-item">
          <Image
            src={food}
            alt="Animal Food"
            width={25}
            height={25}
            loading="lazy"
            className="balance-image object-cover mr-1"
          />
          {userInfo && <span>{userInfo.utils.food}</span>}
        </div>
        <div className="balance-item">
          <Image
            src={fertilizer}
            alt="Tree Fertilizer"
            width={25}
            height={25}
            loading="lazy"
            className="balance-image object-cover mr-1"
          />
          {userInfo && <span>{userInfo.utils.fertilizer}</span>}
        </div>
        <div className="balance-item">
          <Image
            src={oil}
            alt="Machine Oil"
            width={25}
            height={25}
            loading="lazy"
            className="balance-image object-cover mr-1"
          />
          {userInfo && <span>{userInfo.utils.oil}</span>}
        </div>
        <div className="balance-item">
          <Image
            src={Coin}
            alt="Coin"
            height={40}
            width={40}
            loading="lazy"
            className="balance-icon"
          />
          {userInfo && (
            <span>{formatNumberWithK(Math.floor(userInfo.coins))}</span>
          )}
        </div>
      </div>
      <div className="items-container">
        {items.map((item, index) => (
          <div
            key={index}
            className={`shop-card ${item.glowClass} inner-shadow`}
          >
            <div className="shop-card-content">
              <div className="image-container">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  layout="fixed"
                  width={100}
                  height={100}
                  className="product-image"
                />
              </div>
              <div className="divider"></div>
              <div className="shop-card-details">
                <h2 className="shop-card-title">{item.product.name}</h2>
                <p className="shop-card-description">{item.product.details}</p>
                <div className="action-controls">
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn decrement-btn"
                      onClick={() => decreaseQuantity(item.key)}
                    >
                      -
                    </button>
                    <input type="number" value={quantities[item.key]}
                    className="text-center" style={{width:"50px",color:"black"}}
                    onChange={(e) => updateQuantity(item.key, e.target.value)} />
                    <button
                      className="quantity-btn increment-btn"
                      onClick={() => increaseQuantity(item.key)}
                    >
                      +
                    </button>
                  </div>
                  {disablePurchase && disablePurchase[item.key] ? (
                    <button className="purchase-disabled">
                      <Image
                        src={Coin}
                        alt="Coin"
                        height={24}
                        width={24}
                        className="mr-1"
                      />{" "}
                      {costs[item.key]}
                    </button>
                  ) : (
                    <button
                      className={`button-price`}
                      onClick={() => purchaseItem(item.key)}
                      disabled={loading[item.key]}
                    >
                      {loading[item.key] ? (
                        <div className="button-spinner"></div>
                      ) : (
                        <>
                          <Image
                            src={Coin}
                            alt="Coin"
                            height={24}
                            width={24}
                            className="mr-1"
                          />{" "}
                          {costs[item.key]}
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
