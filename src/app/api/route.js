import { Friends } from "@/lib/models/friends";
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
        const { telegramId, username, referredBy } = await req.json();

        if (!telegramId) {
            return NextResponse.json({ error: 'Telegram ID is required' }, { status: 400 });
        }

        // Create the User document
        let user = await User.create({ telegramId, username, coins: referredBy ? 5000 : 0 });
        console.log("User created")

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
        console.log("Cards created")

        let rewards = await Rewards.create({
            user: telegramId, dailyRewards: {
                rewards: {},
                lastClaimed: {}
            }
        });
        console.log("Rewards created")

        let friends;
        if (referredBy) {
            await Friends.findOneAndUpdate(
                { user: referredBy.userId },
                {
                    $push: {
                        referredTo: {
                            userId: telegramId,
                            username,
                            claimed: false
                        }
                    }
                },
                { new: true }
            )
            friends = await Friends.create({ user: telegramId, referredBy });
            console.log(`Friends created and Referal added to ${referredBy.userId}`)
        }
        else {
            friends = await Friends.create({ user: telegramId });
            console.log(`Friends created`)
        }

        return NextResponse.json({ user, unlockedCards, rewards, friends }, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to create user and related documents' }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const searchParams = req.nextUrl.searchParams
        const telegramId = await searchParams.get('id')

        if (!telegramId) {
            return NextResponse.json({ error: 'Telegram ID is required' }, { status: 400 });
        }

        await User.findOneAndDelete({ telegramId });
        console.log("User deleted")
        await UnlockedCards.findOneAndDelete({ user: telegramId });
        console.log("Cards deleted")
        await Rewards.findOneAndDelete({ user: telegramId });
        console.log("Rewards deleted")
        await Friends.findOneAndDelete({ user: telegramId });
        console.log("Friends deleted")

        return NextResponse.json({ message: 'User deleted successfully' });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to delete user and related documents' }, { status: 500 });
    }
}