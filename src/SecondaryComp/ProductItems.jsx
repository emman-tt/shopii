import { FaRegHeart } from 'react-icons/fa6'
import { FaHeart } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { IoHeart } from 'react-icons/io5'
import NoItem from '../reuse/NoItem'
export default function Items ({ items }) {
  

  return (
    <section className='w-[99%] min-h-max flex flex-wrap gap-y-15 gap-10 justify-start max-[500px]:gap-5 max-[500px]:justify-center   pl-[25%] mt-21 max-[800px]:pl-[25%]   max-[1040px]:mt-29 max-[1040px]:pl-[20%]  max-[500px]:pl-0 max-[500px]:mt-30 max-[500px]:gap-y-20 '>
      {items.length < 1 ? (
        <NoItem />
      ) : (
        <>
          {items.map(item => (
            <section key={item.id} className='w-[23%] max-[1040px]:w-[29%] max-[800px]:w-[45%] h-80 max-[800px]:h-60 flex flex-col max-[500px]:w-[43%] max-[500px]:h-50'>
              <div className='h-[8%] flex justify-end  items-center pr-3 '>
                <FaHeart className='text-[#4140402a] hover:text-black' />
              </div>
              <div className='h-[85%] relative overflow-auto flex items-center justify-center'>
                <img
                  src={item.image}
                  className='h-full w-auto absolute'
                  alt='pho'
                />
              </div>
              <section className='flex w-full px-2 items-center h-[5%] justify-between text-[13px] max-[800px]:text-[11px] pt-5'>
                <div>{item.description}</div>
                <div>{item.price} $</div>
              </section>
            </section>
          ))}
        </>
      )}
    </section>
  )
}
