import { useEffect, useState } from 'react'
import getNftData from '../helpers/getNftData'
import { useAppSelector } from '../app/hooks'
import NftStakingCard from '../components/NftStakingCard'
import Link from 'next/link'
import { NextPage } from 'next'
import styles from '../styles/MyCollection.module.css'

const MyCollection: NextPage = () => {
  const [nftData, setNftData] = useState<any>([])

  const urls = useAppSelector((state) => state.urls.urls)

  console.log(urls)

  useEffect(() => {
    const getData = async () => {
      const data = await getNftData(urls)
      setNftData(data)
    }

    getData()
  }, [urls])

  console.log(nftData)

  return (
    <div>
      <Link href="/">
        <p className={styles.link}>Back to home</p>
      </Link>
      <div className={styles.grid}>
        {nftData.map((nft: any) => (
          <NftStakingCard
            key={nft.name}
            name={nft.name}
            description={nft.description}
            image={nft.image}
          />
        ))}
      </div>
    </div>
  )
}

export default MyCollection
