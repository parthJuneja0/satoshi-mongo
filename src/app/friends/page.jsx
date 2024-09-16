"use client";
import React, { useContext, useEffect, useState } from "react";
import { FaUserPlus, FaUserFriends } from "react-icons/fa";
import Image from "next/image";
import "./Friends.css";
import { useRouter } from "next/navigation";
import Coin from "@/assets/coin.png";
import { CgProfile } from "react-icons/cg";
import Footer from "@/components/Footer/page";
import { userDataContext } from "@/context/userDataContext";
import { MdContentCopy } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { transactionsContext } from "@/context/transactionsContext";

const Friends = () => {
  const router = useRouter();
  const { userWebData, setUserInfo, friends, setFriends } =
    useContext(userDataContext);
  const { claimReferalReward } = useContext(transactionsContext);

  const [isCopied, setIsCopied] = React.useState(false);
  const [inviteLink, setInviteLink] = useState();

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500); // Reset after 1.5 seconds
  };

  useEffect(() => {
    if (!userWebData) return;
    setInviteLink(
      `https://t.me/SATOSHI_FARMS_BOT/Satoshi_Farms?startapp=${userWebData.userId}`
    );
  }, [userWebData]);

  const handleTelegramInvite = () => {
    const telegramMessage = `Join me on this amazing app and receive bonuses!`;
    router.push(
      `https://t.me/share/url?url=${encodeURIComponent(
        inviteLink
      )}&text=${encodeURIComponent(telegramMessage)}`
    );
  };

  const handleClaim = async (userId) => {
    const response = await claimReferalReward(
      userWebData.userId,
      userId,
      userWebData.premium ? 250000 : 100000
    );
    setFriends(response.friends);
    setUserInfo(response.user);
  };

  return (
    <div className="friends-bg-gradient-to-b flex justify-center items-center w-full min-h-[100vh] mb-12">
      <div className="w-full text-white font-bold flex flex-col max-w-md relative p-4 rounded-3xl mb-12">
        <div className="w-full rounded-3xl text-white">
          <h1 className="text-3xl font-extrabold text-center mb-6 mt-10 friends-gradient-text">
            Invite Friends!
          </h1>
          <p className="text-center mb-6 text-base">
            You and your friend will receive bonuses
          </p>
          <div className="flex flex-col gap-6 mx-2">
            <div className="flex items-center bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 w-full">
              <FaUserPlus className="w-8 h-8 text-yellow-400" />
              <div className="ml-2 text-sm flex-1">
                <p className="text-base font-bold">Invite a Friend</p>
                <div className="friends-coin-text text-yellow-400 flex items-center text-lg mt-2">
                  + <Image src={Coin} alt="coin" width={20} height={20} loading="lazy"/>{" "}
                  100k Coins for you 
                </div>
              </div>
            </div>
            <div className="flex items-center bg-gray-800 p-2 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 w-full">
              <FaUserFriends className="w-8 h-8 text-yellow-400" />
              <div className="ml-2 text-sm flex-1">
                <p className="text-base font-bold">
                  Invite a Friend with Telegram Premium
                </p>
                <div className="friends-coin-text text-yellow-400 flex items-center text-lg mt-2">
                  + <Image src={Coin} alt="coin" width={20} height={20} loading="lazy"/>{" "}
                  250k Coins for you 
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center gap-2">
            <button
              className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-xl w-full hover:bg-gradient-to-l transition-colors duration-300 friends-glow"
              onClick={handleTelegramInvite}
            >
              Invite a friend
            </button>
            <CopyToClipboard text={inviteLink} onCopy={handleCopy}>
              <button className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-xl hover:bg-gradient-to-l transition-colors duration-300 friends-glow h-full">
                {!isCopied ? (
                  <MdContentCopy size={20} />
                ) : (
                  <MdOutlineDone size={20} />
                )}
              </button>
            </CopyToClipboard>
          </div>
          <div className="friends-list-container mt-8">
            <h2 className="text-gray-400 text-center text-sm">Friend List</h2>
            {friends && friends.referredBy && (
              <div className="friends-referral-container mt-4">
                <h3 className="text-md mb-2">Referred By</h3>
                <div className="flex items-center bg-gray-700 p-3 rounded-md">
                  <CgProfile className="mr-4 w-6 h-6 text-white" />
                  <p className="text-white">{friends.referredBy.username}</p>
                </div>
              </div>
            )}
            {friends && friends.referredTo.length > 0 && (
              <div className="friends-referral-container mt-4">
                <h3 className="text-md mb-2">Referred To</h3>
                {friends.referredTo.map((friend, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-700 p-3 rounded-md mt-2"
                  >
                    <CgProfile className="mr-4 w-6 h-6 text-white" />
                    <p className="text-white">{friend.username}</p>
                    {!friend.claimed ? (
                      <button
                        className="friends-claim-button"
                        onClick={() => {
                          handleClaim(friend.userId);
                        }}
                      >
                        {userWebData.premium ? 250000 : 100000}
                      </button>
                    ) : (
                      <button className="friends-claimed-button">
                        Claimed
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Friends;
