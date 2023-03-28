import { ConnectButton } from '@rainbow-me/rainbowkit'

import './index.scss'

function Header() {
  return (
    <header>
      <h1>Document Signature</h1>

      <div className="btn-connect">
        <ConnectButton />
      </div>
    </header>
  )
}

export default Header
