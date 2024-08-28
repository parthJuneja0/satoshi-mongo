import { UnlockedCards } from "@/lib/models/unlockedcards";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { user } = await req.json();
    const predefinedCards = [
        { cardId: "001", level: 1, profitAmount: 50, price: 1 },
        { cardId: "002", level: 1, profitAmount: 100, price: 2 },
        { cardId: "003", level: 1, profitAmount: 120, price: 1 },
        { cardId: "004", level: 1, profitAmount: 70, price: 3 },
        { cardId: "005", level: 1, profitAmount: 50, price: 2 },
        { cardId: "011", level: 1, profitAmount: 200, price: 2 },
        { cardId: "012", level: 1, profitAmount: 120, price: 3 },
        { cardId: "013", level: 1, profitAmount: 180, price: 1 },
        { cardId: "014", level: 1, profitAmount: 70, price: 1 },
        { cardId: "015", level: 1, profitAmount: 100, price: 2 },
        { cardId: "021", level: 1, profitAmount: 200, price: 1 },
        { cardId: "022", level: 1, profitAmount: 220, price: 3 },
        { cardId: "023", level: 1, profitAmount: 150, price: 3 },
        { cardId: "024", level: 1, profitAmount: 180, price: 2 },
        { cardId: "025", level: 1, profitAmount: 150, price: 1 },
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