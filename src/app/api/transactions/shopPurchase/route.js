import { connectToDatabase } from "@/lib/db";
import { User } from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function PUT(req) {
    await connectToDatabase();

    try {
        const { telegramId, coinsToRemove, utilToAdd, util } = await req.json();
        const user = await User.findOne({ telegramId });
        user.coins = Math.floor(user.coins) - coinsToRemove;
        user.utils[util] += utilToAdd;
        const savedUser = await user.save();
        return NextResponse.json({ user: savedUser });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}