import React from "react";
import "./BuyConfirmationModal.css";

const BuyConfirmationModal = ({
  show,
  onClose,
  onConfirm,
  card,
  balaceSufficient,
  getCardById,
  isLoading,  // Receive isLoading prop
}) => {
  if (!show) return null;

  return (
    <>
      <div className="confirm-modal-overlay" onClick={onClose}></div>
      <div className="confirm-modal">
        <div className="confirm-modal-header">
          <span className="title">Confirm Purchase</span>
          <button className="close" onClick={onClose} disabled={isLoading}>
            &times;
          </button>
        </div>
        <div className="confirm-modal-body">
          <p>
            Are you sure you want to buy <strong>{card.title}</strong> for{" "}
            <strong>{getCardById(card.cardId).price}</strong> {card.reqUtil}?
          </p>
        </div>
        <div className="confirm-modal-footer">
          {balaceSufficient ? (
            <button className="confirm" onClick={onConfirm} disabled={isLoading}>
              {isLoading ? (
                <div className="button-spinner"></div>  // Spinner inside button
              ) : (
                "Confirm"
              )}
            </button>
          ) : (
            <button className=" bg-gray-500 text-white" disabled>
              Insufficient {card.reqUtil}
            </button>
          )}
          <button className="cancel" onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default BuyConfirmationModal;
