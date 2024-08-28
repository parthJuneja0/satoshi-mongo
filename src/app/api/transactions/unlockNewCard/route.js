import { UnlockedCards } from "@/lib/models/unlockedcards";
import { NextResponse } from "next/server";

export async function PUT(req) {
    try {
        // const { telegramId, cardId, profitAmount, price, } = await req.json();
        const { telegramId, cards } = await req.json();
        const cardsDoc = await UnlockedCards.findOne({ user: telegramId });
        // console.log(cardsDoc.cards[cardId]);
        // if (!cardsDoc.cards[cardId]) {
        //     cardsDoc.cards[cardId] = {};
        // }
        // console.log(cardsDoc.cards[cardId]);

        // cardsDoc.cards[cardId] = { level: 1, profitAmount, price };
        cardsDoc.cards = cards;

        // console.log(cardsDoc.cards[cardId]);

        await cardsDoc.save()

        return NextResponse.json({ cards: "savedCardsDoc.cards" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}