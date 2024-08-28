import { NextResponse } from 'next/server';
import { User } from '@/lib/models/user';

// // Api handler to create new user
export async function POST(req) {
    const { telegramId } = await req.json();
    try {
        const newUser = await new User({ telegramId });
        const savedUser = await newUser.save();
        return NextResponse.json({ user: savedUser });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}

// Api handler to get all users or a specific user
export async function GET(req) {
    const searchParams = req.nextUrl.searchParams
    const telegramId = await searchParams.get('id')
    try {
        if (telegramId) {
            let user = await User.findOne({ telegramId });
            return NextResponse.json({ user });
        }
        const allUsers = await User.find();
        return NextResponse.json({ users: allUsers });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}
