// import genericPool from 'generic-pool';
// import { MongoClient } from 'mongodb';
// // import mongoose from 'mongoose';

// let pool;
// const mongoURI = "mongodb+srv://parth639juneja:parthjuneja00%40@cluster0.ocww16f.mongodb.net/satoshi/?retryWrites=true&w=majority";

// async function createConnectionPool() {

//     const factory = {
//         async create() {
//             const client = new MongoClient(mongoURI);
//             // const client = new MongoClient(process.env.MONGODB_URI);
//             await client.connect();
//             return client;
//             // const client = await mongoose.connect(mongoURI, {
//             //     useNewUrlParser: true,
//             //     useUnifiedTopology: true,
//             // })
//             // return client;
//         },
//         async destroy() { await client.close() }
//         // async destroy() { await mongoose.disconnect() }
//     };

//     const opts = {
//         max: 10, // maximum size of the pool
//         autostart: true,
//     };

//     pool = genericPool.createPool(factory, opts);
//     if (pool) {
//         console.log("Pool created");
//     }
//     return pool;
// }

// async function getConnection() {
//     const client = await pool.acquire();
//     return client;
// }

// async function releaseConnection(client) {
//     await pool.release(client);
// }

// export { createConnectionPool, getConnection, releaseConnection };
