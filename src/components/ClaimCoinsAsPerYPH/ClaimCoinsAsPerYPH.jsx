import React, { useContext } from "react";
import "../BuyConfirmationModal/BuyConfirmationModal.css";
// import { userDataContext } from "@/context/userDataContext";
// import { userInfoContext } from "@/context/userInfoContext";
// import { ref, update } from "firebase/database";
// import { realtimeDb } from "@/config/firebase";

const ClaimCoinsAsPerYPH = ({
  coinProfit,
  setIsClaimAvailable,
  setCoinProfit,
}) => {
  // const { userWebData } = useContext(userDataContext);
  // const { userInfo } = useContext(userInfoContext);

  const grantReward = () => {
    update(ref(realtimeDb, `/users/${userWebData.userId}`), {
      coins: userInfo.coins + coinProfit,
      lastSession: {
        ...userInfo.lastSession,
        hasClaimed: true,
      },
    });
    setCoinProfit(0);
    setIsClaimAvailable(false);
  };

  function formatNumberWithK(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    } else {
      return num;
    }
  }

  return (
    <>
      <div className="confirm-modal-overlay"></div>
      <div className="confirm-modal">
        <div className="confirm-modal-header">
          <span className="title">Thank You Binance</span>
        </div>
        <div className="confirm-modal-body">
          <p>
            Congratulations! You have recieved {formatNumberWithK(coinProfit)}{" "}
            coins
          </p>
        </div>
        <div className="confirm-modal-footer">
          <button
            className="confirm"
            onClick={() => {
              grantReward();
            }}
          >
            Claim
          </button>
        </div>
      </div>
    </>
  );
};

export default ClaimCoinsAsPerYPH;
