"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import "./Earn.css";
import DailyRewardsModal from "@/components/RewardModal/DailyRewardsModal";
import Youtube from "@/assets/social/youtube.png";
import X from "@/assets/social/x.png";
import Telegram from "@/assets/social/telegram.png";
import Coin from "@/assets/coin.png";
import Reward from "@/assets/social/reward.png";
import { userDataContext } from "@/context/userDataContext";
import Footer from "@/components/Footer/page";
import { transactionsContext } from "@/context/transactionsContext";

const Earn = () => {
  const rewards = {
    latestpodcast: 100000,
    satoshiTV: 100000,
    airdrop: 20000,
    news: 500000,
    podcast: 500000,
    telegram: 20000,
    twitter: 20000,
  };

  const [showDailyRewards, setShowDailyRewards] = useState(false);
  const { userInfo, setUserInfo, userRewards, setUserRewards } =
    useContext(userDataContext);
  const { completeTask } = useContext(transactionsContext);

  const handleLinkClick = async (task) => {
    if (!userInfo) return;
    if (userRewards.completedTasks[task]) return;
    const reward = rewards[task];

    const response = await completeTask(userInfo.telegramId, task, reward);
    setUserRewards(response.rewards);
    setUserInfo(response.user);
  };

  const handleDailyRewardClick = () => setShowDailyRewards(true);

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
          <h2 className="earn-section-title">Youtube Videos</h2>

          {/* Latest Podcast section */}
          <a
            href="https://youtube.com/@satoshipodcast?si=2KW461p8RwJ0txt7"
            target="_blank"
            rel="noopener noreferrer"
            className="earn-task-item"
            onClick={() => handleLinkClick("latestpodcast")}
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
                <p className="earn-task-title">Watch the latest podcast</p>
                <div className="earn-task-reward">
                  <p className="earn-plus">+</p>
                  <Image
                    src={Coin}
                    alt="Coins"
                    className="earn-reward-icon"
                    width={30}
                    height={30}
                  />
                  <span className="earn-span-value ">
                    {rewards.latestpodcast}
                  </span>
                </div>
              </div>
            </div>
            {userRewards && userRewards.completedTasks.latestpodcast && (
              <FaCheckCircle className="earn-task-checkmark" />
            )}
          </a>
          {/* Latest Podcast section */}

          {/* Satoshi TV section */}
          <a
            href="https://youtu.be/Dj1mthvJ-5Y?si=Uno0u9MgmcfpiUsY"
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
                <p className="earn-task-title">Watch News on Satoshi TV</p>
                <div className="earn-task-reward">
                  <p className="earn-plus">+</p>
                  <Image
                    src={Coin}
                    alt="Coins"
                    className="earn-reward-icon"
                    width={30}
                    height={30}
                  />
                  <span className="earn-span-value">{rewards.satoshiTV}</span>
                </div>
              </div>
            </div>
            {userRewards && userRewards.completedTasks.satoshiTV && (
              <FaCheckCircle className="earn-task-checkmark" />
            )}
          </a>
          {/* Satoshi TV section */}
        </div>

        <div className="earn-section">
          <h2 className="earn-section-title">Join Airdrop Pro Channel</h2>
          <a
            href="https://t.me/Aidropro"
            target="_blank"
            rel="noopener noreferrer"
            className="earn-task-item"
            onClick={() => handleLinkClick("airdrop")}
          >
            <div className="earn-task-content">
              <div className="earn-task-icon earn-glow-effect-white">
                <Image
                  src={Telegram}
                  alt="Telegram"
                  className="earn-task-icon-telegram"
                  width={40}
                  loading="lazy"
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
                    loading="lazy"
                    height={30}
                  />
                  <span className="earn-span-value ">{rewards.airdrop}</span>
                </div>
              </div>
            </div>
            {userRewards && userRewards.completedTasks.airdrop && (
              <FaCheckCircle className="earn-task-checkmark" />
            )}
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
                loading="lazy"
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
              href="https://youtube.com/@satoshitvnews?si=3e40LeAs-ri8Zf-Y"
              target="_blank"
              rel="noopener noreferrer"
              className="earn-task-item"
              onClick={() => handleLinkClick("news")}
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
                  <p className="earn-task-title">Subscribe to SatoshiTV News</p>
                  <div className="earn-task-reward">
                    <p className="earn-plus">+</p>
                    <Image
                      src={Coin}
                      alt="Coins"
                      className="earn-reward-icon"
                      width={30}
                      height={30}
                    />
                    <span className="earn-span-value ">{rewards.news}</span>
                  </div>
                </div>
              </div>
              {userRewards && userRewards.completedTasks.news && (
                <FaCheckCircle className="earn-task-checkmark" />
              )}
            </a>
            <a
              href="https://youtube.com/@satoshipodcast?si=2KW461p8RwJ0txt7"
              target="_blank"
              rel="noopener noreferrer"
              className="earn-task-item"
              onClick={() => handleLinkClick("podcast")}
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
                  <p className="earn-task-title">
                    Subscribe to Satoshi Podcast
                  </p>
                  <div className="earn-task-reward">
                    <p className="earn-plus">+</p>
                    <Image
                      src={Coin}
                      alt="Coins"
                      className="earn-reward-icon"
                      width={30}
                      height={30}
                    />
                    <span className="earn-span-value ">{rewards.podcast}</span>
                  </div>
                </div>
              </div>
              {userRewards && userRewards.completedTasks.podcast && (
                <FaCheckCircle className="earn-task-checkmark" />
              )}
            </a>
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
                    loading="lazy"
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
                      loading="lazy"
                      className="earn-reward-icon"
                      width={30}
                      height={30}
                    />
                    <span className="earn-span-value ">{rewards.telegram}</span>
                  </div>
                </div>
              </div>
              {userRewards && userRewards.completedTasks.telegram && (
                <FaCheckCircle className="earn-task-checkmark" />
              )}
            </a>
            {/* Twitter Task */}
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
                    loading="lazy"
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
                      loading="lazy"
                    />
                    <span className="earn-span-value ">{rewards.twitter}</span>
                  </div>
                </div>
              </div>
              {userRewards && userRewards.completedTasks.twitter && (
                <FaCheckCircle className="earn-task-checkmark" />
              )}
            </a>
          </div>
        </div>
        {showDailyRewards && (
          <DailyRewardsModal closeModal={() => setShowDailyRewards(false)} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Earn;
