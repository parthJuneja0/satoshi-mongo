import { connectToDatabase } from "@/lib/db";
import { User } from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectToDatabase();

    const { telegramId, clickCount } = await req.json();

    try {
        const user = await User.findOneAndUpdate(
            { telegramId },
            {
                $inc: {
                    coins: clickCount,
                    currentEnergy: -clickCount,
                    lastOnline: Date.now()
                }
            },
            { new: true }
        );
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ user });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}