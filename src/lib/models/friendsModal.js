import mongoose from 'mongoose';

const FriendSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', 
    required: true,
  },
  referredBy: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users', 
    },
    name: {
      type: String,
    },
  },
  referredTo: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', 
      },
      name: {
        type: String,
      },
      claimed: {
        type: Boolean,
        default: false,
      },
      dateReferred: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Friend = mongoose.model('Friend', FriendSchema);

export default Friend;
