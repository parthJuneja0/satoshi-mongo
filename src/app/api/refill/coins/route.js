import { User } from '@/lib/models/user';
import { NextResponse } from 'next/server';

export async function PUT(req) {
    try {

        const { telegramId, coinCount } = await req.json();

        if (!telegramId || coinCount === undefined) {
            return NextResponse.json({ error: 'Invalid request. Telegram ID and coinCount are required.' }, { status: 400 });
        }

        const updatedUser = await User.findOneAndUpdate(
            { telegramId },
            { coins: coinCount, lastOnline: Date.now() },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: 'User not found' });
        }

        return NextResponse.json({ message: 'Energy updated successfully.', user: updatedUser }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error.' }, { status: 500 });
    }
}
