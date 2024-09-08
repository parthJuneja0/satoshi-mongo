import { User } from '@/lib/models/user';
import { NextResponse } from 'next/server';

export async function PUT(req) {
    try {

        const { telegramId, coinProfit } = await req.json();

        if (!telegramId || coinProfit === undefined) {
            return NextResponse.json({ error: 'Invalid request. Telegram ID and coinProfit are required.' }, { status: 400 });
        }

        const user = await User.findOneAndUpdate(
            { telegramId },
            [
                {
                    $set: {
                        coins: {
                            $max: [{ $add: ['$coins', coinProfit] }, 0]
                        },
                        'lastSession.hasClaimed': true
                    }
                }
            ],
            { new: true }
        );

        if (!user) {
            return NextResponse.json({ error: 'User not found.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Coins updated successfully.', user }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error.' }, { status: 500 });
    }
}
