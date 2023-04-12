import Link from 'next/link'
import { approveNFT } from '../services/nft'
import { stakeNFT, withdrawNFT } from '../services/stakeNFT'
import styles from '../styles/MyCollection.module.css'

interface NftCardProps {
  name: string
  description: string
  image: string
  staked?: boolean
  tokenId?: any
}

const NftStakingCard = ({ name, description, image, staked, tokenId }: NftCardProps) => {

  const stake = async (tokenId: any) => {
    await approveNFT(tokenId)
    await stakeNFT(tokenId)
  }

  const withdraw = async (tokenId: any) => {
    await withdrawNFT(tokenId)
  }

  return (
    <div className={styles.card}>
      <img src={`https://ipfs.io/ipfs/${image.substring(7)}`} alt={name} />
      <h2>{name}</h2>
      <p>{description}</p>

      <div className={styles['nft-action']}>
        {staked ? (
          <button onClick={() => withdraw(tokenId)}>withdraw</button>
        ) : (
          <button onClick={() => stake(tokenId)}>stake</button>
        )}
      </div>
    </div>
  )
}

export default NftStakingCard
