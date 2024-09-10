import { Inter } from "next/font/google";
import "./globals.css";

import { UserDataProvider } from "@/context/userDataContext";
import { TransactionsProvider } from "@/context/transactionsContext";
import { SyncProvider } from "@/context/syncContext";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <UserDataProvider>
        <TransactionsProvider>
          <SyncProvider>
            <body className={`${inter.className} flex justify-center items-center`}>
              {children}
            </body>
          </SyncProvider>
        </TransactionsProvider>
      </UserDataProvider>
    </html>
  );
};
