"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import { userDataContext } from './userDataContext';
import axios from 'axios';
export const cardsContext = createContext();

export const CardsProvider = ({ children }) => {
    const [unlockedCards, setUnlockedCards] = useState()
    const { userWebData } = useContext(userDataContext);

    const createUserCards = async () => {
        const response = await axios.post("/api/unlockedCards", {
            user: userWebData.userId
        });
        setUnlockedCards(response.data.doc.cards);
    }

    const getUnlockedCards = async () => {
        const response = await axios.get(`/api/unlockedCards?id=${userWebData.userId}`);
        if (!response.data.doc) {
            createUserCards();
        } else {
            setUnlockedCards(response.data.doc.cards);
        }
    }

    useEffect(() => {
        if (!userWebData) return;
        getUnlockedCards();
    }, [userWebData]);

    return (
        <cardsContext.Provider value={{ unlockedCards, setUnlockedCards }}>
            {children}
        </cardsContext.Provider>
    );
};