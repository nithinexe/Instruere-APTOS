import Link from 'next/link'
import React from 'react'
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Bubbles from './Bubble';
import { WalletSelector } from './Wallet-Selector';
import Wallet from './Wallet';
import TokenInteraction from './TokenInteraction';

const MainPage = () => {
  return (
    <div>
      <img src="/txnpage2.png" className="relative h-screen w-lvw object-cover" />
 {/* <ClerkProvider>
      <div className="absolute top-4 flex justify-between right-64 space-x-6">
  <SignedOut>
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-2 border hover:from-blue-700 hover:to-teal-600 duration-500 rounded-md">
      <SignInButton />
    </div>
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-2 border rounded-md">
      <SignUpButton />
    </div>
  </SignedOut>

  <SignedIn>
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-2 border rounded-md">
      <UserButton />
    </div>
  </SignedIn>
</div>
</ClerkProvider> */}
{/* <img src="/logo.png" alt="Logo" className="w-96" /> */}
<div className="absolute inset-0 flex items-center justify-center left-[40rem]">
  <div className="pl-4 pr-4 pt-2 pb-2 rounded-lg shadow-lg bg-gradient-to-r from-[#18c7ff] to-[#933ffd] hover:from-[#18c7ff] hover:to-[#933ffd]">
    <Link href="/upload">
      <button className="text-4xl">Launch App</button>
    </Link>
  </div>
</div>


    </div>


  )
}

export default MainPage