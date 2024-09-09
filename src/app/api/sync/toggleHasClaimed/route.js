import { User } from '@/lib/models/user';
import { NextResponse } from 'next/server';

export async function PUT(req) {
    try {
        const { telegramId } = await req.json();

        if (!telegramId) {
            return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
        }

        // Find the user and get the current value of hasClaimed
        const user = await User.findOne({ telegramId });

        if (!user) {
            return NextResponse.json({ error: 'User not found.' }, { status: 404 });
        }

        // Toggle the value of hasClaimed
        const newHasClaimed = !user.lastSession.hasClaimed;

        // Update the user with the new value
        const updatedUser = await User.findOneAndUpdate(
            { telegramId },
            {
                $set: {
                    'lastSession.hasClaimed': newHasClaimed
                }
            },
            { new: true }
        );

        return NextResponse.json({ message: 'User has toggled the hasClaimed status.', user: updatedUser }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
