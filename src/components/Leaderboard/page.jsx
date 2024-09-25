"use client";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineCrown } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import "./Leaderboard.css";
import Coin from "../../assets/coin.png";
import Image from "next/image";
import { FaCrown } from "react-icons/fa";
import { userDataContext } from "@/context/userDataContext";
import { GiPodiumWinner, GiPodiumSecond, GiPodiumThird } from "react-icons/gi";
import axios from "axios";

const Leaderboard = ({ toggleLeaderboard }) => {
  const [topPlayers, setTopPlayers] = useState([]);
  const [myPosition, setMyPosition] = useState(null);
  const { userInfo } = useContext(userDataContext);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/leaderboard");
      setTopPlayers(response.data.topPlayers);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (topPlayers.length > 0) {
      topPlayers.filter((player) => player.telegramId !== userInfo.telegramId);
      const myIndex = topPlayers.findIndex(
        (player) => player.telegramId === userInfo.telegramId
      );
      if (myIndex >= 0) {
        setMyPosition(myIndex + 1);
      } else {
        setMyPosition("100+");
      }
    }
  }, [topPlayers, userInfo.telegramId]);

  // To debug 100+ position
  // useEffect(() => {
  //   if (topPlayers.length > 0) {
  //     const filteredPlayers = topPlayers.filter(
  //       (player) => player.telegramId !== userInfo.telegramId
  //     );

  //     const myIndex = filteredPlayers.findIndex(
  //       (player) => player.telegramId === userInfo.telegramId
  //     );

  //     if (myIndex >= 0) {
  //       setMyPosition(myIndex + 1);
  //     } else {
  //       setMyPosition("100+");
  //     }

  //     setTopPlayers(filteredPlayers); // Update topPlayers with filtered list
  //   }
  // }, [topPlayers, userInfo.telegramId]);

  const TopThreePlayers = () => {
    if (topPlayers.length < 3) return null;

    return (
      <div className="relative w-full flex justify-center items-end mb-10 ">
        {/* 2nd Position (smaller) */}

        <div className="flex flex-col items-center -ml-16">
          <div className="bg-gray-800 p-2 rounded-lg shadow-lg w-24 text-center">
            <div className="flex justify-center items-center mb-1">
              <GiPodiumThird className="text-yellow-400 text-3xl glow" />{" "}
              {/* 3rd Place Icon */}
            </div>
            <p className="text-sm font-bold text-white">
              {topPlayers[2].username}
            </p>
            <p className="text-xs text-gray-400">
              Score: {topPlayers[2].yieldPerHour}
            </p>
            <p className="text-xs text-yellow-400">Prize: $250</p>
          </div>
        </div>

        {/* 1st Position (largest and centered) */}
        <div className="flex flex-col items-center -mt-12">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-32 text-center border-4 border-yellow-500">
            <div className="flex justify-center items-center mb-2">
              <FaCrown className="text-yellow-400 text-4xl mb-2 glow" />
            </div>
            <div className="flex justify-center items-center mb-2">
              <GiPodiumWinner className="text-yellow-400 text-5xl glow" />{" "}
              {/* 1st Place Icon */}
            </div>
            <p className="text-lg font-bold text-white">
              {topPlayers[0].username}
            </p>
            <p className="text-sm text-gray-400">
              Score: {topPlayers[0].yieldPerHour}
            </p>
            <p className="text-sm text-yellow-400">Prize: $1000</p>
          </div>
        </div>

        {/* 3rd Position (larger than 2nd but smaller than 1st) */}
        <div className="flex flex-col items-center -mr-16">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-28 text-center">
            <div className="flex justify-center items-center mb-2">
              <GiPodiumSecond className="text-yellow-400 text-4xl glow" />{" "}
              {/* 2nd Place Icon */}
            </div>
            <p className="text-md font-bold text-white">
              {topPlayers[1].username}
            </p>
            <p className="text-sm text-gray-400">
              Score: {topPlayers[1].yieldPerHour}
            </p>
            <p className="text-sm text-yellow-400">Prize: $500</p>
          </div>
        </div>
      </div>
    );
  };

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
                    {userInfo.username}
                  </span>
                </div>
                <div className="flex items-center">
                  <Image
                    src={Coin}
                    alt="Coin"
                    className={`mr-2 text-yellow-400 h-10 w-10`}
                  />
                  <span className="text-xl font-bold text-white">
                    {userInfo.yieldPerHour}
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
        <br />
        <br />
        <TopThreePlayers />

        <hr className="w-full border-t-2 border-gray-600 my-6" />

        {/* List */}
        {topPlayers && (
          <ul className="flex flex-col space-y-3 w-full">
            {topPlayers.map((player, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-xl w-[350px] mx-auto"
              >
                {/* Left section: Ranking and Username */}
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
                  {/* Username */}
                  <span className="text-lg font-semibold text-white truncate max-w-[150px]">
                    {player.username}
                  </span>
                </div>

                {/* Right section: Points */}
                <div className="flex items-center">
                  <Image
                    src={Coin}
                    alt="Coin"
                    className={`mr-2 h-10 w-10 ${
                      index < 3 ? "text-yellow-400" : "text-gray-400"
                    }`}
                  />
                  <span className="text-xl font-bold text-white truncate max-w-[80px]">
                    {player.yieldPerHour}
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
