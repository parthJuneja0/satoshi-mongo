// app/api/rewards/satoshiTV/reset/route.js
import { connectToDatabase } from '@/lib/db';
import { Rewards } from '@/lib/models/rewards';
import { NextResponse } from 'next/server';

// PUT request handler
export async function PUT() {
    try {
        await connectToDatabase();

        // Update satoshiTV to false for all users
        await Rewards.updateMany(
            { 'completedTasks.satoshiTV': { $ne: false } }, // Only update if it's not already false
            { $set: { 'completedTasks.satoshiTV': false } }
        );

        return NextResponse.json({
            message: `Successfully reset satoshiTV to false for users`,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
    }
}