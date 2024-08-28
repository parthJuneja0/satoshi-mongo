import React, { useContext, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./DailyRewardsModal.css";
import Coin from "../../assets/coin.png";
import Image from "next/image";
// import { userInfoContext } from "@/context/userInfoContext";
const DailyRewardsModal = ({ claimDailyReward, closeModal }) => {
  // const { userInfo } = useContext(userInfoContext);
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  const array = [
    {
      day: "Monday",
      reward: 1000,
    },
    {
      day: "Tuesday",
      reward: 2500,
    },
    {
      day: "Wednesday",
      reward: 5000,
    },
    {
      day: "Thursday",
      reward: 10000,
    },
    {
      day: "Friday",
      reward: 50000,
    },
    {
      day: "Saturday",
      reward: 100000,
    },
    {
      day: "Sunday",
      reward: 500000,
    },
  ];
  const [selectedDay, setSelectedDay] = useState();
  // const isAllClaimed = userInfo.dailyRewards[today];

  const handleDaySelection = (obj) => {
    if (obj.day === today && !userInfo.dailyRewards[obj.day]) {
      setSelectedDay(obj);
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
          {array.map((obj) => (
            <div
              key={obj.day}
              className={`daily-reward-item ${
                selectedDay && selectedDay.day === obj.day
                  ? "border-2 border-white"
                  : ""
              // } ${
                // userInfo.dailyRewards[obj.day]
                //   ? "claimed"
                //   : obj.day !== today
                //   ? "locked-day"
                //   : ""
              }
                `}
              onClick={() => {
                handleDaySelection(obj);
              }}
            >
              <div className="reward-day-circle">
                <Image
                  src={Coin}
                  className="reward-icon"
                  height={30}
                  width={30}
                />
                <p className="daily-reward-day">{obj.day}</p>
                <p className="daily-reward-amount">{obj.reward}</p>
              </div>
              {/* {userInfo.dailyRewards[obj.day] && (
                <FaCheckCircle className="daily-reward-checkmark" />
              )} */}
            </div>
          ))}
        </div>
        <button
          className="reward-modalaction-button"
          // disabled={isAllClaimed}
          onClick={() => {
            if (!selectedDay) return;
            setSelectedDay({});
            claimDailyReward(selectedDay.day, selectedDay.reward);
          }}
        >
          {/* {isAllClaimed ? "Come back tomorrow" : "Claim"} */}
        </button>
      </div>
    </div>
  );
};

export default DailyRewardsModal;
