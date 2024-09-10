import { connectToDatabase } from '@/lib/db';
import { User } from '@/lib/models/user';
import { NextResponse } from 'next/server';

export async function PUT(req) {
    await connectToDatabase();

    try {
        const { telegramId, energyProfit } = await req.json();

        if (!telegramId || energyProfit === undefined) {
            return NextResponse.json({ error: 'Invalid request. Telegram ID and energyProfit are required.' }, { status: 400 });
        }

        const user = await User.findOneAndUpdate(
            { telegramId },
            [
                {
                    $set: {
                        currentEnergy: {
                            $min: [{ $add: ['$currentEnergy', energyProfit] }, '$totalEnergy']
                        }
                    }
                }
            ],
            { new: true }  // This returns the updated document
        );

        if (!user) {
            return NextResponse.json({ error: 'User not found.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Energy updated successfully.', user }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error.' }, { status: 500 });
    }
}
