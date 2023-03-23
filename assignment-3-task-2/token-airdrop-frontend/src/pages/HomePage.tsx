import React from 'react'
import Claim from '../components/Claim'
import Footer from '../components/Footer'
import Topbar from '../components/Topbar'

export default function HomePage() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Topbar />
      <Claim />
      <Footer />
    </div>
  )
}
