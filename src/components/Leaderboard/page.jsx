"use client";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineCrown } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import "./Leaderboard.css";
// import { onValue, ref } from "firebase/database";
import Coin from "../../assets/coin.png";
import Image from "next/image";
// import { realtimeDb } from "@/config/firebase";
// import { userInfoContext } from "@/context/userInfoContext";

const Leaderboard = ({ toggleLeaderboard }) => {
  const [players, setPlayers] = useState([]);
  const [topPlayers, setTopPlayers] = useState([]);
  const [myPosition, setMyPosition] = useState(null);
  // const { userInfo } = useContext(userInfoContext);

  // useEffect(() => {
  //   const unsubscribe = onValue(ref(realtimeDb, "/users"), (snapshot) => {
  //     setPlayers(Object.values(snapshot.val()));
  //   });
  //   return () => unsubscribe();
  // }, [ref(realtimeDb, "/users")]);

  // useEffect(() => {
  //   // Sort players and limit to top 100
  //   const sortedPlayers = players
  //     .slice()
  //     .sort((a, b) => b.yieldPerHour - a.yieldPerHour);
  //   setTopPlayers(sortedPlayers.slice(0, 100)); // Get the top 100 players

  //   // Find your position (if applicable)
  //   const myIndex = sortedPlayers.findIndex(
  //     (player) => player.uid === userInfo.uid
  //   );
  //   setMyPosition(myIndex >= 0 && myIndex < 100 ? myIndex + 1 : null);
  // }, [players, userInfo]);

  // useEffect(() => {
  //   // Sort players and limit to top 100
  //   const sortedPlayers = players
  //     .slice()
  //     .sort((a, b) => b.yieldPerHour - a.yieldPerHour);
  //   setTopPlayers(sortedPlayers.slice(0, 100)); // Get the top 100 players
  // }, [players]);

  function formatNumberWithK(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    } else {
      return num;
    }
  }

  return (
    <div className="leaderboard-container mx-auto flex flex-col justify-between items-center w-full h-full bg-black">
      <div className="relative flex flex-col items-center w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#333] rounded-lg shadow-lg p-6 overflow-y-auto">
        {/* My score */}
        {myPosition !== null && (
          <div className="fixed bottom-16 left-0 z-50 w-full mb-3 flex justify-center">
            <div className="glow-effect-container">
              <li className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-xl mx-auto w-[350px]">
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center h-12 w-12 rounded-full mr-4 ${
                      myPosition < 3 ? "bg-yellow-500 glow" : "bg-[#ff7f50]"
                    }`}
                  >
                    {myPosition < 3 ? (
                      <AiOutlineCrown className="text-2xl text-yellow-300" />
                    ) : (
                      <span className="text-2xl text-white">{myPosition}</span>
                    )}
                  </div>
                  <span className="text-lg font-semibold text-white">
                    {/* {userInfo.username} */}
                  </span>
                </div>
                <div className="flex items-center">
                  <Image
                    src={Coin}
                    alt="Coin"
                    className={`mr-2 text-yellow-400 h-10 w-10`}
                  />
                  <span className="text-xl font-bold text-white">
                    {/* {formatNumberWithK(userInfo.yieldPerHour)} */}
                  </span>
                </div>
              </li>
            </div>
          </div>
        )}
        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <button
            onClick={() => toggleLeaderboard(false)}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-600 transition-colors duration-300 focus:outline-none"
          >
            <BiArrowBack className="text-2xl text-white" />
          </button>
        </div>

        {/* Heading */}
        <div className="flex justify-center mb-6 w-full">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 heading-pattern relative">
            Leaderboard
          </h1>
        </div>

        {/* List */}
        {topPlayers && (
          <ul className="flex flex-col space-y-3 w-full">
            {topPlayers.map((player, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-xl w-[350px] mx-auto"
              >
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center h-12 w-12 rounded-full mr-4 ${
                      index < 3 ? "bg-yellow-500 glow" : "bg-[#ff7f50]"
                    }`}
                  >
                    {index < 3 ? (
                      <AiOutlineCrown className="text-2xl text-yellow-300" />
                    ) : (
                      <span className="text-2xl text-white">{index + 1}</span>
                    )}
                  </div>
                  <span className="text-lg font-semibold text-white">
                    {player.username}
                  </span>
                </div>
                <div className="flex items-center">
                  <Image
                    src={Coin}
                    alt="Coin"
                    className={`mr-2 h-10 w-10 ${
                      index < 3 ? "text-yellow-400 " : "text-gray-400"
                    }`}
                  />
                  <span className="text-xl font-bold text-white">
                    {formatNumberWithK(player.yieldPerHour)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
