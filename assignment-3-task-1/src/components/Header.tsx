import { ConnectButton } from '@rainbow-me/rainbowkit'
import BetBox from './BetBox'
import { useAccount } from 'wagmi'
import { useCookies } from 'react-cookie'

interface HeaderProps {
  score: number
}

const Header = ({ score }: HeaderProps) => {
  const { address } = useAccount()
  const [cookies, setCookie] = useCookies(['wins', 'losses'])

  return (
    <>
      <div className="connect-btn">
        <ConnectButton />
      </div>
      {address ? (
        <>
          <div className="header">
            <div className="text">
              <span>Rock</span>
              <span>Paper</span>
              <span>Scissors</span>
            </div>
            <div className="score-box">
              <span>Score</span>
              <div className="score-box__score">W: {cookies.wins}</div>
              <div className="score-box__score">L: {cookies.losses}</div>
            </div>
          </div>
          <BetBox />
        </>
      ) : (
        ''
      )}
    </>
  )
}

export default Header
