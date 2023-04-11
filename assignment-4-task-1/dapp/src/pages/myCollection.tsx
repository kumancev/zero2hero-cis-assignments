import { useEffect, useState } from 'react'
import getNftData from '../helpers/getNftData'
import { useAppSelector } from '../app/hooks'
import styles from '../styles/MyCollection.module.css'
import NftCard from '../components/NftCard'
import Link from 'next/link'

const MyCollection = () => {
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
    <>
      <Link href="/">Back to home</Link>
      <div className={styles.grid}>
        {nftData.map((nft: any) => (
          <NftCard
            key={nft.name}
            name={nft.name}
            description={nft.description}
            image={nft.image}
          />
        ))}
      </div>
    </>
  )
}

export default MyCollection
