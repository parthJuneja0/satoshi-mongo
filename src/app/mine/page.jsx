"use client";
import React, { useContext, useEffect, useState } from "react";
import "./Mine.css";
import BuyConfirmationModal from "@/components/BuyConfirmationModal/BuyConfirmationModal";
import UnlockConditionModal from "@/components/UnlockConditionModal/UnlockConditionModal";
import Image from "next/image";
import food from "@/assets/shop/food.png";
import fertilizer from "@/assets/shop/fertilizer.png";
import oil from "@/assets/shop/oil.png";

// Import animal images
import hen from "@/assets/animalsection/hen.png";
import cow from "@/assets/animalsection/cow.png";
import goat from "@/assets/animalsection/goat.png";
import dog from "@/assets/animalsection/dog.png";
import duck from "@/assets/animalsection/duck.png";
import sheep from "@/assets/animalsection/sheep.png";
import donkey from "@/assets/animalsection/donkey.png";
import rabbit from "@/assets/animalsection/rabbit.png";
import goose from "@/assets/animalsection/goose.png";
import buffalo from "@/assets/animalsection/buffalo.png";
// import emu from "@/assets/animalsection/emu.png";
// import horse from "@/assets/animalsection/horse.png";
// import lama from "@/assets/animalsection/lama.png";
// import turkey from "@/assets/animalsection/turkey.png";

// Import trees images
import apple from "@/assets/treesection/apple.png";
import guava from "@/assets/treesection/guava.png";
import jackfruit from "@/assets/treesection/jackfruit.png";
import lemon from "@/assets/treesection/lemon.png";
import mango from "@/assets/treesection/mango.png";
import orange from "@/assets/treesection/orange.png";
import peach from "@/assets/treesection/peach.png";
import pear from "@/assets/treesection/pear.png";
import teak from "@/assets/treesection/teak.png";
// import pomegranate from "@/assets/treesection/pomegranate.png";
// import avocado from "@/assets/treesection/avocado.png";
// import bamboo from "@/assets/treesection/bamboo.png";
// import dragon_fruit from "@/assets/treesection/dragon_fruit.png";
// import olive from "@/assets/treesection/olive.png";

// Import tools images
import feeder from "@/assets/toolssection/feeder.png";
import pruning_shears from "@/assets/toolssection/pruning_shears.png";
import rake from "@/assets/toolssection/rake.png";
import seeder from "@/assets/toolssection/seeder.png";
import shovel from "@/assets/toolssection/shovel.png";
import sickle from "@/assets/toolssection/sickle.png";
import sprayer from "@/assets/toolssection/sprayer.png";
import tractor from "@/assets/toolssection/tractor.png";
import trowel from "@/assets/toolssection/trowel.png";
import wheel_barrow from "@/assets/toolssection/wheel_barrow.png";
// import harvester from "@/assets/toolssection/harvester.png";
// import pestiside from "@/assets/toolssection/pestiside.png";
// import plough from "@/assets/toolssection/plough.png";
// import thresher from "@/assets/toolssection/thresher.png";

// Import icon image
import icon from "@/assets/coin.png";
import Footer from "@/components/Footer/page";
import { userDataContext } from "@/context/userDataContext";
import { FaLock } from "react-icons/fa";
import { transactionsContext } from "@/context/transactionsContext";

const animalImages = {
  "001": hen,
  "002": cow,
  "003": goat,
  "004": dog,
  "005": duck,
  "006": sheep,
  "007": donkey,
  "008": rabbit,
  "009": goose,
  "010": buffalo,
};

const treesImages = {
  "011": mango,
  "012": apple,
  "013": orange,
  "014": pear,
  "015": lemon,
  "016": peach,
  "017": teak,
  "018": guava,
  "019": jackfruit,
  // "020": vegi,
};

const toolsImages = {
  "021": trowel,
  "022": sickle,
  "023": pruning_shears,
  "024": rake,
  "025": sprayer,
  "026": feeder,
  "027": seeder,
  "028": shovel,
  "029": wheel_barrow,
  "030": tractor,
};

