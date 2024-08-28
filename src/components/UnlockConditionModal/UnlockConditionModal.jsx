import React from "react";
import "./UnlockConditionModal.css";

const UnlockConditionModal = ({ show, onClose, card }) => {
  if (!show) return null;

  const unlockConditions = {
    Guava: "Unlock Buffalo",
    Buffalo: "Unlock Shovel",
    Shovel: "Reach Orange level 3",
    Goose: "Unlock Wheel Barrow",
    "Wheel Barrow": "Unlock Jackfruit",
    Jackfruit: "Reach Sickle level 3",
    Tractor: "Unlock Teak",
    Teak: "Unlock Sheep",
    Sheep: "Reach Goat level 3",
    Peach: "Reach Apple level 3",
    Vegi: "Reach Pear level 3",
    Donkey: "Reach Hen level 3",
    Rabbit: "Reach Cow level 3",
    Feeder: "Reach Trowel level 3",
    Seeder: "Reach Sprayer level 3",
  };

  return (
    <>
      <div className="unlock-modal-overlay" onClick={onClose}></div>
      <div className="unlock-modal">
        <div className="unlock-modal-header">
          <span className="title">Unlock Condition</span>
          <button className="close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="unlock-modal-body">
          <p>{unlockConditions[card.title]}</p>
        </div>
        <div className="unlock-modal-footer">
          <button className="close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default UnlockConditionModal;
