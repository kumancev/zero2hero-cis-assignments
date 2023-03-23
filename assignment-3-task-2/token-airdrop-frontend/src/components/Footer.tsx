import React from 'react'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-gray-900 border-t border-gray-700 shadow md:flex md:items-center md:justify-between md:p-6">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2023{' '}
        <a href="https://flowbite.com/" className="hover:underline">
          DDL Airdrop™
        </a>
        . All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6 ">
            About
          </a>
        </li>
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6">
            Licensing
          </a>
        </li>
        <li>
          <a href="https://testnet.bscscan.com/address/0x9EB73260367222D4F0704cb25789E766944AbFC9" className="hover:underline">
            Contract
          </a>
        </li>
      </ul>
    </footer>
  )
}
