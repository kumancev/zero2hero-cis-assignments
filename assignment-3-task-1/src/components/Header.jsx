import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import BetBox from './BetBox'

const Header = ({ score }) => {
  return (
    <>
      <div className="connect-btn">
        <ConnectButton />
      </div>
      <div className="header">
        <div className="text">
          <span>Rock</span>
          <span>Paper</span>
          <span>Scissors</span>
        </div>
        <div className="score-box">
          <span>Score</span>
          <div className="score-box__score">W: {score}</div>
          <div className="score-box__score">L: {score}</div>
        </div>
      </div>
      <BetBox />
    </>
  )
}

export default Header
