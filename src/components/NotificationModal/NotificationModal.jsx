// NotificationModal.js
import React from "react";
import "./NotificationModal.css"; // Add necessary CSS for styling

const NotificationModal = ({ message, timestamp, closeModal }) => {
  return (
    <>
      <div className="notification-modal-overlay" onClick={closeModal}></div>
      <div className="notification-modal">
        <div className="notification-modal-header">
          <span className="title">Notification</span>
          <button className="close" onClick={closeModal}>
            &times;
          </button>
        </div>
        <div className="notification-modal-body">
          <p>{message}</p>

        </div>
        <div className="notification-modal-footer">
          <button className="confirm" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationModal;