const allCards = [
  {
    reqUtil: "food",
    cardId: "001",
    title: "Hen",
    price: 5,
    profitAmount: 220,
  },
  {
    reqUtil: "food",
    cardId: "002",
    title: "Cow",
    price: 8,
    profitAmount: 280,
  },
  {
    reqUtil: "food",
    cardId: "003",
    title: "Goat",
    price: 5,
    profitAmount: 320,
  },
  {
    reqUtil: "food",
    cardId: "004",
    title: "Dog",
    price: 7,
    profitAmount: 420,
  },
  {
    reqUtil: "food",
    cardId: "005",
    title: "Duck",
    price: 5,
    profitAmount: 320,
  },
  {
    reqUtil: "food",
    cardId: "006",
    title: "Sheep",
    price: 8,
    profitAmount: 500,
  },
  {
    reqUtil: "food",
    cardId: "007",
    title: "Donkey",
    price: 8,
    profitAmount: 300,
  },
  {
    reqUtil: "food",
    cardId: "008",
    title: "Rabbit",
    price: 7,
    profitAmount: 400,
  },
  {
    reqUtil: "food",
    cardId: "009",
    title: "Goose",
    price: 5,
    profitAmount: 380,
  },
  {
    reqUtil: "food",
    cardId: "010",
    title: "Buffalo",
    price: 7,
    profitAmount: 420,
  },
  {
    reqUtil: "fertilizer",
    cardId: "011",
    title: "Mango",
    price: 7,
    profitAmount: 250,
  },
  {
    reqUtil: "fertilizer",
    cardId: "012",
    title: "Apple",
    price: 5,
    profitAmount: 500,
  },
  {
    reqUtil: "fertilizer",
    cardId: "013",
    title: "Orange",
    price: 5,
    profitAmount: 350,
  },
  {
    reqUtil: "fertilizer",
    cardId: "014",
    title: "Pear",
    price: 8,
    profitAmount: 300,
  },
  {
    reqUtil: "fertilizer",
    cardId: "015",
    title: "Lemon",
    price: 5,
    profitAmount: 380,
  },
  {
    reqUtil: "fertilizer",
    cardId: "016",
    title: "Peach",
    price: 7,
    profitAmount: 480,
  },
  {
    reqUtil: "fertilizer",
    cardId: "017",
    title: "Teak",
    price: 8,
    profitAmount: 400,
  },
  {
    reqUtil: "fertilizer",
    cardId: "018",
    title: "Guava",
    price: 5,
    profitAmount: 300,
  },
  {
    reqUtil: "fertilizer",
    cardId: "019",
    title: "Jackfruit",
    price: 7,
    profitAmount: 280,
  },
  {
    reqUtil: "fertilizer",
    cardId: "020",
    title: "Vegi",
    price: 5,
    profitAmount: 480,
  },
  {
    reqUtil: "oil",
    cardId: "021",
    title: "Trowel",
    price: 7,
    profitAmount: 350,
  },
  {
    reqUtil: "oil",
    cardId: "022",
    title: "Sickle",
    price: 7,
    profitAmount: 420,
  },
  {
    reqUtil: "oil",
    cardId: "023",
    title: "Shear",
    price: 8,
    profitAmount: 300,
  },
  {
    reqUtil: "oil",
    cardId: "024",
    title: "Rake",
    price: 5,
    profitAmount: 500,
  },
  {
    reqUtil: "oil",
    cardId: "025",
    title: "Sprayer",
    price: 8,
    profitAmount: 250,
  },
  {
    reqUtil: "oil",
    cardId: "026",
    title: "Feeder",
    price: 7,
    profitAmount: 200,
  },
  {
    reqUtil: "oil",
    cardId: "027",
    title: "Seeder",
    price: 5,
    profitAmount: 280,
  },
  {
    reqUtil: "oil",
    cardId: "028",
    title: "Shovel",
    price: 5,
    profitAmount: 450,
  },
  {
    reqUtil: "oil",
    cardId: "029",
    title: "Wheel Barrow",
    price: 7,
    profitAmount: 300,
  },
  {
    reqUtil: "oil",
    cardId: "030",
    title: "Tractor",
    price: 8,
    profitAmount: 380,
  },
];

