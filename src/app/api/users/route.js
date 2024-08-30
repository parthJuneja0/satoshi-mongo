// pages/api/users.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { User } from '@/lib/models/user';

// POST: Create a new user
export async function POST(req) {
  await dbConnect();
  const { telegramId } = await req.json();
  try {
    const newUser = new User({ telegramId });
    const savedUser = await newUser.save();
    return NextResponse.json({ user: savedUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

export async function GET(req) {
  await dbConnect();
  const searchParams = req.nextUrl.searchParams;
  const telegramId = searchParams.get('id');
  try {
    if (telegramId) {
      const user = await User.findOne({ telegramId });
      return NextResponse.json({ user });
    }
    const allUsers = await User.find();
    return NextResponse.json({ users: allUsers });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
