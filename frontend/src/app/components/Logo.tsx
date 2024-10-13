import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <div>
      <Link href="/">
       <img src="/logo.png" alt="Logo" className="w-96 absolute top-0 left-0 z-50" />
       </Link>
    </div>
  )
}


export default Logo