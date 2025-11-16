import { Categories, Colours } from '../utils/filtering'
import { useState, useEffect } from 'react'
import { FaSquare } from 'react-icons/fa'
import { FaRegSquare } from 'react-icons/fa'
import { CiFilter } from 'react-icons/ci'
export default function Filtering ({
  width = '20%',
  setCurrentCat,
  currentCat
}) {
  return (
    <section className={`w-[${width}] fixed  h-full`}>
      <section className=' w-full px-10 justify-between flex'>
        <div className='flex gap-2 items-center'>
          Filters <CiFilter />
        </div>
        <div className='border-b pb-0.5'>Clean all</div>
      </section>

      <section className='flex flex-col pl-10 pt-9'>
        <p className='text-[16px] font-bold pb-3'>Categories</p>

        <section className=' w-full  flex flex-col   gap-1.5 '>
          {Categories.map(item => (
            <section
              onClick={() => setCurrentCat(item)}
              className='flex gap-4 text-[13px] align-middle items-center'
              key={item}
            >
              <FaRegSquare />
              <div>{item}</div>
            </section>
          ))}
        </section>
      </section>
      <section className='flex flex-col pl-10 pt-9'>
        <p className='text-[16px] font-bold pb-3'>Colours</p>
        <section className=' w-full  flex flex-col  align-middle gap-0.5'>
          {Colours.map(item => (
            <section
              key={item}
              className='flex gap-4 text-[13px] align-middle items-center'
            >
              <FaRegSquare />
              <div
                style={{ backgroundColor: item }}
                className={`w-2.5 h-2.5 rounded-4xl`}
              ></div>
              {item}
            </section>
          ))}
        </section>
      </section>
      <button className=' w-[90%] mt-3 py-2 flex justify-center items-center align-bottom ml-6 bg-black text-white '>
        Save
      </button>
    </section>
  )
}
