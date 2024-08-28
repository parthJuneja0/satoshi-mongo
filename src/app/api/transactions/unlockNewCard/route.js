import { UnlockedCards } from "@/lib/models/unlockedcards";
import { NextResponse } from "next/server";

export async function PATCH(req) {
    const { user, cardId, profitAmount, price } = await req.json();

    const newCard = {
        cardId,
        level: 1,
        profitAmount,
        price
    };

    try {
        const updatedDoc = await UnlockedCards.findOneAndUpdate(
            { user },
            { $push: { cards: newCard } },
            { new: true }
        );

        if (!updatedDoc) {
            return NextResponse.json({ error: 'Document not found' }, { status: 404 });
        }

        return NextResponse.json({ doc: updatedDoc });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update document' }, { status: 500 });
    }
}