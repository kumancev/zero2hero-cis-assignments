import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { balanceToken } from '../services/token'
import {
  avaibleRewards,
  claimRewards,
  stakedTokens,
} from '../services/stakeNFT'
import { useAppSelector } from '../app/hooks'
import getNftData from '../helpers/getNftData'
import NftStakingCard from '../components/NftStakingCard'
import getStakedTokenIds from '../helpers/getTokenIds'
import styles from '../styles/StakeNft.module.css'

const StakeNft: NextPage = () => {
  const urls = useAppSelector((state) => state.urls.urls)

  const { address } = useAccount()

  const [notStakedData, setNotStakedData] = useState<any>()
  const [stakedData, setStakedData] = useState<any>()
  const [tokenBalance, setTokenBalance] = useState<any>()
  const [avaibleTokens, setAvaibleTokens] = useState<any>()

  const getStakedNftUrls = (tokenIds: Array<number>) => {
    let urls = []

    for (let i = 0; i < tokenIds.length; i++) {
      urls.push(
        `https://ipfs.io/ipfs/QmQgvFUpwgz97pPRAf3BrytH5Z1XwyWbagJCVWKpesM42K/${tokenIds[i]}.json`
      )
    }

    return urls
  }

  const claim = async () => {
    try {
      await claimRewards()
    } catch (error) {
      console.error('Claim error: ', error)
    }
  }

  useEffect(() => {
    const init = async () => {
      const balance = await balanceToken(address!)
      const avaible = await avaibleRewards(address!)
      const staked = await stakedTokens(address!)

      let stakedUrls: any = []

      if (staked) {
        const ids = getStakedTokenIds(staked)

        stakedUrls = getStakedNftUrls(ids)
      }

      setTokenBalance(balance)
      setAvaibleTokens(avaible)

      const nData = await getNftData(urls)
      const yData = await getNftData(stakedUrls)

      setNotStakedData(nData)
      setStakedData(yData)
    }

    init()
  }, [address, urls])

  return (
    <div className={styles.page}>
      <Link href="/">
        <p className={styles.link}>Back to home</p>
      </Link>
      <div className={styles.wrapper}>
        <header>
          <h1>Stake Your NFT&apos;s</h1>
        </header>
        {notStakedData ? (
          <main className={styles.main}>
            <h2>Token Info</h2>

            <div className={styles['token-info']}>
              <div className={styles['token-item']}>
                <h4>Claimable Rewards</h4>
                <p>{(avaibleTokens?.toNumber() / 10 ** 18).toFixed(18)} RWD</p>
              </div>

              <div className={styles['token-item']}>
                <h4>Current Balance</h4>
                <p>{(tokenBalance?.toNumber() / 10 ** 18).toFixed(18)} RWD</p>
              </div>
            </div>

            <button onClick={claim}>claim</button>

            <h2>Your Staked NFT&apos;s</h2>

            {stakedData.length > 0 ? (
              <div className={styles.grid}>
                {stakedData.map((nft: any) => (
                  <NftStakingCard
                    key={nft.name}
                    name={nft.name}
                    description={nft.description}
                    image={nft.image}
                    staked={true}
                    tokenId={nft.name.match(/#(\d+)/)?.[1]}
                  />
                ))}
              </div>
            ) : (
              <p>You haven&apos;t stake any NFT yet.</p>
            )}

            <h2>Your Unstaked NFT&apos;s</h2>
            <div className={styles.grid}>
              {notStakedData.map((nft: any) => (
                <NftStakingCard
                  key={nft.name}
                  name={nft.name}
                  description={nft.description}
                  image={nft.image}
                  staked={false}
                  tokenId={nft.name.match(/#(\d+)/)?.[1]}
                />
              ))}
            </div>
          </main>
        ) : (
          <div className={styles.loader}></div>
        )}
      </div>
    </div>
  )
}

export default StakeNft
