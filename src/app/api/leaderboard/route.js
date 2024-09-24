import { connectToDatabase } from "@/lib/db";
import { User } from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function GET() {
    await connectToDatabase();

    try {
        const topPlayers = await User.find({})
            .sort({ yieldPerHour: -1 }) // Sort by yieldPerHour in descending order
            .limit(1000) // Limit to top 100 players
            .select("username yieldPerHour telegramId"); // Select fields you need

        return NextResponse.json({ topPlayers });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching leaderboard data' }, { status: 500 });
    }
}