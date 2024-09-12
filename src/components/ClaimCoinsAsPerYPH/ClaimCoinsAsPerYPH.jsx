import React, { useContext } from "react";
import "../BuyConfirmationModal/BuyConfirmationModal.css";
import { userDataContext } from "@/context/userDataContext";
import { syncContext } from "@/context/syncContext";

const ClaimCoinsAsPerYPH = ({ coinProfit, setIsClaimAvailable }) => {
  const { userInfo, setUserInfo } = useContext(userDataContext);
  const { addCoins } = useContext(syncContext);

  const grantReward = async () => {
    const response = await addCoins(userInfo.telegramId, coinProfit);
    setUserInfo(response);
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
          <span className="title">Thankyou Satoshi</span>
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
