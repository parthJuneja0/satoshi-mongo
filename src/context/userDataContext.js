"use client"
import { createContext, useEffect, useState } from 'react';
import WebApp from "@twa-dev/sdk";
import QRCodeComponent from '../components/QRCodeComponent/QR';
import axios from 'axios';

export const userDataContext = createContext();

export const UserDataProvider = ({ children }) => {
    const [userWebData, setUserWebData] = useState();
    const [isMobile, setIsMobile] = useState(true);
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        setIsMobile(isMobileDevice());

        if (typeof window !== "undefined" && isMobile) {
            // Directly expand the WebApp
            if (WebApp && WebApp.expand) {
                WebApp.expand();
            } else {
                console.warn("WebApp is not available or expand function is not defined.");
            }

            if (WebApp.initDataUnsafe && WebApp.initDataUnsafe.user) {
                setUserWebData({
                    userId: WebApp.initDataUnsafe.user.id,
                    username: `${WebApp.initDataUnsafe.user.first_name} ${WebApp.initDataUnsafe.user.last_name}`,
                    userPic: WebApp.initDataUnsafe.user.photo_url,
                    premium: WebApp.initDataUnsafe.user.is_premium,
                    referalId: WebApp.initDataUnsafe.start_param
                });
            } else {
                setUserWebData({
                    userId: 100,
                    username: "Guest Account",
                    userPic: null,
                    premium: false,
                    referalId: null
                });
            }
        }
    }, [isMobile]);

    const createAccount = async () => {
        const response = await axios.post("/api/users", {
            telegramId: userWebData.userId
        });
        setUserInfo(response.data.user);
    }

    const getUserData = async () => {
        const response = await axios.get(`/api/users?id=${userWebData.userId}`);
        if (!response.data.user) {
            createAccount();
        } else {
            setUserInfo(response.data.user);
        }
    }

    useEffect(() => {
        if (!userWebData) return;
        getUserData();
    }, [userWebData]);

    // if (!isMobile) {
    //     return <QRCodeComponent />;
    // }

    return (
        <userDataContext.Provider value={{ userWebData, userInfo, setUserInfo }}>
            {children}
        </userDataContext.Provider>
    );
};

const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
};
