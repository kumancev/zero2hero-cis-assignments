import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import correctURLs from '../helpers/url'
import { mintNFT, balanceNFT, urlsNFT } from '../services/nft'
import { setAllUrls } from '../app/features/urls/urlsSlice'
import { useAppDispatch } from '../app/hooks'
import Slider from '../components/Slider'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const dispatch = useAppDispatch()
  const { address } = useAccount()

  const [ownerBalance, setOwnerBalance] = useState(0)

  const mint = async () => {
    try {
      await mintNFT(address!)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (address) {
      const getNFTs = async () => {
        try {
          const nftBalance = Number(await balanceNFT(address!))
          if (nftBalance) {
            setOwnerBalance(nftBalance)
          }
        } catch (error) {
          console.error(error)
        }
      }

      getNFTs()
    }
  }, [address])

  useEffect(() => {
    const getUrls = async () => {
      const urls = await urlsNFT(address!, ownerBalance)
      const fullUrls = correctURLs(urls)

      dispatch(setAllUrls(fullUrls))
    }

    getUrls()
  }, [address, dispatch, ownerBalance])

  return (
    <div className={styles.container}>
      <Head>
        <title>Shape NFT</title>
        <meta
          content="Shape NFT website"
          name="This is amazing NFT Collections. You can mint and stake your NFT's!"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />

        <section className={styles.section}>
          <h1 className={styles.title}>
            Welcome to <a href="https://opensea.com/">Shape NFT</a>
          </h1>

          {address ? (
            <>
              <p className={styles.description}>Get started by mint NFT</p>
              <button onClick={mint} className={styles.button}>
                Mint
              </button>
              <p>Your number of nfts: {ownerBalance}</p>

            <div className={styles['link-wrapper']}>
              <Link href="/stakeNft">
                <p className={styles.link}>Stake NFT&apos;s</p>
              </Link>
              <Link href="/myCollection">
                <p className={styles.link}>See my collection</p>
              </Link>
            </div>

              <Slider />
            </>
          ) : (
            <p className={styles.description}>
              First you need to connect wallet{' '}
            </p>
          )}
        </section>
      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
          Shape NFT ✖️. &copy; All rights reserved
        </a>
      </footer>
    </div>
  )
}

export default Home
