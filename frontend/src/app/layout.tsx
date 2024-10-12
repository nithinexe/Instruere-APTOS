// import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import "./globals.css";

// import { ThemeProvider } from "@/components/ThemeProvider";
// import { WalletProvider } from "@/components/WalletProvider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import { PropsWithChildren } from "react";
// import { AutoConnectProvider } from "@/components/AutoConnectProvider";
import { ClerkProvider } from '@clerk/nextjs';
import Bubbles from './components/Bubble';
import Logo from './components/Logo';
import PrelineScript from './components/PrelineScript';
import { WalletProvider } from "./components/Wallet-Provider";
import { WalletSelector } from "./components/Wallet-Selector";
import Wallet from "./components/Wallet";


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Aptos Wallet Adapter Example",
  description: "An example of how to use Aptos Wallet Adapter with React and Next.js.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "flex justify-center min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ClerkProvider>
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
            {/* <AutoConnectProvider> */}
              <WalletProvider>
                {/* <Bubbles /> */}
                <Logo />
                <Wallet />
                {children}
                <Toaster />
              </WalletProvider>
            {/* </AutoConnectProvider> */}
          {/* </ThemeProvider> */}
         
        </ClerkProvider>
      </body>
    </html>
  );
}
