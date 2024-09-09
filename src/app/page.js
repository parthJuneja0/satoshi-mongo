"use client";
import { useState, useContext, useRef, useEffect } from "react";
import Image from "next/image";
import Leaderboard from "../components/Leaderboard/page";
import Settings from "../components/Settings/page";
import Footer from "@/components/Footer/page";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import mainCharacter from "../assets/farmbutton.png";
import coinImage from "../assets/coin.png";
import satoshiImage from "../assets/satoshi.png";
import loadingImage from "@/assets/loading/page1.jpg";
import ClaimReferalRewardModal from "@/components/ClaimReferalRewardModal/page";
import { TbExposurePlus1 } from "react-icons/tb";
import { userDataContext } from "@/context/userDataContext";
import ClaimCoinsAsPerYPH from "@/components/ClaimCoinsAsPerYPH/ClaimCoinsAsPerYPH";
import axios from "axios";
import { syncContext } from "@/context/syncContext";

export default function Home() {
  const imgRef = useRef();
  const clickCountRef = useRef(0);
  const { userWebData, userInfo, setUserInfo, isReferred } = useContext(userDataContext);
  const { addCurrentEnergy, toggleHasClaimed } = useContext(syncContext);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [clickPosition, setClickPosition] = useState([]);
  const [isClaimAvailable, setIsClaimAvailable] = useState(false);
  const [energyProfit, setEnergyProfit] = useState();
  const [coinProfit, setCoinProfit] = useState();

  useEffect(() => {
    if (!userInfo || userInfo.lastSession.hasClaimed) return;
    const differenceInMilliseconds = Date.now() - userInfo.lastSession.lastOnline;
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

    // For debugging purposes
    // const differenceInSeconds = 50000;

    setEnergyProfit(differenceInSeconds);

    const profit = Math.floor(
      userInfo.yieldPerHour * (differenceInSeconds / 3600)
    );
    if (profit <= 0) {
      (async () => {
        await toggleHasClaimed(userWebData.userId);
      })();
      return;
    };
    // 3 hrs = 3*3600 = 10800 seconds
    if (differenceInSeconds < 10800) {
      setCoinProfit(profit);
      setIsClaimAvailable(true);
    } else {
      setCoinProfit(Math.floor(userInfo.yieldPerHour * (10800 / 3600)));
      setIsClaimAvailable(true);
    }
  }, [userInfo]);

  // Add energy when user comes online
  useEffect(() => {
    if (!energyProfit) return;
    (async () => {
      const response = await addCurrentEnergy(userWebData.userId, energyProfit);
      setUserInfo(response);
    })();
  }, [energyProfit]);

  // Energy Refill
  // useEffect(() => {
  //   if (!userInfo) return;
  //   const intervalId = setInterval(() => {
  //     setUserInfo((prevUserInfo) => ({
  //       ...prevUserInfo,
  //       currentEnergy: Math.min(
  //         prevUserInfo.currentEnergy + 1,
  //         prevUserInfo.totalEnergy
  //       ),
  //     }));
  //   }, 1000);
  //   return () => clearInterval(intervalId);
  // }, [userInfo]);

  const energySyncThreshold = 30; // Sync every 50 energy increments
  const [energyToSync, setEnergyToSync] = useState(0); // Track unsynced energy

  useEffect(() => {
    if (!userInfo) return;

    const intervalId = setInterval(() => {
      setUserInfo((prevUserInfo) => {
        const newEnergy = Math.min(
          prevUserInfo.currentEnergy + 1,
          prevUserInfo.totalEnergy
        );

        // Track unsynced energy
        setEnergyToSync(newEnergy);

        return {
          ...prevUserInfo,
          currentEnergy: newEnergy,
        };
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [userInfo]);

  // Sync energy with the backend when energyToSync reaches threshold
  useEffect(() => {
    if (energyToSync % energySyncThreshold === 0 && energyToSync !== 0) {
      syncEnergyWithBackend(energyToSync);
    }
  }, [energyToSync]);

  const syncEnergyWithBackend = async (currentEnergy) => {
    try {
      (async () => {
        const response = await axios.put("/api/refill/energy", {
          telegramId: userWebData.userId,
          energyCount: userInfo.currentEnergy,
        })
        console.log("Energy synced :", currentEnergy);
      })();
    } catch (error) {
      console.error('Error syncing energy:', error);
    }
  };


  // Increase coins as per yield per hour
  // useEffect(() => {
  //   if (!userInfo || userInfo.yieldPerHour === 0) return;
  //   const intervalId = setInterval(() => {
  //     setUserInfo((prevUserInfo) => ({
  //       ...prevUserInfo,
  //       coins: prevUserInfo.coins + prevUserInfo.yieldPerHour / 3600,
  //     }));
  //   }, 1000);
  //   return () => clearInterval(intervalId);
  // }, [userInfo]);

  const coinSyncThreshold = 10; // Sync after 10 coin increments
  const [coinsToSync, setCoinsToSync] = useState(0); // Track unsynced coins
  const [lastSyncedCoins, setLastSyncedCoins] = useState(0); // Track the last synced coin value

  useEffect(() => {
    if (!userInfo || userInfo.yieldPerHour === 0) return;

    const intervalId = setInterval(() => {
      setUserInfo((prevUserInfo) => {
        const newCoins = prevUserInfo.coins + prevUserInfo.yieldPerHour / 3600;

        // Update unsynced coins but don't sync yet
        setCoinsToSync(newCoins);

        return {
          ...prevUserInfo,
          coins: newCoins,
        };
      });
    }, 1000); // Increment coins every second

    return () => clearInterval(intervalId);
  }, [userInfo]);

  // Sync coins with the backend when coinsToSync reaches the threshold
  useEffect(() => {
    const coinDifference = Math.floor(coinsToSync) - Math.floor(lastSyncedCoins);

    if (coinDifference >= coinSyncThreshold) {
      syncCoinsWithBackend(Math.floor(coinsToSync));
    }
  }, [coinsToSync]);

  const syncCoinsWithBackend = async (currentCoins) => {
    try {
      await axios.put("/api/refill/coins", {
        telegramId: userWebData.userId,
        coinCount: currentCoins, // Send the current coins count
      });

      console.log("Coins synced:", currentCoins);

      // Update the last synced coins after successful sync
      setLastSyncedCoins(currentCoins);
    } catch (error) {
      console.error('Error syncing coins:', error);
    }
  };


  // When card is clicked
  const handleCardClick = (e) => {
    if (e.target.tagName !== "IMG") return;
    // if (e.target.tagName !== "IMG" || !userInfo) return;

    clickCountRef.current += 1;

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Update position for the animation
    setClickPosition((prevPositions) => [
      ...prevPositions,
      { id: Date.now(), x: e.clientX, y: e.clientY },
    ]);

    //Update position for the animation
    imgRef.current.style.transform = `perspective(1000px) rotateX(${-y / 10
      }deg) rotateY(${x / 10}deg)`;

    // Add click animation effect
    setTimeout(() => {
      imgRef.current.style.transform = "";
    }, 100);

    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      coins: prevUserInfo.coins + 1,
      currentEnergy: Math.max(prevUserInfo.currentEnergy - 1, 0),
    }));

    // Debounced API call
    debounceApiCall(userWebData.userId, clickCountRef.current);

    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const debounceApiCall = useRef(
    debounce((telegramId, clickCount) => {
      axios.post("/api/transactions/clickEvent", {
        telegramId,
        clickCount
      })
        .then(() => {
          console.log("Debounced")
          clickCountRef.current = 0;
        })
        .catch(error => {
          console.error("Error adding click transaction:", error);
        });
    }, 500) // Adjust the debounce delay as needed (500ms here)
  ).current;

  // Utility debounce function
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  const toggleLeaderboard = () => {
    setLeaderboardOpen(!leaderboardOpen);
  };

  const handleAnimationEnd = (id) => {
    setClickPosition((prevClicks) => prevClicks.filter(clickPosition => clickPosition.id !== id));
  };

  function formatNumberWithK(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    } else {
      return num;
    }
  }

  return (
    <div className=" flex flex-col justify-center items-center bg-animated w-[450px]">
      {isReferred && <ClaimReferalRewardModal />}
      {!userInfo ? (
        <div className="h-full w-full">
          <Image src={loadingImage} alt="" />
        </div>
      ) : (
        <div className="flex-grow w-full">
          <div className="bg-gradient-to-b from-gray-900 to-black flex justify-center">
            <div className="w-full text-white h-screen font-bold flex flex-col relative">
              {settingsOpen ? (
                <Settings toggleSettings={toggleSettings} />
              ) : leaderboardOpen ? (
                <>
                  <Leaderboard toggleLeaderboard={toggleLeaderboard} />
                </>
              ) : (
                <>
                  {isClaimAvailable && (
                    <ClaimCoinsAsPerYPH
                      coinProfit={coinProfit}
                      setIsClaimAvailable={setIsClaimAvailable}
                    />
                  )}
                  <div className="px-4 z-10">
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center space-x-2">
                        <div
                          className="p-1 rounded-lg bg-gradient-to-r h-10 w-10 from-purple-500 via-pink-500 to-red-500 cursor-pointer"
                          onClick={() => {
                            toggleLeaderboard();
                          }}
                        >  </div>
                        {userWebData && userWebData.userPic && (
                          <Image
                            alt=""
                            src={userWebData.userPic}
                            width={24}
                            height={24}
                            className="w-full"
                          />
                        )}
                        {/* <FaUserCircle size={24} className="text-white" /> */}

                        {userInfo && (
                          <div className="flex items-center">
                            {userInfo ? (
                              <h1 className="text-lg text-glow">
                                {userWebData.username}
                              </h1>
                            ) : (
                              <p>Loading username...</p>
                            )}
                          </div>
                        )}
                      </div>
                      <div>
                        {userWebData && userWebData.premium && (
                          <MdOutlineWorkspacePremium />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex flex-col items-start w-1/3">
                        <div className="flex justify-between w-full mb-1">
                          <p className="text-xs text-yellow-300">Energy</p>
                          {userInfo && (
                            <p className="text-xs text-yellow-300">{`${userInfo.currentEnergy}/${userInfo.totalEnergy}`}</p>
                          )}
                        </div>
                        {userInfo && (
                          <div className="w-full h-3 bg-gray-200 rounded-full relative overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-width duration-300 ease-in-out shadow-lg"
                              style={{
                                width: `${(userInfo.currentEnergy * 100) /
                                  userInfo.totalEnergy
                                  }%`,
                                boxShadow: "0 0 8px rgba(0, 255, 0, 0.5)", // Added glow effect
                              }}
                            ></div>
                            <div
                              className="absolute top-0 transform -translate-x-1/2 h-3 w-3 rounded-full bg-green-500 shadow-md glow-pulse transition-left duration-300 ease-in-out"
                              style={{
                                left: `${(userInfo.currentEnergy * 100) /
                                  userInfo.totalEnergy
                                  }%`,
                                boxShadow: "0 0 8px rgba(0, 255, 0, 0.5)", // Added glow effect
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-center bg-gray-800 border-2 border-gray-700 rounded-full px-2 py-1 max-w-48 profit-area glassmorphic">
                        <div className="flex items-center">
                          <Image
                            src={satoshiImage}
                            alt="satoshi"
                            width={24}
                            height={24}
                            className="mr-1 bright-3d-effect"
                          />
                          <div className="h-[24px] w-[1px] bg-gray-700 mx-1"></div>
                          <div className="flex-1 text-center">
                            <p className="text-xs text-gray-400 font-medium">
                              Yield per hour
                            </p>
                            <div className="flex items-center justify-center space-x-1">
                              <Image
                                src={coinImage}
                                alt="coin"
                                width={18}
                                height={18}
                                className="bright-3d-effect"
                              />
                              {userInfo && (
                                <p className="text-xs">
                                  {formatNumberWithK(userInfo.yieldPerHour)}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="h-[24px] w-[1px] bg-gray-700 mx-1"></div>
                          <IoMdSettings
                            onClick={toggleSettings}
                            className="w-6 h-6 text-yellow-400 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      {/* Level Button commented out */}
                      {/* <div
                        className="flex items-center cursor-pointer"
                        onClick={() => {
                          toggleLeaderboard();
                        }}
                      >
                        <div className="flex flex-col items-start">
                          <div className="w-full justify-between flex">
                            <p className="text-sm">Level</p>
                          </div>
                          <div className="flex items-center mt-1">
                            <div className="w-20 h-2 bg-gray-700 rounded-full">
                              <div className="h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                            </div> 
                          </div> 
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="flex-grow mt-4 mb-16 bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-[48px] relative top-glow z-0">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      {userInfo && (
                        <div className="flex items-center text-3xl bottom-24 text-white mb-7  ">
                          <Image
                            src={coinImage}
                            alt="coin"
                            width={50}
                            height={50}
                            className=" bright-3d-effect"
                          />
                          {Math.floor(userInfo.coins)}
                        </div>
                      )}
                      <div
                        className={`relative flex flex-col gap-3 items-center justify-center cursor-pointer w-80 h-80 `}
                        // onTouchEnd={(e) => {
                        //   handleCardClick(e);
                        // }}
                        onClick={(e) => {
                          handleCardClick(e);
                        }}
                      >
                        <div
                          className="relative w-full h-full main-character"
                          ref={imgRef}
                        >
                          <Image src={mainCharacter} alt="Main Character" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {clickPosition.map((position) => (
                    <div
                      key={position.id}
                      className="click-animation"
                      style={{
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        animation: "hamsterPop 0.5s ease-out forwards", // Use the pop animation we defined
                        transform: "translate(-50%, -50%)", // Ensures it's centered on the click
                        position: "absolute", // Absolute positioning for correct placement
                      }}
                      onAnimationEnd={() => handleAnimationEnd(position.id)}
                    >
                      <TbExposurePlus1 size={40} />
                    </div>
                  ))}

                </>
              )}
            </div>
          </div>
        </div>
      )}
      {userInfo && <Footer />}
    </div>
  );
}
