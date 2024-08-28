import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    cardId: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true,
        default: 1
    },
    profitAmount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const unlockedCardsSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    cards: [cardSchema]
});

export const UnlockedCards = mongoose.models.unlockedCards || mongoose.model('unlockedCards', unlockedCardsSchema);