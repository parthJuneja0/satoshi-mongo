import { User } from '@/lib/models/user';
import { NextResponse } from 'next/server';

export async function PUT(req) {
    try {

        const { telegramId } = await req.json();

        if (!telegramId) {
            return NextResponse.json({ error: 'Invalid request. Telegram ID is required.' }, { status: 400 });
        }

        const user = await User.findOneAndUpdate(
            { telegramId },
            { $set: { 'lastSession.hasClaimed': true } },
            { new: true }
        );

        if (!user) {
            return NextResponse.json({ error: 'User not found.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Claim status updated successfully.' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error.' }, { status: 500 });
    }
}
