import { User } from "@/lib/models/user";
import { UnlockedCards } from "@/lib/models/unlockedcards";
import { NextResponse } from "next/server";

export async function PUT(req) {
    try {
        const { telegramId, cardId, utilToRemove, util, yieldPerHourToAdd, newProfitAmount, newPrice, } = await req.json();
        const user = await User.findOne({ telegramId });
        const cardsDoc = await UnlockedCards.findOne({ user: telegramId });
        const currentCard = cardsDoc.cards[cardId];
        user.utils[util] -= utilToRemove;
        user.yieldPerHour += yieldPerHourToAdd;
        currentCard.level += 1;
        currentCard.profitAmount = newProfitAmount;
        currentCard.price = newPrice;
        const savedUser = await user.save();
        const savedCardsDoc = await cardsDoc.save();
        return NextResponse.json({ user: savedUser, cards: savedCardsDoc.cards });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}