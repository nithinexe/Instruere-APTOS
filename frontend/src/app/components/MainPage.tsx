import { ClerkProvider, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
const MainPage = () => {
  return (
    <div>
      <img src="/script3.png" className="relative h-screen w-lvw object-cover" />
{/* <img src="/logo.png" alt="Logo" className="w-96" /> */}
    
      {/* <button className="text-4xl">Launch App</button> */}
     
     <div className="absolute top-6 flex justify-between right-64 space-x-6">
     
  <SignedOut>
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 border-white p-2 border hover:from-blue-700 hover:to-purple-700 duration-500 rounded-md">
    <SignInButton />
    </div>
    <div className="bg-gradient-to-r  from-blue-500 to-purple-500 border-white p-2 border rounded-md">
      <SignUpButton />
    </div>
  </SignedOut>


  {/* <SignedIn> */}
    {/* <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-2 border rounded-md"> */}
    <UserButton />
    {/* </div> */}
  {/* </SignedIn> */}

</div>
  
<div className="absolute inset-0 flex items-center justify-center">
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