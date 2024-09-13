import { Inter } from "next/font/google";
import "./globals.css";

import { UserDataProvider } from "@/context/userDataContext";
import { TransactionsProvider } from "@/context/transactionsContext";
import { SyncProvider } from "@/context/syncContext";
import MobileRestrictions from "./MobileRestrictions"; // Import the restriction component

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserDataProvider>
        <TransactionsProvider>
          <SyncProvider>
            <body className={`${inter.className} flex justify-center items-center`}>
              <MobileRestrictions> {/* Wrap content with restriction component */}
                {children}
              </MobileRestrictions>
            </body>
          </SyncProvider>
        </TransactionsProvider>
      </UserDataProvider>
    </html>
  );
}
