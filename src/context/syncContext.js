"use client"
import { createContext } from 'react';
import axios from 'axios';

export const syncContext = createContext();
export const SyncProvider = ({ children }) => {

    const addCurrentEnergy = async (telegramId, energyProfit) => {
        const response = await axios.put("/api/sync/energy", {
            telegramId,
            energyProfit,
        });
        return response.data.user;
    }

    const toggleHasClaimed = async (telegramId) => {
        const response = await axios.put("/api/sync/toggleHasClaimed", {
            telegramId,
        });
        return response.data.user;
    }

    const addCoins = async (telegramId, coinProfit) => {
        const response = await axios.put("/api/sync/coins", {
            telegramId,
            coinProfit
        });
        return response.data.user;
    }

    return (
        <syncContext.Provider value={{ addCurrentEnergy, toggleHasClaimed, addCoins }}>
            {children}
        </syncContext.Provider>
    );
};