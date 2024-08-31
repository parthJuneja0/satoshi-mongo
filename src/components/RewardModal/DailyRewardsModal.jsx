import React, { useContext, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./DailyRewardsModal.css";
import Coin from "../../assets/coin.png";
import Image from "next/image";
import { userDataContext } from "@/context/userDataContext";
import { transactionsContext } from "@/context/transactionsContext";

const DailyRewardsModal = ({ closeModal }) => {
  const { userInfo, setUserInfo, userRewards, setUserRewards } =
    useContext(userDataContext);
  const { claimDailyReward } = useContext(transactionsContext);

  // Define the array of rewards
  const rewardsArray = [
    { reward: 1000 },
    { reward: 2500 },
    { reward: 5000 },
    { reward: 10000 },
    { reward: 50000 },
    { reward: 100000 },
    { reward: 500000 },
  ];

  const [selectedDay, setSelectedDay] = useState(null);

  const handleDaySelection = (reward, index) => {
    const nextDay = Object.keys(userRewards.dailyRewards).length + 1;

    // The user is selecting the correct reward in sequence
    if (index + 1 === nextDay) {
      setSelectedDay({ day: index + 1, reward });
    }
  };

  const handleClaimDailyReward = async (day, reward) => {
    if (!userInfo) return;

    const currentTimestamp = Date.now();
    console.log(currentTimestamp);
    const lastClaimedTimestamp = userRewards.dailyRewards.lastClaimed.timestamp;
    console.log(lastClaimedTimestamp);
    const lastClaimedDay = userRewards.dailyRewards.lastClaimed.day;
    console.log(lastClaimedDay);
    const nextDay = (lastClaimedDay % 7) + 1;
    console.log(nextDay);

    // Correct reward in sequence and that 24 hours have passed
    if (lastClaimedTimestamp) {
      const timeDifference = currentTimestamp - lastClaimedTimestamp;
      console.log(timeDifference);
      if (timeDifference < 86400000) {
        // 24 * 60 * 60 * 1000 = 86400000
        alert(
          "You need to wait 24 hours from your last claim to collect the next reward."
        );
        return;
      }
    }

    if (day !== nextDay) {
      alert("You need to claim the previous day's reward first.");
      return;
    }

    // const response = await claimDailyReward(
    //   userInfo.telegramId,
    //   selectedDay.day,
    //   selectedDay.reward
    // );
    // console.log(response);
    // setUserInfo(response.user);
    // setUserRewards(response.rewards);
  };

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
                selectedDay && selectedDay.day === index + 1
                  ? "border-2 border-white"
                  : ""
              } ${
                userRewards.dailyRewards[`day${index + 1}`]
                  ? "claimed"
                  : index + 1 !==
                    Object.keys(userRewards.dailyRewards).length + 1
                  ? "locked-day"
                  : ""
              }`}
              onClick={() => handleDaySelection(rewardObj.reward, index)}
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
              {userRewards.dailyRewards[`day${index + 1}`] && (
                <FaCheckCircle className="daily-reward-checkmark" />
              )}
            </div>
          ))}
        </div>
        <button
          className="reward-modalaction-button"
          disabled={
            !selectedDay ||
            selectedDay.day !== Object.keys(userRewards.dailyRewards).length + 1
          }
          onClick={() => {
            if (!selectedDay) return;
            handleClaimDailyReward(selectedDay.day, selectedDay.reward);
            setSelectedDay(null);
          }}
        >
          {selectedDay &&
          selectedDay.day === Object.keys(userRewards.dailyRewards).length + 1
            ? "Claim"
            : "Come back tomorrow"}
        </button>
      </div>
    </div>
  );
};

export default DailyRewardsModal;
