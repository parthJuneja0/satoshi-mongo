import React, { useContext, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./DailyRewardsModal.css";
import Coin from "../../assets/coin.png";
import Image from "next/image";
import { userInfoContext } from "@/context/userInfoContext";

const DailyRewardsModal = ({ claimDailyReward, closeModal }) => {
  const { userInfo } = useContext(userInfoContext);

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
    const nextDay = Object.keys(userInfo.dailyRewards).length + 1;
    
    //the user is selecting the correct reward in sekuence
    if (index + 1 === nextDay) {
      setSelectedDay({ day: index + 1, reward });
    }
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
                userInfo.dailyRewards[`day${index + 1}`]
                  ? "claimed"
                  : index + 1 !== Object.keys(userInfo.dailyRewards).length + 1
                  ? "locked-day"
                  : ""
              }`}
              onClick={() => handleDaySelection(rewardObj.reward, index)}
            >
              <div className="reward-day-circle">
                <Image
                  src={Coin}
                  className="reward-icon"
                  height={30}
                  width={30}
                />
                <p className="daily-reward-amount">{rewardObj.reward}</p>
              </div>
              {userInfo.dailyRewards[`day${index + 1}`] && (
                <FaCheckCircle className="daily-reward-checkmark" />
              )}
            </div>
          ))}
        </div>
        <button
          className="reward-modalaction-button"
          disabled={!selectedDay || selectedDay.day !== Object.keys(userInfo.dailyRewards).length + 1}
          onClick={() => {
            if (!selectedDay) return;
            claimDailyReward(selectedDay.day, selectedDay.reward);
            setSelectedDay(null);
          }}
        >
          {selectedDay && selectedDay.day === Object.keys(userInfo.dailyRewards).length + 1
            ? "Claim"
            : "Come back tomorrow"}
        </button>
      </div>
    </div>
  );
};

export default DailyRewardsModal;
