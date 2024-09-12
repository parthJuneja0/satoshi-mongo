import React, { useContext } from "react";
import "../BuyConfirmationModal/BuyConfirmationModal.css";
import { userDataContext } from "@/context/userDataContext";

const ClaimReferalRewardModal = () => {
  const {
    createAccount,
    referredBy,
    setIsReferred,
    setReferredBy,
  } = useContext(userDataContext);

  return (
    <>
      <div className="confirm-modal-overlay"></div>
      <div className="confirm-modal">
        <div className="confirm-modal-header">
          <span className="title">Referal Bonus</span>
        </div>
        {referredBy ? (
          <div className="confirm-modal-body">
            <p>
              Congratulations! You have recieved 10000 coins by referal of your
              friend {referredBy.username}
            </p>
            <p>Click on confirm to create your account</p>
          </div>
        ) : (
          <div className="confirm-modal-body">
            User with this Referal Id do not exist
          </div>
        )}
        <div className="confirm-modal-footer">
          {referredBy ? (
            <button
              className="confirm"
              onClick={() => {
                createAccount();
                setIsReferred(false);
                setReferredBy(null);
              }}
            >
              Claim Reward
            </button>
          ) : (
            <button
              className="confirm"
              onClick={() => {
                createAccount();
                setIsReferred(false);
                setReferredBy(null);
              }}
            >
              Continue without referalId
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ClaimReferalRewardModal;
