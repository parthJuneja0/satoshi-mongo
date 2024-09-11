import React, { useContext, useEffect, useState } from "react";
// import { FaCheckCircle } from "react-icons/fa";
import "./DailyRewardsModal.css";
import Coin from "../../assets/coin.png";
import Image from "next/image";
import { userDataContext } from "@/context/userDataContext";
import { transactionsContext } from "@/context/transactionsContext";
import NotificationModal from "@/components/NotificationModal/NotificationModal";
const DailyRewardsModal = ({ closeModal }) => {
  const { userInfo, setUserInfo, userRewards, setUserRewards } =
    useContext(userDataContext);
  const { claimDailyReward, resetDailyRewards } =
    useContext(transactionsContext);

    // Define the array of rewards
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
  const handleClaimDailyReward = async () => {
    if (!userInfo) return;
    const response = await claimDailyReward(
      userInfo.telegramId,
      availableClaim.day,
      availableClaim.reward
    );
    setUserInfo(response.user);
    setUserRewards(response.rewards);
    setAvailableClaim(null);
  };
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours} hours and ${minutes} minutes`;
  };

  const handleRewardClick = (day) => {
    if (day !== availableClaim?.day) {
      // Get the last claim timestamp and calculate time remaining
      const lastClaimedTime = userRewards.dailyRewards.lastClaimed.timestamp;
      const nextClaimTime = lastClaimedTime + 86400000; // 24 hours (in milliseconds) after last claimed
      const remainingTime = nextClaimTime - Date.now();

      if (remainingTime > 0) {
        // Convert remaining time to hours and minutes
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

    // For debugging purposes
    // const timeDifference = 864000;
    // const timeDifference = 864000001;

    if (timeDifference < 86400000) return;

    if (userRewards.dailyRewards.lastClaimed.day == 7) {
      // Revert rewards
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
              // Add an onClick handler to check availability
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
              {/* {userRewards.dailyRewards.rewards[`day${index + 1}`] && (
                <FaCheckCircle className="daily-reward-checkmark" />
              )} */}
            </div>
          ))}
        </div>
        {availableClaim && (
          <button
            className="reward-modalaction-button"
            // disabled={!availableClaim}
            onClick={() => {
              handleClaimDailyReward();
            }}
          >
            {" "}
            Claim
            {/* {availableClaim
            ? // &&
              // availableClaim.day ===
              //   Object.keys(userRewards.dailyRewards.rewards).length + 1
              "Claim"
            : "Come back tomorrow"} */}
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
