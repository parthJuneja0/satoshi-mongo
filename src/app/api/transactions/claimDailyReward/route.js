import { Rewards } from '@/lib/models/rewards';
import { User } from "@/lib/models/user";
import { NextResponse } from 'next/server';

export async function PUT(req) {
    const { telegramId, dayNumber, reward } = await req.json();

    try {
        const updatedRewards = await Rewards.findOneAndUpdate(
            { user: telegramId },
            {
                $set: {
                    [`dailyRewards.rewards.day${dayNumber}`]: true,
                    'dailyRewards.lastClaimed.day': dayNumber,
                    'dailyRewards.lastClaimed.timestamp': Date.now(),
                },
            },
            { new: true }
        );

        if (!updatedRewards) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const updatedUser = await User.findOneAndUpdate(
            { telegramId },
            { $inc: { coins: reward } },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ rewards: updatedRewards, user: updatedUser });
    } catch (error) {
        return NextResponse.json({ message: 'An error occurred', error }, { status: 500 });
    }
}
