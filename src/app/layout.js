import { Inter } from "next/font/google";
import "./globals.css";

import { UserDataProvider } from "@/context/userDataContext";
import mongoose from "mongoose";
import { TransactionsProvider } from "@/context/transactionsContext";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }) {

  await mongoose.connect(process.env.MONGODB_URI)
  // await mongoose.connect("mongodb+srv://humming:bird@cluster0.q6ccm.mongodb.net/satoshi-farm?retryWrites=true&w=majority")

  console.log('Connected to MongoDB');

  return (
    <html lang="en">
      <UserDataProvider>
        <TransactionsProvider>
          <body className={`${inter.className} flex justify-center items-center`}>
            {children}
          </body>
        </TransactionsProvider>
      </UserDataProvider>
    </html>
  );
};
