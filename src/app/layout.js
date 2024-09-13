import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";

import { UserDataProvider } from "@/context/userDataContext";
import { TransactionsProvider } from "@/context/transactionsContext";
import { SyncProvider } from "@/context/syncContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  useEffect(() => {
    // Function to check if it's a mobile device
    const isMobileDevice = () => {
      return /Mobi|Android/i.test(navigator.userAgent);
    };

    if (isMobileDevice()) {
      // Disable right-click on mobile devices
      document.addEventListener("contextmenu", (e) => e.preventDefault());

      // Disable text copy-paste
      document.addEventListener("copy", (e) => e.preventDefault());
      document.addEventListener("cut", (e) => e.preventDefault());
      document.addEventListener("paste", (e) => e.preventDefault());

      // Disable text selection
      document.addEventListener("selectstart", (e) => e.preventDefault());
    }

    return () => {
      if (isMobileDevice()) {
        // Clean up event listeners on component unmount
        document.removeEventListener("contextmenu", (e) => e.preventDefault());
        document.removeEventListener("copy", (e) => e.preventDefault());
        document.removeEventListener("cut", (e) => e.preventDefault());
        document.removeEventListener("paste", (e) => e.preventDefault());
        document.removeEventListener("selectstart", (e) => e.preventDefault());
      }
    };
  }, []);

  return (
    <html lang="en">
      <UserDataProvider>
        <TransactionsProvider>
          <SyncProvider>
            <body
              className={`${inter.className} flex justify-center items-center`}
            >
              {children}
            </body>
          </SyncProvider>
        </TransactionsProvider>
      </UserDataProvider>
    </html>
  );
}
