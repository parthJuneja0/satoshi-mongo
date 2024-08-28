import { UnlockedCards } from "@/lib/models/unlockedcards";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { user } = await req.json();
    const predefinedCards = [
        { cardId: 'card1', level: 1, profitAmount: 100, price: 500 },
        { cardId: 'card2', level: 1, profitAmount: 200, price: 1000 },
        { cardId: 'card3', level: 1, profitAmount: 300, price: 1500 },
        { cardId: 'card4', level: 1, profitAmount: 400, price: 2000 },
        { cardId: 'card5', level: 1, profitAmount: 500, price: 2500 }
    ];
    try {
        const newDoc = await new UnlockedCards({ user, cards: predefinedCards });
        const savedDoc = await newDoc.save();
        return NextResponse.json({ doc: savedDoc });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create document' }, { status: 500 });
    }
}

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams
    const telegramId = await searchParams.get('id')
    try {
        if (telegramId) {
            let doc = await UnlockedCards.findOne({ user: telegramId });
            return NextResponse.json({ doc });
        }
        let allDocs = await UnlockedCards.find();
        return NextResponse.json({ allDocs });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}