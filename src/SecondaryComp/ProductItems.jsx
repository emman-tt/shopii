import { FaRegHeart } from 'react-icons/fa6'
import { FaHeart } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { IoHeart } from 'react-icons/io5'
export default function Items ({ items }) {
  // const [isHovered, setIsHovered] = useState(false)

  return (
    <section className='w-[90%] min-h-max flex flex-wrap gap-y-15 gap-10 justify-end mt-21'>
      {items.map(item => (
        <section key={item.id} className='w-[23%]   h-80 flex flex-col'>
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
          <section className='flex w-full px-2 items-center h-[5%] justify-between text-[13px] pt-5'>
            <div>{item.description}</div>
            <div>{item.price} $</div>
          </section>
        </section>
      ))}
    </section>
  )
}
