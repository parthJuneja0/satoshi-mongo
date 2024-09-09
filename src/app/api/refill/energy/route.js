import { User } from '@/lib/models/user';
import { NextResponse } from 'next/server';

export async function PUT(req) {
    try {

        const { telegramId, energyCount } = await req.json();

        if (!telegramId || energyCount === undefined) {
            return NextResponse.json({ error: 'Invalid request. Telegram ID and energyCount are required.' }, { status: 400 });
        }

        const updatedUser = await User.findOneAndUpdate(
            { telegramId },
            { currentEnergy: energyCount },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        return NextResponse.json({ message: 'Energy updated successfully.', user: updatedUser }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error.' }, { status: 500 });
    }
}
