import Friends from "@/lib/models/friends";
import { Rewards } from "@/lib/models/rewards";
import { UnlockedCards } from "@/lib/models/unlockedcards";
import { User } from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams
    const telegramId = await searchParams.get('id')
    try {
        if (!telegramId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        let user = await User.findOne({ telegramId });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 200 });
        }

        let unlockedCards = await UnlockedCards.findOne({ user: telegramId });
        let rewards = await Rewards.findOne({ user: telegramId });
        let friends = await Friends.findOne({ user: telegramId });

        return NextResponse.json({ user, unlockedCards: unlockedCards.cards, rewards, friends });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { telegramId } = await req.json();

        if (!telegramId) {
            return NextResponse.json({ error: 'Telegram ID is required' }, { status: 400 });
        }

        // Create the User document
        let user = await User.create({ telegramId });

        // Create the related documents
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
        let unlockedCards = await UnlockedCards.create({ user: telegramId, cards: predefinedCards });

        let rewards = await Rewards.create({
            user: telegramId, dailyRewards: {
                rewards: {},
                lastClaimed: {}
            }
        });

        let friends = await Friends.create({ user: telegramId });

        return NextResponse.json({ user, unlockedCards, rewards, friends }, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to create user and related documents' }, { status: 500 });
    }
}