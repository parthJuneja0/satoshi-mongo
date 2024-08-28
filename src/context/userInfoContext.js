// import { realtimeDb } from '@/config/firebase';
// import { get, onDisconnect, onValue, ref, serverTimestamp, set, update } from 'firebase/database';
// import { createContext, useContext, useEffect, useState } from 'react';
// import { userDataContext } from './userDataContext';
// export const userInfoContext = createContext();

// export const UserInfoProvider = ({ children }) => {
//     const [userInfo, setUserInfo] = useState();
//     const [isReferred, setIsReferred] = useState(false);
//     const [referredBy, setReferredBy] = useState();

//     const { userWebData } = useContext(userDataContext);

//     useEffect(() => {
//         if (!userWebData) return;
//         fetchUserDetails();
//     }, [userWebData])

//     const fetchUserDetails = async () => {
//         onValue(ref(realtimeDb, `/users/${userWebData.userId}`), (snapshot) => {
//             if (snapshot.exists()) {
//                 setUserInfo(snapshot.val());
//             } else {
//                 if (userWebData.referalId) {
//                     (async () => {
//                         const snapshot = await get(ref(realtimeDb, `/users/${userWebData.referalId}`))
//                         if (snapshot.exists) {
//                             setReferredBy({ name: snapshot.val().username, id: userWebData.referalId });
//                         }
//                     })();
//                     setIsReferred(true);
//                 }
//                 else {
//                     createAccount(null, 0);
//                 }
//             }
//         });
//         // Update last online timestamp
//         get(ref(realtimeDb, `/users/${userWebData.userId}/lastSession`)).then((snapshot) => {
//             if (snapshot.exists()) {
//                 onDisconnect(ref(realtimeDb, `/users/${userWebData.userId}/lastSession`)).update({ lastOnline: serverTimestamp(), hasClaimed: false });
//             }
//         });
//     };

//     const createAccount = async (friendInfo, initCoins) => {
//         await set(ref(realtimeDb, `/users/${userWebData.userId}`), {
//             username: userWebData.username,
//             coins: initCoins,
//             pointsToAdd: 1,
//             totalEnergy: 1500,
//             currentEnergy: 1500,
//             yieldPerHour: 0,
//             completedTasks: {
//                 youtube: false,
//                 telegram: false,
//                 twitter: false,
//             },
//             unlockedCards: {
//                 "001": { level: 1, profitAmount: 50, price: 1 },
//                 "002": { level: 1, profitAmount: 100, price: 2 },
//                 "003": { level: 1, profitAmount: 120, price: 1 },
//                 "004": { level: 1, profitAmount: 70, price: 3 },
//                 "005": { level: 1, profitAmount: 50, price: 2 },
//                 "011": { level: 1, profitAmount: 200, price: 2 },
//                 "012": { level: 1, profitAmount: 120, price: 3 },
//                 "013": { level: 1, profitAmount: 180, price: 1 },
//                 "014": { level: 1, profitAmount: 70, price: 1 },
//                 "015": { level: 1, profitAmount: 100, price: 2 },
//                 "021": { level: 1, profitAmount: 200, price: 1 },
//                 "022": { level: 1, profitAmount: 220, price: 3 },
//                 "023": { level: 1, profitAmount: 150, price: 3 },
//                 "024": { level: 1, profitAmount: 180, price: 2 },
//                 "025": { level: 1, profitAmount: 150, price: 1 },
//             },
//             utils: {
//                 food: 0,
//                 fertilizer: 0,
//                 oil: 0
//             },
//             dailyRewards: {
//                 "Monday": false,
//                 "Tuesday": false,
//                 "Wednesday": false,
//                 "Thursday": false,
//                 "Friday": false,
//                 "Saturday": false,
//                 "Sunday": false,
//             },
//             friends: {
//                 referredBy: friendInfo?.name && friendInfo?.id ? { name: friendInfo.name, id: friendInfo.id } : null
//             },
//             lastSession: {
//                 lastOnline: serverTimestamp(),
//                 hasClaimed: true
//             }
//         });
//         fetchUserDetails();
//     }


//     // // Increase energy every second
//     useEffect(() => {
//         if (!userInfo) return;
//         const intervalId = setInterval(() => {
//             update(ref(realtimeDb, `/users/${userWebData.userId}`), {
//                 currentEnergy: Math.min(
//                     userInfo.currentEnergy + 1,
//                     userInfo.totalEnergy
//                 ),
//             });
//         }, 1000);
//         return () => clearInterval(intervalId);
//     }, [userInfo]);

//     // Increase coins as per yield per hour
//     useEffect(() => {
//         if (!userInfo || userInfo.yieldPerHour === 0) return;
//         const intervalId = setInterval(() => {
//             update(ref(realtimeDb, `/users/${userWebData.userId}`), {
//                 coins: userInfo.coins + userInfo.yieldPerHour / 3600,
//             });
//         }, 1000);
//         return () => clearInterval(intervalId);
//     }, [userInfo]);

//     return (
//         <userInfoContext.Provider value={{ userInfo, isReferred, createAccount, referredBy, setIsReferred }}>
//             {children}
//         </userInfoContext.Provider>
//     );
// };