const conditions = [
  { cardId: "006", dependency: "003", level: 3 },
  { cardId: "007", dependency: "001", level: 3 },
  { cardId: "008", dependency: "002", level: 3 },
  { cardId: "009", dependency: "029", level: 1 },
  { cardId: "010", dependency: "028", level: 1 },
  { cardId: "016", dependency: "012", level: 3 },
  { cardId: "017", dependency: "006", level: 1 },
  { cardId: "018", dependency: "010", level: 1 },
  { cardId: "019", dependency: "022", level: 3 },
  { cardId: "020", dependency: "014", level: 3 },
  { cardId: "026", dependency: "021", level: 3 },
  { cardId: "027", dependency: "025", level: 3 },
  { cardId: "028", dependency: "013", level: 3 },
  { cardId: "029", dependency: "019", level: 1 },
  { cardId: "030", dependency: "017", level: 1 },
];

const Mine = () => {
  const { userInfo, setUserInfo, unlockedCards, setUnlockedCards } =
    useContext(userDataContext);
  const { cardUpgrade, unlockNewCards } = useContext(transactionsContext);
  const [isLoading, setIsLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("Animals");
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [balaceSufficient, setBalaceSufficient] = useState(false);

  const getCardById = (cardId) => {
    const card = unlockedCards.find((card) => card.cardId === cardId);
    if (card) return card;
    else return null;
  };

  const handleCardClick = (card, isUnlocked) => {
    setSelectedCard(card);
    if (isUnlocked) {
      setShowBuyModal(true);
    } else {
      setShowUnlockModal(true);
    }
  };

  useEffect(() => {
    if (!userInfo || !unlockCards || !showBuyModal || !selectedCard) return;
    if (
      userInfo.utils[selectedCard.reqUtil] >=
      getCardById(selectedCard.cardId).price
    ) {
      setBalaceSufficient(true);
    } else {
      setBalaceSufficient(false);
    }
  }, [showBuyModal]);

  const calculateProfit = (baseValue, currentValue, level) => {
    const a = ((baseValue + 5 * level) / currentValue) * 100;
    const newValue = currentValue + (a * currentValue) / 100;
    return Math.floor(newValue);
  };

  const calculatePrice = (baseValue, currentValue, level) => {
    const a = ((baseValue + 5 * level) / currentValue) * 100 - 5;
    const newValue = currentValue + (a * currentValue) / 100 - 5;
    return Math.floor(newValue);
  };

  const handleConfirmBuy = async () => {
    setIsLoading(true);
    const newProfitAmount = calculateProfit(
      selectedCard.profitAmount,
      getCardById(selectedCard.cardId).profitAmount,
      getCardById(selectedCard.cardId).level
    );
    const newPrice = calculatePrice(
      selectedCard.price,
      getCardById(selectedCard.cardId).price,
      getCardById(selectedCard.cardId).level
    );
    const response = await cardUpgrade(
      userInfo.telegramId,
      selectedCard.cardId,
      getCardById(selectedCard.cardId).price,
      selectedCard.reqUtil,
      getCardById(selectedCard.cardId).profitAmount,
      newProfitAmount,
      newPrice
    );
    setShowBuyModal(false);
    setUserInfo(response.user);
    setUnlockedCards(response.cards);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!userInfo || !unlockedCards || !selectedCard) return;
    // Get cards that need to be unlocked
    const dependenciesToUnlock = conditions
      .filter(
        (condition) =>
          condition.dependency === selectedCard.cardId &&
          getCardById(selectedCard.cardId).level >= condition.level
      )
      .map((condition) => condition.cardId)
      .filter(
        (cardId) =>
          !unlockedCards.some((unlockedCard) => unlockedCard.cardId === cardId)
      );
    if (dependenciesToUnlock.length > 0) {
      // Find the details of the cards to unlock
      const cardsToUnlock = allCards
        .filter((card) => dependenciesToUnlock.includes(card.cardId))
        .map(({ reqUtil, title, ...rest }) => rest);

      unlockCards(userInfo.telegramId, cardsToUnlock);
    }
  }, [unlockedCards]);

  const unlockCards = async (user, newCards) => {
    const cards = await unlockNewCards(user, newCards);
    setUnlockedCards(cards);
    setSelectedCard(null);
  };

  const handleCancel = () => {
    setShowBuyModal(false);
    setShowUnlockModal(false);
  };

  const renderCards = () => {
    let cards = [];
    let cardClass = "";

    if (activeTab === "Animals") {
      cards = allCards.filter((card) => card.reqUtil === "food");
      cardClass = "animals";
    } else if (activeTab === "Trees") {
      cards = cards = allCards.filter((card) => card.reqUtil === "fertilizer");
      cardClass = "trees";
    } else if (activeTab === "Tools") {
      cards = cards = allCards.filter((card) => card.reqUtil === "oil");
      cardClass = "tools";
    }

    const isCardUnlocked = (card) => {
      if (getCardById(card.cardId)) return true;
      return false;
    };

    return (
      userInfo &&
      unlockedCards &&
      cards.map((card, index) => {
        const isUnlocked = isCardUnlocked(card);
        return (
          <div
            className={` ${
              isUnlocked ? `mine-card ${cardClass}` : "locked_card"
            }`}
            key={index}
            onClick={() => handleCardClick(card, isUnlocked)}
          >
            <div className="mine-card-header">
              {isUnlocked ? (
                <div>
                  {activeTab === "Animals" && (
                    <Image
                      src={animalImages[card.cardId]}
                      alt={card.title}
                      width="auto"
                      height="auto"
                      className="card-image"
                      loading="lazy"
                    />
                  )}
                  {activeTab === "Trees" && (
                    <Image
                      src={treesImages[card.cardId]}
                      alt={card.title}
                      width="auto"
                      height="auto"
                      className="card-image"
                      loading="lazy"
                    />
                  )}
                  {activeTab === "Tools" && (
                    <Image
                      src={toolsImages[card.cardId]}
                      alt={card.title}
                      width="auto"
                      height="auto"
                      className="card-image"
                      loading="lazy"
                    />
                  )}
                </div>
              ) : (
                <FaLock size={40} className="mr-2" />
              )}
              <div>
                <p className="mine-title">{card.title}</p>
                <p className="yield-text">Yield per hour</p>
                <div className="profit-amount">
                  <Image
                    src={icon}
                    alt="Icon"
                    width={15}
                    height={15}
                    className="icon-margin"
                    loading="lazy"
                  />
                  {unlockedCards && getCardById(card.cardId)
                    ? getCardById(card.cardId).profitAmount
                    : card.profitAmount}
                </div>
              </div>
            </div>
            <div className="mine-card-separator"></div>
            <div className="mine-card-footer">
              <p>
                Lvl &nbsp;
                {unlockedCards && getCardById(card.cardId)
                  ? getCardById(card.cardId).level
                  : card.level}
              </p>
              <div className="vertical-separator"></div>
              {activeTab === "Animals" && (
                <Image
                  src={food}
                  alt="Animal Food"
                  className="w-5 h-5 mx-1"
                  height="auto"
                  width="auto"
                  loading="lazy"
                />
              )}
              {activeTab === "Trees" && (
                <Image
                  src={fertilizer}
                  alt="Animal Food"
                  className="w-5 h-5 mx-1"
                  height="auto"
                  width="auto"
                  loading="lazy"
                />
              )}
              {activeTab === "Tools" && (
                <Image
                  src={oil}
                  alt="Animal Food"
                  className="w-5 h-5 mx-1"
                  height="auto"
                  width="auto"
                  loading="lazy"
                />
              )}
              <p>
                {unlockedCards && getCardById(card.cardId)
                  ? getCardById(card.cardId).price
                  : card.price}
              </p>
            </div>
          </div>
        );
      })
    );
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black flex justify-center items-center w-[450px]">
      <div className="w-full text-white font-bold flex flex-col relative">
        <div className="tabs">
          <button
            onClick={() => setActiveTab("Animals")}
            className={activeTab === "Animals" ? "active" : ""}
          >
            Animals
          </button>
          <button
            onClick={() => setActiveTab("Trees")}
            className={activeTab === "Trees" ? "active" : ""}
          >
            Trees
          </button>
          <button
            onClick={() => setActiveTab("Tools")}
            className={activeTab === "Tools" ? "active" : ""}
          >
            Tools
          </button>
        </div>
        <div className="mine-content p-6">
          <div className="mine-card-grid">{renderCards()}</div>
        </div>
        <BuyConfirmationModal
          show={showBuyModal}
          onClose={handleCancel}
          onConfirm={handleConfirmBuy}
          card={selectedCard}
          getCardById={getCardById}
          balaceSufficient={balaceSufficient}
          isLoading={isLoading}
        />
        <UnlockConditionModal
          show={showUnlockModal}
          onClose={handleCancel}
          card={selectedCard}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Mine;
