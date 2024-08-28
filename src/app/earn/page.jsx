"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
// import { ref, update } from "firebase/database";
// import { realtimeDb } from "@/config/firebase";
import "./Earn.css";
import DailyRewardsModal from "@/components/RewardModal/DailyRewardsModal";
import Youtube from "@/assets/social/youtube.png";
import X from "@/assets/social/X.png";
import Telegram from "@/assets/social/telegram.png";
import Coin from "@/assets/coin.png";
import Reward from "@/assets/social/reward.png";
// import { userDataContext } from "@/context/userDataContext";
// import { userInfoContext } from "@/context/userInfoContext";
import Footer from "@/components/Footer/page";

const Earn = () => {
  let youtubeReward = 50000;
  let telegramReward = 20000;
  let twitterReward = 20000;
  let satoshiTVReward = 5000;
  const [showDailyRewards, setShowDailyRewards] = useState(false);

  // const { userWebData } = useContext(userDataContext);
  // const { userInfo } = useContext(userInfoContext);

  const grantReward = (task) => {
    if (!userInfo) return;
    const reward = {
      youtube: youtubeReward,
      telegram: telegramReward,
      twitter: twitterReward,
      satoshiTV: satoshiTVReward,
    }[task];

    update(ref(realtimeDb, `/users/${userWebData.userId}`), {
      coins: userInfo.coins + reward,
    });
  };

  const handleLinkClick = async (task) => {
    if (!userInfo) return;
    if (userInfo.completedTasks[task]) return;
    update(ref(realtimeDb, `/users/${userWebData.userId}`), {
      completedTasks: {
        ...userInfo.completedTasks,
        [task]: true,
      },
    });
    grantReward(task);
  };

  const handleDailyRewardClick = () => setShowDailyRewards(true);
  const claimDailyReward = (day, reward) => {
    if (!userInfo || userInfo.dailyRewards[day]) return;
    update(ref(realtimeDb, `/users/${userWebData.userId}`), {
      dailyRewards: {
        ...userInfo.dailyRewards,
        [day]: true,
      },
      coins: userInfo.coins + reward,
    });
  };

  return (
    <div className="earn-container">
      <div className="earn-content">
        <div className="earn-icon-wrapper">
          <Image
            src={Coin}
            alt="Coins"
            className="earn-icon-coin earn-glowisyellow"
            width={80}
            height={80}
          />
        </div>
        <h1 className="earn-title">Earn more coins</h1>

        <div className="earn-section">
          <h2 className="earn-section-title">Satoshi TV</h2>
          <a
            href="https://youtube.com/@satoshitvnews?si=3e40LeAs-ri8Zf-Y"
            target="_blank"
            rel="noopener noreferrer"
            className="earn-task-item"
            onClick={() => handleLinkClick("youtube")}
          >
            <div className="earn-task-content">
              <div className="earn-task-icon earn-glow-effect-white">
                <Image
                  src={Youtube}
                  alt="YouTube"
                  className="earn-task-icon-youtube"
                  width={40}
                  height={40}
                />
              </div>
              <div className="earn-task-details">
                <p className="earn-task-title">Subscribe to YouTube channel</p>
                <div className="earn-task-reward">
                  <p className="earn-plus">+</p>
                  <Image
                    src={Coin}
                    alt="Coins"
                    className="earn-reward-icon"
                    width={30}
                    height={30}
                  />
                  <span className="earn-span-value ">{youtubeReward}</span>
                </div>
              </div>
            </div>
            {/* {userInfo && userInfo.completedTasks.youtube && (
              <FaCheckCircle className="earn-task-checkmark" />
            )} */}
          </a>
          <a
            href="https://youtube.com/@satoshitvnews?si=3e40LeAs-ri8Zf-Y"
            target="_blank"
            rel="noopener noreferrer"
            className="earn-task-item"
            onClick={() => handleLinkClick("satoshiTV")}
          >
            <div className="earn-task-content">
              <div className="earn-task-icon earn-glow-effect-white">
                <Image
                  src={Youtube}
                  alt="YouTube"
                  className="earn-task-icon-youtube"
                  width={40}
                  height={40}
                />
              </div>
              <div className="earn-task-details">
                <p className="earn-task-title">Watch tutorial on Satoshi TV</p>
              </div>
            </div>
            {/* {userInfo && userInfo.completedTasks.satoshiTV && (
              <FaCheckCircle className="earn-task-checkmark" />
            )} */}
          </a>
        </div>

        <div className="earn-section">
          <h2 className="earn-section-title">Daily Rewards</h2>
          <div className="earn-task-item" onClick={handleDailyRewardClick}>
            <div className="earn-task-content">
              <Image
                src={Reward}
                alt="Reward"
                className="earn-glow-effect-yellow earn-mr-4"
                width={40}
                height={40}
              />
              <div className="earn-task-details">
                <p className="earn-task-title">Claim Daily Reward</p>
              </div>
            </div>
          </div>
        </div>

        <div className="earn-section">
          <h2 className="earn-section-title">Tasks List</h2>
          <div className="earn-task-list">
            <a
              href="https://t.me/satoshifarms"
              target="_blank"
              rel="noopener noreferrer"
              className="earn-task-item"
              onClick={() => handleLinkClick("telegram")}
            >
              <div className="earn-task-content">
                <div className="earn-task-icon earn-glow-effect-white">
                  <Image
                    src={Telegram}
                    alt="Telegram"
                    className="earn-task-icon-telegram"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="earn-task-details">
                  <p className="earn-task-title">Join our Telegram Channel</p>
                  <div className="earn-task-reward">
                    <p className="earn-plus">+</p>
                    <Image
                      src={Coin}
                      alt="Coins"
                      className="earn-reward-icon"
                      width={30}
                      height={30}
                    />
                    <span className="earn-span-value ">{telegramReward}</span>
                  </div>
                </div>
              </div>
              {/* {userInfo && userInfo.completedTasks.telegram && (
                <FaCheckCircle className="earn-task-checkmark" />
              )} */}
            </a>
            <a
              href="https://t.me/Aidropro"
              target="_blank"
              rel="noopener noreferrer"
              className="earn-task-item"
              onClick={() => handleLinkClick("telegram")}
            >
              <div className="earn-task-content">
                <div className="earn-task-icon earn-glow-effect-white">
                  <Image
                    src={Telegram}
                    alt="Telegram"
                    className="earn-task-icon-telegram"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="earn-task-details">
                  <p className="earn-task-title">Join Airdrop Pro Channel</p>
                  <div className="earn-task-reward">
                    <p className="earn-plus">+</p>
                    <Image
                      src={Coin}
                      alt="Coins"
                      className="earn-reward-icon"
                      width={30}
                      height={30}
                    />
                    <span className="earn-span-value ">{telegramReward}</span>
                  </div>
                </div>
              </div>
              {/* {userInfo && userInfo.completedTasks.telegram && (
                <FaCheckCircle className="earn-task-checkmark" />
              )} */}
            </a>
            <a
              href="https://x.com/satoshifarmss"
              target="_blank"
              rel="noopener noreferrer"
              className="earn-task-item"
              onClick={() => handleLinkClick("twitter")}
            >
              <div className="earn-task-content">
                <div className="earn-task-icon earn-glow-effect-white">
                  <Image
                    src={X}
                    alt="X"
                    className="earn-task-icon-x"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="earn-task-details">
                  <p className="earn-task-title">Follow us on X</p>
                  <div className="earn-task-reward">
                    <p className="earn-plus">+</p>
                    <Image
                      src={Coin}
                      alt="Coins"
                      className="earn-reward-icon"
                      width={30}
                      height={30}
                    />
                    <span className="earn-span-value ">{twitterReward}</span>
                  </div>
                </div>
              </div>
              {/* {userInfo && userInfo.completedTasks.twitter && (
                <FaCheckCircle className="earn-task-checkmark" />
              )} */}
            </a>
          </div>
        </div>
        {showDailyRewards && (
          <DailyRewardsModal
            claimDailyReward={claimDailyReward}
            closeModal={() => setShowDailyRewards(false)}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Earn;
