"use client";
import { createContext, useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import QRCodeComponent from "../components/QRCodeComponent/QR";
import axios from "axios";

export const userDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userWebData, setUserWebData] = useState();
  const [isMobile, setIsMobile] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [unlockedCards, setUnlockedCards] = useState();
  const [userRewards, setUserRewards] = useState();
  const [friends, setFriends] = useState();
  const [isReferred, setIsReferred] = useState();
  const [referredBy, setReferredBy] = useState();

  useEffect(() => {
    setIsMobile(isMobileDevice());

    if (typeof window !== "undefined" && isMobile) {
      // Directly expand the WebApp
      if (WebApp && WebApp.expand) {
        WebApp.expand();
      } else {
        console.warn(
          "WebApp is not available or expand function is not defined."
        );
      }

      if (WebApp.initDataUnsafe && WebApp.initDataUnsafe.user) {
        setUserWebData({
          userId: WebApp.initDataUnsafe.user.id,
          username: `${WebApp.initDataUnsafe.user.first_name} ${WebApp.initDataUnsafe.user.last_name}`,
          userPic: WebApp.initDataUnsafe.user.photo_url,
          premium: WebApp.initDataUnsafe.user.is_premium,
          referalId: WebApp.initDataUnsafe.start_param,
        });
      } else {
        setUserWebData({
          userId: 1,
          username: "Guest Account",
          userPic: null,
          premium: false,
          referalId: null,
        });
      }
    }
  }, [isMobile]);

  const createAccount = async () => {
    const response = await axios.post("/api", {
      telegramId: userWebData.userId,
      username: userWebData.username,
      coins: referredBy ? 5000 : 0,
      referredBy,
    });
    //
    setUserInfo(response.data.user);
    setUnlockedCards(response.data.unlockedCards);
    setUserRewards(response.data.rewards);
    setFriends(response.data.friends);
    setIsReferred(false);
  };

  const findReferredBy = async (referalId) => {
    const response = await axios.get(
      `/api/transactions/findReferalUser?id=${referalId}`
    );
    if (response.data.referredBy) setReferredBy(response.data.referredBy);
    else setReferredBy(null);
  };

  const getUserData = async (referalId) => {
    const response = await axios.get(`/api?id=${userWebData.userId}`);
    if (!response.data.user) {
      if (!referalId) createAccount(null);
      else {
        await findReferredBy(referalId);
        setIsReferred(true);
      }
    } else {
      // Toggle hasClaimed
      const userData = await axios.put("/api/sync/toggleHasClaimed", {
        telegramId: userWebData.userId,
      });
      setUserInfo(userData.data.user);
      setUnlockedCards(response.data.unlockedCards);
      setUserRewards(response.data.rewards);
      setFriends(response.data.friends);
    }
  };

  useEffect(() => {
    if (!userWebData) return;
    if (userWebData.referalId) getUserData(userWebData.referalId);
    else getUserData(null);
  }, [userWebData]);

  const resetAccount = async () => {
    await axios.delete(`/api?id=${userWebData.userId}`);
    setUserInfo(null);
    setUnlockedCards([]);
    setUserRewards({});
    setFriends({});
  };

  if (!isMobile) {
    return <QRCodeComponent />;
  }

  return (
    <userDataContext.Provider
      value={{
        userWebData,
        isReferred,
        setIsReferred,
        referredBy,
        setReferredBy,
        userInfo,
        setUserInfo,
        unlockedCards,
        setUnlockedCards,
        userRewards,
        setUserRewards,
        friends,
        setFriends,
        createAccount,
        resetAccount,
      }}
    >
      {children}
    </userDataContext.Provider>
  );
};

const isMobileDevice = () => {
  return /Mobi|Android/i.test(navigator.userAgent);
};
