import mongoose from "mongoose";

const DailyRewardsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", 
    required: true,
  },
  dailyRewards: {
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
    timestamp: { type: Date, default: null },
  },
  totalCoins: {
    type: Number,
    default: 0,
  },
});

const DailyRewards = mongoose.model("DailyRewards", DailyRewardsSchema);

module.exports = DailyRewards;
