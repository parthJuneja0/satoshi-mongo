import mongoose from 'mongoose';

const FriendSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  referredBy: {
    userId: {
      type: String,
    },
    username: {
      type: String,
    },
  },
  referredTo: [
    {
      userId: {
        type: String,
      },
      username: {
        type: String,
      },
      claimed: {
        type: Boolean,
        default: false,
      }
    },
  ],
});

const Friends = mongoose.models.friends || mongoose.model('friends', FriendSchema);

export default Friends;
