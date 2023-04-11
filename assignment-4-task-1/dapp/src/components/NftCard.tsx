import Link from 'next/link'
import styles from '../styles/MyCollection.module.css'

interface NftCardProps {
  name: string
  description: string
  image: string
}

const NftCard = ({ name, description, image }: NftCardProps) => {
  const imageLink =
    'ipfs://QmQJvd5LRgrUPwMudR78KhCuzYeVt3HMaQhmR4Jz4TLBZy/1.png'

  return (
    <div className={styles.card}>
      <img src={`https://ipfs.io/ipfs/${image.substring(7)}`} alt={name} />
      <h2>{name}</h2>
      <p>{description}</p>

      <div className={styles['nft-links']}>
        <a
          href="https://testnets.opensea.io/collection/shape-nft-3"
          target="_blank"
          rel="noreferrer"
        >
          View collection
        </a>
        {/* <Link href="/stakeNft">Stake this NFT</Link> */}
      </div>
    </div>
  )
}

export default NftCard
