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

    const unlockNewCard = async (telegramId, cardId, profitAmount, price) => {
        const response = await axios.patch("/api/transactions/unlockNewCard", {
            user: telegramId,
            cardId,
            profitAmount,
            price,
        });
        return response.data.cards;
    }

    return (
        <transactionsContext.Provider value={{ shopPurchase, cardUpgrade, unlockNewCard }}>
            {children}
        </transactionsContext.Provider>
    );
};