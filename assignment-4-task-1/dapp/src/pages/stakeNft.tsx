import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { balanceToken } from '../services/token'
import styles from '../styles/StakeNft.module.css'
import { avaibleRewards } from '../services/stakeNFT'

const StakeNft: NextPage = () => {
  const { address } = useAccount()

  const [tokenBalance, setTokenBalance] = useState<any>()
  const [avaibleTokens, setAvaibleTokens] = useState<any>()


  useEffect(() => {

    const getBalance = async () => {
      const balance =  await balanceToken(address!)
      const avaible = await avaibleRewards(address!)

      setTokenBalance(balance)
      setAvaibleTokens(avaible)
    }

    getBalance()
  }, [address])


  if (tokenBalance !== undefined) {
    console.log(tokenBalance.toNumber())
  }
  

  return (
    <div className={styles.page}>
      <Link href="/">
        <p className={styles.link}>Back to home</p>
      </Link>
      <div className={styles.wrapper}>
        <header>
          <h1>Stake Your NFT&apos;s</h1>
        </header>

        <main className={styles.main}>
          <h2>Token Info</h2>

          <div className={styles['token-info']}>
            <div className={styles['token-item']}>
              <h4>Claimable Rewards</h4>
              <p>{avaibleTokens?.toNumber()} RWD</p>
            </div>

            <div className={styles['token-item']}>
              <h4>Current Balance</h4>
              <p>{tokenBalance?.toNumber()} RWD</p>
            </div>
          </div>

          <button>claim</button>

          <section>
            <h2>Your Staked NFT&apos;s</h2>
            {/* NFT ITEMS */}
          </section>

          <section>
            <h2>Your Unstaked NFT&apos;s</h2>
            {/* NFT ITEMS */}
          </section>
        </main>

        {/* <p>
          You haven&apos;t staked any NFTs yet.{' '}
          <Link href="/myCollection">Do it right now</Link>
        </p> */}
      </div>
    </div>
  )
}

export default StakeNft
