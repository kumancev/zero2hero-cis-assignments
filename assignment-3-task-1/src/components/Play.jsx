import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Triangle from '../images/bg-triangle.svg'
import { useCookies } from 'react-cookie'
import { useAccount } from 'wagmi'

import rfsGetCurrentChallengeStatus from '../services/rpsGetCurrentChallenge'
import rfsPlay from '../services/rpsPlay'
import useRouter from '../hooks/useRouter'

const Play = ({ setMyChoice }) => {
  const setChoice = (e) => {
    setMyChoice(e.target.dataset.id)
  }

  const router = useRouter()
  const { address } = useAccount()

  const [selected, setSelected] = useState(null)
  const [showSelected, setShowSelected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [cookies] = useCookies(['bet'])

  const select = async (choice) => {
    if (!address) {
      return false
    }

    setSelected(choice)

    try {
      await rfsPlay(address, choice, cookies.bet ?? 0.001)
    } catch (e) {
      setShowSelected(false)
      setSelected(null)
      // eslint-disable-next-line no-console
      console.error(e)
    }

    const { status } = await rfsGetCurrentChallengeStatus(address)

    if (status == 3) {
      router.push('/game')
    }
  }

  useEffect(() => {
    const getStatus = async (address) => {
      const { challengeId, status } = await rfsGetCurrentChallengeStatus(
        address
      )

      return { challengeId, status }
    }

    if (address) {
      getStatus(address)
        .then(({ status }) => {
          if (status == 3) {
            router.push('/game')
            setIsLoading(false)
          }
        })
        // eslint-disable-next-line no-console
        .catch(console.error)
    } else {
      router.push('/')
    }
  }, [address, router])

  return (
    <div className="play">
      {isLoading ? (
        <div>Waiting...</div>
      ) : (
        <>
          <img src={Triangle} alt="" className="triangle" />
          <div className="items">
            <div
              data-id="paper"
              onClick={() => {
                select(1)
                setChoice
                setIsLoading(true)
              }}
              className="icon icon--paper"
            ></div>
            <div
              data-id="scissors"
              onClick={() => {
                select(2)
                setChoice
                setIsLoading(true)
              }}
              className="icon icon--scissors"
            ></div>
            <div
              data-id="rock"
              onClick={() => {
                select(3)
                setChoice
                setIsLoading(true)
              }}
              className="icon icon--rock"
            ></div>
          </div>
        </>
      )}
    </div>
  )
}

export default Play
