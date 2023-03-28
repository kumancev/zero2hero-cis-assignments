import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAccount } from 'wagmi'
import { getSign } from '../../services/getSign'
import { getStatus } from '../../services/getWhitelistStatus'

import './index.scss'

function Main() {
  const { address } = useAccount()

  const [textStatus, setTextStatus] = useState<string | null>(null)
  const [canSign, setCanSign] = useState<boolean>(false)

  const notifyError = () =>
    toast.error(textStatus, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })

  const notifyConnectWallet = () =>
    toast.info('Connect your wallet to check the status', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })

  const notifySuccess = () =>
    toast(textStatus, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })

  const styleContent = canSign ? 'space-around' : 'center'

  const gegNotifyMessage = () => {
    if (!address) {
      return notifyConnectWallet()
    }

    return canSign ? notifySuccess() : notifyError()
  }

  useEffect(() => {
    const getAddressStatus = async (address: `0x${string}`) => {
      const status = await getStatus(address)

      return status
    }

    if (address) {
      getAddressStatus(address).then((status) => {
        setTextStatus(status?.text as string)
        setCanSign(status?.status as boolean)
      })
    }
  }, [address])

  async function handleSign() {
    try {
      await getSign()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <main style={{ justifyContent: styleContent }}>
      <div>
        <button
          className="btn btn-white btn-animate"
          onClick={gegNotifyMessage}
        >
          Get status
        </button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {canSign && (
        <div>
          <button className="btn btn-white btn-animate" onClick={handleSign}>
            Sign
          </button>
        </div>
      )}
    </main>
  )
}

export default Main
