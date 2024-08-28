import { User } from "@/lib/models/user";
import { UnlockedCards } from "@/lib/models/unlockedcards";
import { NextResponse } from "next/server";

export async function PATCH(req) {
    try {
        const { telegramId, cardId, utilToRemove, util, yieldPerHourToAdd, newProfitAmount, newPrice } = await req.json();
        const user = await User.findOne({ telegramId });
        user.utils[util] -= utilToRemove;
        user.yieldPerHour += yieldPerHourToAdd;
        const savedUser = await user.save();
        const updatedDoc = await UnlockedCards.findOneAndUpdate(
            { user: telegramId, "cards.cardId": cardId },
            {
                $inc: { "cards.$.level": 1 },
                $set: { "cards.$.profitAmount": newProfitAmount, "cards.$.price": newPrice }
            },
            { new: true }
        );
        const savedCardsDoc = await updatedDoc.save();
        return NextResponse.json({ user: savedUser, cards: savedCardsDoc.cards });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}