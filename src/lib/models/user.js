import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    telegramId: {
        type: String,
        required: true,
    },
    coins: {
        type: Number,
        default: 0
    },
    currentEnergy: {
        type: Number,
        default: 1500
    },
    totalEnergy: {
        type: Number,
        default: 1500
    },
    pointsToAdd: {
        type: Number,
        default: 1
    },
    yieldPerHour: {
        type: Number,
        default: 0
    },
    utils: {
        food: {
            type: Number,
            default: 0
        },
        fertilizer: {
            type: Number,
            default: 0
        },
        oil: {
            type: Number,
            default: 0
        }
    }
});

export const User = mongoose.models.users || mongoose.model('users', userSchema);