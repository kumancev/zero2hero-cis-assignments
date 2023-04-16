import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Card from './components/Card'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './views/Home'
import Room from './views/Room'
import AddRoom from './views/AddRoom'
import { isWallectConnected, loadAppartments } from './Blockchain.services'
import UpdateRoom from './views/UpdateRoom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Bookings from './views/Bookings'
import Chats from './views/Chats'
import RecentConversations from './views/RecentConversations'
import { setGlobalState, useGlobalState } from './store'
import { isUserLoggedIn } from './services/Chat'
import AuthModal from './components/AuthModal'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { bscTestnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider } = configureChains([bscTestnet], [publicProvider()])

const { connectors } = getDefaultWallets({
  appName: 'Booking Dapp',
  projectId: '1',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const App = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')

  useEffect(() => {
    const initData = async () => {
      await isWallectConnected()
      await loadAppartments()
      const user = await isUserLoggedIn()

      setGlobalState('currentUser', user)
    }

    initData()
  }, [connectedAccount])

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className="relative h-screen min-w-screen">
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:id" element={<Room />} />
            <Route path="/card" element={<Card />} />
            <Route path="/addRoom" element={<AddRoom />} />
            <Route path="/editRoom/:id" element={<UpdateRoom />} />
            <Route path="/bookings/:id" element={<Bookings />} />
            <Route path="/chats/:id" element={<Chats />} />
            <Route
              path="/recentconversations"
              element={<RecentConversations />}
            />
          </Routes>
          <div className="h-20"></div>
          <Footer />
          <AuthModal />

          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
