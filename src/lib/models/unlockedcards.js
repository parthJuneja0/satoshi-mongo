import mongoose from "mongoose";

// const unlockedCardsSchema = new mongoose.Schema({
//     user: {
//         type: String,
//         required: true,
//     },
//     cards: {
//         type: Object,
//         default: {
//             "001": { level: 1, profitAmount: 50, price: 1 },
//             "002": { level: 1, profitAmount: 100, price: 2 },
//             "003": { level: 1, profitAmount: 120, price: 1 },
//             "004": { level: 1, profitAmount: 70, price: 3 },
//             "005": { level: 1, profitAmount: 50, price: 2 },
//             "011": { level: 1, profitAmount: 200, price: 2 },
//             "012": { level: 1, profitAmount: 120, price: 3 },
//             "013": { level: 1, profitAmount: 180, price: 1 },
//             "014": { level: 1, profitAmount: 70, price: 1 },
//             "015": { level: 1, profitAmount: 100, price: 2 },
//             "021": { level: 1, profitAmount: 200, price: 1 },
//             "022": { level: 1, profitAmount: 220, price: 3 },
//             "023": { level: 1, profitAmount: 150, price: 3 },
//             "024": { level: 1, profitAmount: 180, price: 2 },
//             "025": { level: 1, profitAmount: 150, price: 1 },
//         }
//     }
// });

// export const UnlockedCards = mongoose.models.unlockedCards || mongoose.model('unlockedCards', unlockedCardsSchema);




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
        // ref: 'User',
        required: true
    },
    cards: [cardSchema]
});

// const UnlockedCards = mongoose.model('UnlockedCards', unlockedCardsSchema);
export const UnlockedCards = mongoose.models.unlockedCards || mongoose.model('unlockedCards', unlockedCardsSchema);

// Predefined cards
// const predefinedCards = [
//     { cardId: 'card1', level: 1, profitAmount: 100, price: 500 },
//     { cardId: 'card2', level: 1, profitAmount: 200, price: 1000 },
//     { cardId: 'card3', level: 1, profitAmount: 300, price: 1500 },
//     { cardId: 'card4', level: 1, profitAmount: 400, price: 2000 },
//     { cardId: 'card5', level: 1, profitAmount: 500, price: 2500 }
// ];

// // Save predefined cards if they don't exist
// const unlockedCards = await UnlockedCards.findOne({ 'user': "1" });
// predefinedCards.forEach(async (card) => {
//     // const exists = await UnlockedCards.findOne({ 'cards.cardId': card.cardId });
//     // if (!exists) {
//         const newCard = new UnlockedCards({
//             user: '1', // Replace with actual user ID
//             cards: [card]
//         });
//     //     await newCard.save();
//     // }

//     unlockedCards.cards.push(card);
// });
