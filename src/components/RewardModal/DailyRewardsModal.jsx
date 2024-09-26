// import { FaCheckCircle } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import "./DailyRewardsModal.css";
import Coin from "../../assets/coin.png";
import Image from "next/image";
import { userDataContext } from "@/context/userDataContext";
import { transactionsContext } from "@/context/transactionsContext";
import NotificationModal from "@/components/NotificationModal/NotificationModal";
import ClipLoader from "react-spinners/ClipLoader";

const DailyRewardsModal = ({ closeModal }) => {
  const { userInfo, setUserInfo, userRewards, setUserRewards } =
    useContext(userDataContext);
  const { claimDailyReward, resetDailyRewards } =
    useContext(transactionsContext);

  const rewardsArray = [
    { day: 1, reward: 1000 },
    { day: 2, reward: 2500 },
    { day: 3, reward: 5000 },
    { day: 4, reward: 10000 },
    { day: 5, reward: 50000 },
    { day: 6, reward: 100000 },
    { day: 7, reward: 500000 },
  ];

  const [notificationTimestamp, setNotificationTimestamp] = useState(null);
  const [availableClaim, setAvailableClaim] = useState();
  const [notificationMessage, setNotificationMessage] = useState(""); // State to store the notification message
  const [showNotification, setShowNotification] = useState(false); // State to control modal visibility
  const [loading, setLoading] = useState(false); 

  const handleClaimDailyReward = async () => {
    if (!userInfo) return;
    setLoading(true);

    try {
      const response = await claimDailyReward(
        userInfo.telegramId,
        availableClaim.day,
        availableClaim.reward
      );
      setUserInfo(response.user);
      setUserRewards(response.rewards);
      setAvailableClaim(null);
    } catch (error) {
      console.error("Error claiming daily reward:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours} hours and ${minutes} minutes`;
  };

  const handleRewardClick = (day) => {
    if (day !== availableClaim?.day) {
      const lastClaimedTime = userRewards.dailyRewards.lastClaimed.timestamp;
      const nextClaimTime = lastClaimedTime + 86400000; // 24 hours (in milliseconds) after last claimed
      const remainingTime = nextClaimTime - Date.now();

      if (remainingTime > 0) {
        const timeUntilNextClaim = formatTime(remainingTime);
        setNotificationMessage(
          `You can claim the next reward in ${timeUntilNextClaim}. Please come back later!`
        );
        setNotificationTimestamp(nextClaimTime);
        setShowNotification(true); // Show the modal
      } else {
        setNotificationMessage("This reward is not available to claim yet!");
        setNotificationTimestamp(null);
        setShowNotification(true); // Show the modal
      }
    }
  };

  useEffect(() => {
    if (!userRewards) return;

    if (userRewards.dailyRewards.lastClaimed.day === 0)
      setAvailableClaim(rewardsArray.find((obj) => obj.day === 1));

    const timeDifference =
      Date.now() - userRewards.dailyRewards.lastClaimed.timestamp;

    if (timeDifference < 86400000) return;

    if (userRewards.dailyRewards.lastClaimed.day == 7) {
      (async () => {
        await resetDailyRewards(userInfo.telegramId);
      })();
      setAvailableClaim(rewardsArray.find((obj) => obj.day === 1));
    } else {
      const nextDay = (userRewards.dailyRewards.lastClaimed.day % 7) + 1;
      let availableDay = rewardsArray.find((obj) => obj.day === nextDay);
      setAvailableClaim(availableDay);
    }
  }, [userRewards]);

  return (
    <div className="reward-modaloverlay">
      <div className="reward-modalcontent">
        <div className="reward-modalheader">
          <button className="reward-modalclose-button" onClick={closeModal}>
            ×
          </button>
        </div>
        <h2 className="reward-modaltitle">Daily Rewards</h2>
        <div className="daily-rewards-grid">
          {rewardsArray.map((rewardObj, index) => (
            <div
              key={index}
              className={`daily-reward-item ${
                userRewards.dailyRewards.rewards[`day${index + 1}`]
                  ? "claimed"
                  : index + 1 !== availableClaim?.day
                  ? "locked-day"
                  : ""
              }`}
              onClick={() => handleRewardClick(index + 1)}
            >
              <div className="reward-day-circle">
                <Image
                  src={Coin}
                  className="reward-icon"
                  alt=""
                  height={30}
                  width={30}
                />
                <p className="daily-reward-amount">{rewardObj.reward}</p>
              </div>
            </div>
          ))}
        </div>
        {availableClaim && (
          <button
            className="reward-modalaction-button"
            onClick={() => handleClaimDailyReward()}
            disabled={loading} 
          >
            {loading ? (
              <ClipLoader size={20} color="#fff" /> 
            ) : (
              "Claim"
            )}
          </button>
        )}
      </div>
      {showNotification && (
        <NotificationModal
          message={notificationMessage}
          timestamp={notificationTimestamp}
          closeModal={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default DailyRewardsModal;
