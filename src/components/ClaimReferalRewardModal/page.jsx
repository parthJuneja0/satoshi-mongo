import React, { useContext } from "react";
import "../BuyConfirmationModal/BuyConfirmationModal.css";
// import { get, ref, update } from "firebase/database";
// import { realtimeDb } from "@/config/firebase";
// import { userInfoContext } from "@/context/userInfoContext";
// import { userDataContext } from "@/context/userDataContext";

const ClaimReferalRewardModal = () => {
  // const { userWebData } = useContext(userDataContext);
  // const { createAccount, referredBy, setIsReferred } =
  //   useContext(userInfoContext);

  const createReferralAccount = async () => {
    const friendRef = ref(
      realtimeDb,
      `/users/${userWebData.referalId}/friends`
    );

    const snapshot = await get(friendRef);
    let referredToData = snapshot.exists() ? snapshot.val().referredTo : {};

    referredToData = {
      ...referredToData,
      [userWebData.userId]: {
        claimed: false,
        name: userWebData.username,
        id: userWebData.userId,
      },
    };

    await update(friendRef, { referredTo: referredToData });

    createAccount(referredBy, 5000);
    setIsReferred(false);
  };

  return (
    <>
      <div className="confirm-modal-overlay"></div>
      <div className="confirm-modal">
        <div className="confirm-modal-header">
          <span className="title">Referal Bonus</span>
        </div>
        {/* {referredBy ? ( */}
          <div className="confirm-modal-body">
            <p>
              Congratulations! You have recieved 5000 by your referal of your
              friend {referredBy ? referredBy.name : ""}
            </p>
            <p>Click on confirm to initialize your account</p>
          </div>
        {/* ) : (
          <div>Invalid Referal Id</div>
        )} */}
        <div className="confirm-modal-footer">
          {referredBy ? (
            <button className="confirm" onClick={createReferralAccount}>
              Claim Reward
            </button>
          ) : (
            <button
              className="confirm"
              onClick={() => {
                createAccount(null, 0);
                setIsReferred(false);
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
