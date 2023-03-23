import React, { useEffect, useState } from 'react'
import { getStatus } from '../services/getWhitelistStatus'
import { getClaimToken } from '../services/getClaimToken'
import { useAccount } from 'wagmi'
import Loader from './Loader'
import crypto_logo from '../assets/crypto-logo.svg'

export default function Claim() {
  const { address } = useAccount()

  const [textStatus, setTextStatus] = useState<string | null>(null)
  const [canClaim, setCanClaim] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getAddressStatus = async (address: `0x${string}`) => {
      const status = await getStatus(address)

      return status
    }

    if (address) {
      getAddressStatus(address).then((status) => {
        setTextStatus(status?.text as string)
        setCanClaim(status?.status as boolean)
        setIsLoading(false)
      })
    }
  }, [address])

  async function handleClaim() {
    try {
      await getClaimToken()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <section className="md:flex md:justify-between mb-36 gap-16 md:items-center mob:mb-8">
      {/* IMAGE SECTION */}
      <div className="basis-3/5 z-10 mt-8 md:mt-8 flex justify-center md:order-2">
        <img
          alt="crypto logo"
          className="z-10 w-full max-w-[300px] md:max-w-[600px]"
          src={crypto_logo}
        />
      </div>

      {/* MAIN TEXT */}
      <div className="z-30 basis-2/5 mt-12 md:mt-32">
        {/* HEADINGS */}
        <div>
          <p className="text-6xl font-playfair z-10 text-center">
            Airdrop {''}
            <span
              className="xs:relative xs:text-deep-blue xs:font-semibold z-20 xs:before:content-brush
              before:absolute before:-left-[25px] before:-top-[70px] before:z-[-1]"
            >
              DDL
            </span>
          </p>

          {isLoading && <Loader />}
          <p className="text-xl text-center mt-6 mb-6">{textStatus}</p>
        </div>

        {/* CALL TO ACTIONS */}
        {address ? (
          <div className="flex flex-col">
            <div>
              {canClaim && (
                <button
                  type="button"
                  className="text-blue-700 bg-white hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
                  onClick={handleClaim}
                >
                  Claim
                </button>
              )}
            </div>
          </div>
        ) : (
          <p>Connect your wallet to know your status</p>
        )}
      </div>
    </section>
  )
}
