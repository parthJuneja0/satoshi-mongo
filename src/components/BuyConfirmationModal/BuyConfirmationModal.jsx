import React, { useContext } from "react";
import "./BuyConfirmationModal.css";
import { cardsContext } from "@/context/cardsContext";

const BuyConfirmationModal = ({
  show,
  onClose,
  onConfirm,
  card,
  balaceSufficient,
}) => {
  const { unlockedCards } = useContext(cardsContext);
  if (!show) return null;

  return (
    <>
      <div className="confirm-modal-overlay" onClick={onClose}></div>
      <div className="confirm-modal">
        <div className="confirm-modal-header">
          <span className="title">Confirm Purchase</span>
          <button className="close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="confirm-modal-body">
          <p>
            Are you sure you want to buy <strong>{card.title}</strong> for{" "}
            <strong>{unlockedCards[card.cardId].price}</strong> {card.reqUtil}?
          </p>
        </div>
        <div className="confirm-modal-footer">
          {balaceSufficient ? (
            <button className="confirm" onClick={onConfirm}>
              Confirm
            </button>
          ) : (
            <button className=" bg-gray-500 text-white">
              Insuffcient {card.reqUtil}
            </button>
          )}
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default BuyConfirmationModal;
