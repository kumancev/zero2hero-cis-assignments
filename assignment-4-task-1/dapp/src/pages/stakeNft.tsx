import Link from 'next/link'
import styles from '../styles/StakeNft.module.css'

const stakeNft = () => {
  return (
    <div className={styles.main}>
      <Link href="/"><p className={styles.link}>Back to home</p></Link>
      
      <p>stakeNft</p>
      
    </div>
  )
}

export default stakeNft