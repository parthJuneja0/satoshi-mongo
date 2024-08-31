import { Rewards } from "@/lib/models/rewards";
import { User } from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function PUT(req) {
    const { telegramId, task, reward } = await req.json();

    if (!['youtube', 'telegram', 'twitter', 'satoshiTV'].includes(task)) {
        return NextResponse.json({ message: 'Invalid task name' }, { status: 400 });
    }

    try {
        const updatedRewards = await Rewards.findOneAndUpdate(
            { user: telegramId },
            { $set: { [`completedTasks.${task}`]: true } },
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