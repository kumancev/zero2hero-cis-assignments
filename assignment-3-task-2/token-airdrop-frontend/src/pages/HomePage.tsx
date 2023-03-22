import React, { useEffect, useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import getWhitelistStatus from '../services/getWhitelistStatus'
import { useAccount } from 'wagmi'

export default function HomePage() {
  const { address } = useAccount()
  
  const [status, setStatus] = useState<boolean | null>(null)

  useEffect(() => {
    const getStatus = async (address: `0x${string}`) => {
      const bool = await getWhitelistStatus(address)

      return bool
    }
    
    if (address) {
      getStatus(address).then((bool) => {
        setStatus(bool as any)
      })
    }

  }, [address])

  return (
    <div>
      <ConnectButton />
      <p>Address: {address}</p>
      {status 
        ? <p>Great! You're in whitelist. Now you can claim token</p> 
        : <p>You're not in whitelist</p>
      }
    </div>
  )
}
