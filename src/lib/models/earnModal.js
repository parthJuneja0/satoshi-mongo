import mongoose from 'mongoose';

const EarnSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', 
    required: true,
  },
  completedTasks: {
    youtube: { type: Boolean, default: false },
    telegram: { type: Boolean, default: false },
    twitter: { type: Boolean, default: false },
    satoshiTV: { type: Boolean, default: false },
  },
  coins: {
    type: Number,
    default: 0,
  },
});

const Earn = mongoose.model('Earn', EarnSchema);

module.exports = Earn;
