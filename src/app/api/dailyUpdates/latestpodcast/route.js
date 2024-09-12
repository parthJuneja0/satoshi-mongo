// app/api/rewards/latestpodcast/reset/route.js
import { connectToDatabase } from '@/lib/db';
import { Rewards } from '@/lib/models/rewards';
import { NextResponse } from 'next/server';

// PUT request handler
export async function PUT(req) {
    try {
        await connectToDatabase();

        // Update latestpodcast to false for all users
        await Rewards.updateMany(
            { 'completedTasks.latestpodcast': { $ne: false } }, // Only update if it's not already false
            { $set: { 'completedTasks.latestpodcast': false } }
        );

        return NextResponse.json({
            message: `Successfully reset latestpodcast to false for users`,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
    }
}
