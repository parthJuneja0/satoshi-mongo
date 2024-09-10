import { connectToDatabase } from '@/lib/db';
import { Friends } from '@/lib/models/friends';
import { User } from "@/lib/models/user";
import { NextResponse } from 'next/server';

export async function PUT(req) {
    await connectToDatabase();

    const { telegramId, userId, reward } = await req.json();

    try {
        const updatedFriends = await Friends.findOneAndUpdate(
            { user: telegramId, 'referredTo.userId': userId },
            { $set: { 'referredTo.$.claimed': true } },
            { new: true }
        );

        if (!updatedFriends) {
            return NextResponse.json({ message: 'Referal not found' }, { status: 404 });
        }

        const updatedUser = await User.findOneAndUpdate(
            { telegramId },
            { $inc: { coins: reward } },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ friends: updatedFriends, user: updatedUser });
    } catch (error) {
        return NextResponse.json({ message: 'An error occurred', error }, { status: 500 });
    }
}