import { ConnectButton } from '@rainbow-me/rainbowkit'
import { TbBrandBooking } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom'
import { setGlobalState, useGlobalState } from '../store'

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 px-8 sm:px-10 md:px-14 border-b-2 border-b-slate-200 w-full">
      <Link to={'/'}>
        <p className="text-[#0e76fd] flex items-center text-2xl">
          <TbBrandBooking className=" font-semibold" />
          Booking
        </p>
      </Link>

      <ButtonGroup />

      <ConnectButton />
    </header>
  )
}

const ButtonGroup = () => {
  const [currentUser] = useGlobalState('currentUser')
  const navigate = useNavigate()

  const handleNavigate = () => {
    if (currentUser) {
      navigate('/recentconversations')
    } else {
      setGlobalState('authModal', 'scale-100')
    }
  }

  return (
    <div
      className="md:flex hidden items-center justify-center shadow-gray-400
      shadow-sm overflow-hidden rounded-full cursor-pointer"
    >
      <div className="inline-flex" role="group">
        <button
          onClick={handleNavigate}
          className="
            rounded-l-full
            px-5
            md:py-2 py-1 
            border border-slate-200
            text-[#0e76fd]
            font-medium
            text-sm
            leading-tight
            hover:bg-black hover:bg-opacity-5
            focus:outline-none focus:ring-0
            transition
            duration-150
            ease-in-out
          "
        >
          Customers
        </button>
        <Link to={'/addRoom'}>
          <button
            type="button"
            className="
              px-5
              md:py-2 py-1 
              border border-slate-200
              text-[#0e76fd]
              font-medium
              text-sm
              leading-tight
              hover:bg-black hover:bg-opacity-5
              focus:outline-none focus:ring-0
              transition
              duration-150
              ease-in-out
            "
          >
            Add Rooms
          </button>
        </Link>

        <button
          onClick={handleNavigate}
          className="
            rounded-r-full
            px-5
            md:py-2 py-1 
            border border-slate-200
            text-[#0e76fd]
            font-medium
            text-sm
            leading-tight
            hover:bg-black hover:bg-opacity-5
            focus:outline-none focus:ring-0
            transition
            duration-150
            ease-in-out
          "
        >
          <p className="flex items-center">Chats</p>
        </button>
      </div>
    </div>
  )
}

export default Header
