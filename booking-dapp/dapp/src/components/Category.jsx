import React from 'react'
import {TbBeach} from 'react-icons/tb'
import {GiCampingTent, GiIsland} from 'react-icons/gi'
import {BsSnow2} from 'react-icons/bs'
import {RiHotelLine} from 'react-icons/ri' 

const Category = () => {
  return (
    <div className='flex justify-center space-x-5 sm:space-x-14 p-4 px-4 border-b-2 border-b-slate-200 text-gray-600'>
        <p className='flex flex-col items-center hover:text-black border-transparent hover:border-black hover:cursor-pointer'>
            <TbBeach className='text-2xl'/>
            Beach
        </p>
        <p className='flex flex-col items-center hover:text-black border-transparent hover:border-black hover:cursor-pointer'>
            <GiIsland className='text-2xl'/>
            Island
        </p>
        <p className='flex flex-col items-center hover:text-black border-transparent hover:border-black hover:cursor-pointer'>
            <BsSnow2 className='text-2xl' />
            Arctic
        </p>
        <p className='flex flex-col items-center hover:text-black border-transparent hover:border-black hover:cursor-pointer'>
            <GiCampingTent className='text-2xl'/>
            Camping
        </p>
        <p className='flex flex-col items-center hover:text-black border-transparent hover:border-black hover:cursor-pointer'>
            <RiHotelLine className='text-2xl'/>
            Hotel
        </p>
    </div>
  )
}

export default Category 