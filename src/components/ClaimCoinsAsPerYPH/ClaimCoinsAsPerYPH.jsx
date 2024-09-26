import React, { useContext, useState } from "react";
import "../BuyConfirmationModal/BuyConfirmationModal.css";
import { userDataContext } from "@/context/userDataContext";
import { syncContext } from "@/context/syncContext";
import {ClipLoader} from "react-spinners";
const ClaimCoinsAsPerYPH = ({ coinProfit, setIsClaimAvailable }) => {
  const { userInfo, setUserInfo } = useContext(userDataContext);
  const { addCoins } = useContext(syncContext);
  const [loading, setLoading] = useState(false); 

  const grantReward = async () => {
    setLoading(true); 
    try {
      const response = await addCoins(userInfo.telegramId, coinProfit);
      setUserInfo(response);
      setIsClaimAvailable(false);
    } catch (error) {
      console.error("Error while claiming coins:", error);
    } finally {
      setLoading(false);
    }
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
          <span className="title">Thank you, Satoshi</span>
        </div>
        <div className="confirm-modal-body">
          <p>
            Congratulations! You have received {formatNumberWithK(coinProfit)} coins
          </p>
        </div>
        <div className="confirm-modal-footer">
          <button
            className="confirm"
            onClick={grantReward}
            disabled={loading} 
          >
            {loading ? (
              <ClipLoader color="#ffffff" size={18} /> // Loading spinner
            ) : (
              "Claim"
            )}
          </button>
          <button className="cancel">Cancel</button>
        </div>
      </div>
    </>
  );
};

export default ClaimCoinsAsPerYPH;
