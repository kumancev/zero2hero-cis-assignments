import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAccount } from 'wagmi'

import useChallengeWatch from '../hooks/useChallengeWatch'
import useRouter from '../hooks/useRouter'
import rfsGetCurrentChallengeStatus from '../services/rpsGetCurrentChallenge'
import { getTitleByChoice } from '../lib/helper'

export default function Play() {
  const router = useRouter()
  const { address } = useAccount()

  const [challengeId, setChallengeId] = useState<number | null>(null)
  const [playerChoice, setPlayerChoice] = useState<number | null>(null)
  const [hostChoice, setHostChoice] = useState<number | null>(null)
  const [status, setStatus] = useState<number | null>(null)
  const [myChoice, setMyChoice] = useState<string | null>(null)
  const [house, setHouse] = useState<string | null>(null)

  const [secondsLeft, setSecondsLeft] = useState(5)

  useChallengeWatch(
    address,
    setChallengeId,
    setPlayerChoice,
    setHostChoice,
    setStatus
  )

  // useEffect(() => {
  //   console.log(challengeId, status, playerChoice, hostChoice);
  // }, [challengeId, playerChoice, hostChoice, status]);

  useEffect(() => {
    const getStatus = async (address: `0x${string}`) => {
      const { status, challengeId, player, playerChoice, hostChoice } =
        await rfsGetCurrentChallengeStatus(address)

      return { status, challengeId, player, playerChoice, hostChoice }
    }

    if (address) {
      getStatus(address)
        .then(({ status, challengeId, playerChoice, hostChoice }) => {
          setChallengeId(challengeId as number)
          setPlayerChoice(playerChoice as number)
          setHostChoice(hostChoice as number)
          setStatus(status as number)

          setMyChoice(getTitleByChoice(playerChoice as number))
        })
        .catch(() => router.push('/'))
    } else {
      router.push('/')
    }
  }, [address, router])

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    let interval: string | number | NodeJS.Timeout | undefined;

    if (status !== 3) {
      timer = setTimeout(() => {
        router.push('/')
      }, secondsLeft * 3000)

      interval = setInterval(() => {
        setSecondsLeft((prevSecondsLeft) => prevSecondsLeft - 1)
      }, 3000)
    }

    setHouse(getTitleByChoice(hostChoice))

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [status, secondsLeft])

  return (
    <div className="game">
      <div className="game__you">
        <span className="text">You Picked</span>
        <div
          className={`icon icon--${myChoice} ${
            status == 0 ? `icon icon--${myChoice}--winner` : ''
          }`}
        ></div>
      </div>
      {status == 0 && (
        <div className="game__play">
          <span className="text">You Win</span>
          <Link to="/" className="play-again">
            Play Again
          </Link>
        </div>
      )}
      {status == 1 && (
        <div className="game__play">
          <span className="text">You Lose</span>
          <Link to="/" className="play-again">
            Play Again
          </Link>
        </div>
      )}
      {status == 2 && (
        <div className="game__play">
          <span className="text">Draw</span>
          <Link to="/" className="play-again">
            Play Again
          </Link>
        </div>
      )}
      {status == 3 && (
        <div className="game__play">
          <span className="text">Waiting...</span>
        </div>
      )}

      <div className="game__house">
        <span className="text">The House Picked</span>
        {status != 3 && (
          <div
            className={`icon icon--${house} ${
              status == 1 ? `icon icon--${house}--winner` : ''
            }`}
          ></div>
        )}
      </div>
    </div>
  )
}
