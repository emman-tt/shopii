import { IoPersonOutline } from 'react-icons/io5'
import { BsCart4 } from 'react-icons/bs'
import { FaRegHeart } from 'react-icons/fa6'

export default function Header () {
  return (
    <section className='flex flex-row h-max py-2 justify-between px-10 items-center text-black max-[800px]:px-0 max-[500px]:px-5'>
      <section className='flex flex-row h-max font-semibold  gap-5 max-[500px]:hidden max-[800px]:text-[11px]'>
        <div>Catalog</div>
        <div>Collections</div>
        <div>Outfits</div>
      </section>

      <h1 className='text-3xl font-extrabold pr-20 max-[800px]:text-[15px] max-[800px]:font-bold max-[500px]:text-[30px] max-[500px]:pl-0'>
        SHOPII
      </h1>

      <section className='flex flex-row h-max text-xl  gap-7 max-[800px]:text-[13px]'>
        <div>
          <IoPersonOutline />
        </div>
        <div>
          <FaRegHeart />
        </div>
        <div>
          <BsCart4 />
        </div>
      </section>
    </section>
  )
}