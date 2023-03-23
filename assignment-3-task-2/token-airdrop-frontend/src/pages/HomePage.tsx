import React from 'react'
import { useAccount } from 'wagmi'
import Claim from '../components/Claim'
import BeforeConnect from '../components/BeforeConnect'
import Topbar from '../components/Topbar'

export default function HomePage() {
  const { address } = useAccount()

  return (
    <>
      <Topbar />
      {address ? <Claim /> : <BeforeConnect />}
    </>
  )
}
