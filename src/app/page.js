"use client";
import { useState, useContext, useRef } from "react";
import Image from "next/image";
import Leaderboard from "../components/Leaderboard/page";
import Settings from "../components/Settings/page";
import Footer from "@/components/Footer/page";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import mainCharacter from "../assets/farmbutton.png";
import coinImage from "../assets/coin.png";
import satoshiImage from "../assets/satoshi.png";
import loadingImage from "@/assets/loading/page1.jpg"
import { TbExposurePlus1 } from "react-icons/tb";
import { userDataContext } from "@/context/userDataContext";
import { FaUserCircle } from "react-icons/fa";
// import { userInfoContext } from "@/context/userInfoContext";
// import ClaimReferalRewardModal from "@/components/ClaimReferalRewardModal/page"; 
// import ClaimCoinsAsPerYPH from "@/components/ClaimCoinsAsPerYPH/ClaimCoinsAsPerYPH";

export default function Home() {
  const imgRef = useRef();
  const { userWebData, userInfo } = useContext(userDataContext);
  // const { userInfo, isReferred, setIsReferred } = useContext(userInfoContext);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [showAnimation, setShowAnimation] = useState(false);
  const [isClaimAvailable, setIsClaimAvailable] = useState(false);

  const [energyProfit, setEnergyProfit] = useState();
  const [coinProfit, setCoinProfit] = useState();

  // useEffect(() => {
  //   if (!userInfo || !userInfo.lastSession || userInfo.lastSession.hasClaimed === true) return;
  //   const differenceInMilliseconds = Date.now() - userInfo.lastSession.lastOnline;
  //   const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
  //   setEnergyProfit(differenceInSeconds);

  //   // 3 hrs = 3*3600 = 10800 seconds
  //   if (differenceInSeconds < 10800) {
  //     const profit = Math.floor(
  //       userInfo.yieldPerHour * (differenceInSeconds / 3600)
  //     )
  //     if (profit > 0) {
  //       if (coinProfit > 0) return;
  //       setCoinProfit(profit);
  //       setIsClaimAvailable(true);
  //     }
  //     else {
  //       update(ref(realtimeDb, `/users/${userWebData.userId}`), {
  //         lastSession: {
  //           ...userInfo.lastSession,
  //           hasClaimed: true,
  //         },
  //       });
  //     }
  //   }
  //   else {
  //     setCoinProfit(Math.floor(userInfo.yieldPerHour * (10800 / 3600)));
  //     setIsClaimAvailable(true);
  //   }
  // }, [userInfo])

  // // Add energy when user comes online
  // useEffect(() => {
  //   if (!energyProfit) return;
  //   update(ref(realtimeDb, `/users/${userWebData.userId}`), {
  //     currentEnergy: Math.min(
  //       userInfo.currentEnergy + energyProfit,
  //       userInfo.totalEnergy
  //     ),
  //   });
  //   setEnergyProfit(0);
  // }, [energyProfit]);

  // // When card is clicked
  const handleCardClick = (e) => {
    if (e.target.tagName !== "IMG" || !userInfo) return;
    setShowAnimation(true);
    const rect = e.target.getBoundingClientRect();
    setClickPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    const imageCenterX = rect.left + rect.width / 2;
    const imageCenterY = rect.top + rect.height
    const tiltX = (clickPosition.x - imageCenterX) / rect.width * 2;
    const tiltY = (clickPosition.y - imageCenterY) / rect.height * 2;
    imgRef.current.style.transform = `skewX(${tiltX}deg) skewY(${tiltY}deg)`;
    setTimeout(() => {
      imgRef.current.style.transform = 'none';
    }, 50);
    // update(ref(realtimeDb, `/users/${userWebData.userId}`), {
    //   coins: userInfo.coins + userInfo.pointsToAdd,
    //   currentEnergy: userInfo.currentEnergy - userInfo.pointsToAdd
    // })
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    setTimeout(() => setShowAnimation(false), 500);
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  const toggleLeaderboard = () => {
    setLeaderboardOpen(!leaderboardOpen);
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
      {/* {isReferred && <ClaimReferalRewardModal />} */}
      {!userInfo ? (<div className="h-full w-full">
        <Image src={loadingImage} alt="" /></div>) :
        (<div className="flex-grow w-full">
          <div className="bg-gradient-to-b from-gray-900 to-black flex justify-center">
            <div className="w-full text-white h-screen font-bold flex flex-col relative">
              {settingsOpen ? (
                <Settings toggleSettings={toggleSettings} />
              ) : leaderboardOpen ? (
                <>
                  <Leaderboard
                    toggleLeaderboard={toggleLeaderboard}
                  />
                </>
              ) : (
                <>
                  {/* {isClaimAvailable && !userInfo.lastSession.hasClaimed && <ClaimCoinsAsPerYPH coinProfit={coinProfit} setCoinProfit={setCoinProfit} setIsClaimAvailable={setIsClaimAvailable} />} */}
                  <div className="px-4 z-10">
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center space-x-2">
                        <div
                          className="p-1 rounded-lg bg-gradient-to-r h-10 w-10 from-purple-500 via-pink-500 to-red-500 cursor-pointer flex justify-center items-center"
                          onClick={() => {
                            toggleLeaderboard();
                          }}
                        >
                          {userWebData && userWebData.userPic ? <Image alt="" src={userWebData.userPic} width={24} height={24} className="w-full" /> :
                            <FaUserCircle size={24} className="text-white" />}
                        </div>
                        <div className="flex items-center">
                          {userWebData &&
                            <h1 className="text-lg text-glow">{userWebData.username}</h1>
                          }
                        </div>
                      </div>
                      <div>
                        {userWebData && userWebData.premium && <MdOutlineWorkspacePremium />}
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
                                width: `${(userInfo.currentEnergy * 100) / userInfo.totalEnergy}%`,
                                boxShadow: "0 0 8px rgba(0, 255, 0, 0.5)", // Added glow effect
                              }}
                            ></div>
                            <div
                              className="absolute top-0 transform -translate-x-1/2 h-3 w-3 rounded-full bg-green-500 shadow-md glow-pulse transition-left duration-300 ease-in-out"
                              style={{
                                left: `${(userInfo.currentEnergy * 100) / userInfo.totalEnergy}%`,
                                boxShadow: "0 0 8px rgba(0, 255, 0, 0.5)", // Added glow effect
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-center bg-gray-800 border-2 border-gray-700 rounded-full px-2 py-1 max-w-48 profit-area glassmorphic">
                        <div className="flex items-center">
                          <Image src={satoshiImage} alt="satoshi" width={24} height={24} className="mr-1 bright-3d-effect" />
                          <div className="h-[24px] w-[1px] bg-gray-700 mx-1"></div>
                          <div className="flex-1 text-center">
                            <p className="text-xs text-gray-400 font-medium">Yield per hour</p>
                            <div className="flex items-center justify-center space-x-1">
                              <Image src={coinImage} alt="coin" width={18} height={18} className="bright-3d-effect" />
                              {userInfo && <p className="text-xs">{formatNumberWithK(userInfo.yieldPerHour)}</p>}
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
                    <div className="absolute inset-0 flex flex-col items-center justify-center"
                    >
                      {userInfo && (
                        <div className="flex items-center text-3xl bottom-24 text-white mb-7  ">
                          <Image src={coinImage} alt="coin" width={50} height={50} className=" bright-3d-effect" />
                          {Math.floor(userInfo.coins)}
                        </div>
                      )}
                      <div
                        className={`relative flex flex-col gap-3 items-center justify-center cursor-pointer w-80 h-80 `} onClick={(e) => {
                          handleCardClick(e);
                        }}
                      >
                        <div className="relative w-full h-full main-character" ref={imgRef} >
                          <Image src={mainCharacter} alt="Main Character" />

                        </div>

                      </div>
                      {showAnimation && (

                        <div
                          className="click-animation"
                          style={{
                            top: `${clickPosition.y + 55}px`,
                            left: `${clickPosition.x + 25}px`,
                          }}
                        >
                          <TbExposurePlus1 />
                          {/* <Image src={coinImage} alt="coin" width={30} height={30} className="inline text-yellow-400 bright-3d-effect" /> */}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <Footer />
        </div>)
      }
    </div>
  );
}



