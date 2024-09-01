"use client"
import { createContext } from 'react';
import axios from 'axios';

export const transactionsContext = createContext();
export const TransactionsProvider = ({ children }) => {

    const shopPurchase = async (telegramId, coinsToRemove, utilToAdd, util) => {
        const response = await axios.put("/api/transactions/shopPurchase", {
            telegramId,
            coinsToRemove,
            utilToAdd,
            util,
        });
        return response.data.user;
    }

    const cardUpgrade = async (telegramId, cardId, utilToRemove, util, yieldPerHourToAdd, newProfitAmount, newPrice,) => {
        const response = await axios.patch("/api/transactions/cardUpgrade", {
            telegramId,
            cardId,
            utilToRemove,
            util,
            yieldPerHourToAdd,
            newProfitAmount,
            newPrice,
        });
        return response.data;
    }

    const unlockNewCards = async (telegramId, newCards) => {
        const response = await axios.patch("/api/transactions/unlockNewCards", {
            telegramId,
            newCards
        });
        return response.data.cards;
    }

    const completeTask = async (telegramId, task, reward) => {
        const response = await axios.put("/api/transactions/completeTask", {
            telegramId,
            task,
            reward
        });
        return response.data;
    }

    const claimDailyReward = async (telegramId, dayNumber, reward) => {
        const response = await axios.put("/api/transactions/claimDailyReward", {
            telegramId,
            dayNumber,
            reward
        });
        return response.data;
    }

    const claimReferalReward = async (telegramId, userId, reward) => {
        const response = await axios.put("/api/transactions/claimReferalReward", {
            telegramId,
            userId,
            reward
        });
        return response.data;
    }

    return (
        <transactionsContext.Provider value={{ shopPurchase, cardUpgrade, unlockNewCards, completeTask, claimDailyReward, claimReferalReward }}>
            {children}
        </transactionsContext.Provider>
    );
};