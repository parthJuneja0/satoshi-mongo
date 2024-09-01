import { User } from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams
    const referalId = await searchParams.get('id')
    try {
        const referalUser = await User.findOne({ telegramId: referalId });

        if (!referalUser) {
            return NextResponse.json({ message: 'Referal user not found' }, { status: 200 });
        }

        const referredBy = {
            userId: referalUser.telegramId,
            username: referalUser.username
        }
        return NextResponse.json({ referredBy });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Failed to find referal user' }, { status: 500 });
    }
}