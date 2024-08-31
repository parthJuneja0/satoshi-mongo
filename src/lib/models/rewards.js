import mongoose from 'mongoose';

const DailyRewardsSchema = new mongoose.Schema({
  rewards: {
    day1: { type: Boolean, default: false },
    day2: { type: Boolean, default: false },
    day3: { type: Boolean, default: false },
    day4: { type: Boolean, default: false },
    day5: { type: Boolean, default: false },
    day6: { type: Boolean, default: false },
    day7: { type: Boolean, default: false },
  },
  lastClaimed: {
    day: { type: Number, default: 0 },
    timestamp: { type: Number, default: () => Date.now() },
  },
});

const RewardsSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  completedTasks: {
    youtube: { type: Boolean, default: false },
    telegram: { type: Boolean, default: false },
    twitter: { type: Boolean, default: false },
    satoshiTV: { type: Boolean, default: false },
  },
  dailyRewards: DailyRewardsSchema,
});

export const Rewards = mongoose.models.rewards || mongoose.model('rewards', RewardsSchema);