import React, { useContext, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import "./Settings.css";
// import { userInfoContext } from "@/context/userInfoContext";

const Settings = ({ toggleSettings }) => {
  // const { createAccount } = useContext(userInfoContext);
  // const [hapticFeedback, setHapticFeedback] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleDeleteAccount = () => {
    // createAccount(null, 0);
    toggleSettings();
  };

  return (
    <div className="settings-container flex justify-center items-center min-h-screen">
      <div className="settings-content w-full max-w-xl p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-6 relative">
          <div className="back-button absolute left-[-16px] top-[-16px] p-4">
            <IoMdArrowBack
              className="text-white cursor-pointer hover:text-gray-400 transition-colors duration-300"
              size={24}
              onClick={toggleSettings}
            />
          </div>
          <h1 className="text-3xl text-center flex-1 gradient-text">
            Settings
          </h1>
        </div>

        <div className="settings-list mb-6">
          {/* <div className="settings-item flex justify-between items-center p-4 mb-4">
            <div>
              <h2 className="text-lg">Select language</h2>
              <p className="text-gray-400">language</p>
            </div>
            <div>
              <button className="settings-button">›</button>
            </div>
          </div> */}

          {/* <div className="settings-item flex justify-between items-center p-4 mb-4">
            <div>
              <h2 className="text-lg">Choose exchange</h2>
              <p className="text-gray-400">exchange</p>
            </div>
            <div>
              <button className="settings-button">›</button>
            </div>
          </div> */}

          <div
            className="settings-item delete-account flex justify-between items-center p-4 mb-4 cursor-pointer"
            onClick={toggleModal}
          >
            <div>
              <h2 className="text-lg">Delete account</h2>
            </div>
            <div>
              <button
                className="settings-button text-red-500"
                onClick={toggleModal}
              ></button>
            </div>
          </div>

          {/* <div className="settings-item flex justify-between items-center p-4 mb-4">
            <div>
              <h2 className="text-lg">Haptic Feedback</h2>
            </div>
            <div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={hapticFeedback}
                  onChange={() => setHapticFeedback(!hapticFeedback)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div> */}
        </div>
      </div>

      {showModal && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="modal-content bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl mb-4 text-white">Confirm Deletion</h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => {
                  handleDeleteAccount();
                }}
              >
                Delete
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                onClick={toggleModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
