import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Logo from '../assets/logo.svg'

export default function Topbar() {
  return (
    <nav className="bg-gray-900 border-gray-900 px-2 sm:px-4 py-2.5 rounded">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="https://github.com/kumancev/" className="flex items-center">
          <img
            src={Logo}
            className="h-6 mr-3 sm:h-9"
            alt="DDL logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Airdrop Token
          </span>
        </a>
        <div className="flex md:order-2">
          <ConnectButton />
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col p-4 mt-4 bg-gray-900 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-white bg-blue-500 rounded md:bg-transparent md:text-blue-500 md:p-0"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0 "
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="https://testnet.bscscan.com/address/0x9EB73260367222D4F0704cb25789E766944AbFC9"
                className="block py-2 pl-3 pr-4 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0 "
              >
                Contract
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
