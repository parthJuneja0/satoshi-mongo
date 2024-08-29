import { UnlockedCards } from "@/lib/models/unlockedcards";
import { NextResponse } from "next/server";

export async function PATCH(req) {
    const { user, newCards } = await req.json();

    try {
        const updatedDoc = await UnlockedCards.findOneAndUpdate(
            { user },
            { $push: { cards: { $each: newCards } } },
            { new: true }
        );

        if (!updatedDoc) {
            return NextResponse.json({ error: 'Document not found' }, { status: 404 });
        }

        return NextResponse.json({ cards: updatedDoc.cards });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update document' }, { status: 500 });
    }
}