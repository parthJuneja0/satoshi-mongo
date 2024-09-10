import { connectToDatabase } from '@/lib/db';
import { Rewards } from '@/lib/models/rewards';
import { NextResponse } from 'next/server';

export async function PUT(req) {
    await connectToDatabase();

    const { telegramId } = await req.json();

    try {
        const updatedRewards = await Rewards.findOneAndUpdate(
            { user: telegramId },
            {
                $set: {
                    'dailyRewards.rewards.day1': false,
                    'dailyRewards.rewards.day2': false,
                    'dailyRewards.rewards.day3': false,
                    'dailyRewards.rewards.day4': false,
                    'dailyRewards.rewards.day5': false,
                    'dailyRewards.rewards.day6': false,
                    'dailyRewards.rewards.day7': false,
                },
            },
            { new: true }
        );

        if (!updatedRewards) {
            return NextResponse.json({ message: 'Rewards not found' }, { status: 404 });
        }

        return NextResponse.json({ rewards: updatedRewards });
    } catch (error) {
        return NextResponse.json({ message: 'An error occurred', error }, { status: 500 });
    }
}
