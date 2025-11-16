import { IoPersonOutline } from 'react-icons/io5'
import { BsCart4 } from 'react-icons/bs'
import { FaRegHeart } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

export default function Header ({ fixed = false }) {
  const navigate = useNavigate()

  function openLink () {
    navigate('/shopii/products')
  }

  return (
    <section
      style={
        fixed
          ? {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1,
              backgroundColor: '#fff'
            }
          : {}
      }
      className='flex flex-row h-max py-2 justify-between px-10 items-center text-black max-[800px]:px-0 max-[500px]:px-5'
    >
      <section className='flex flex-row h-max font-semibold  gap-5 max-[500px]:hidden max-[800px]:text-[11px] cursor-pointer'>
        <div onClick={openLink}>Catalog</div>
        <div onClick={openLink}>Products</div>
        <div onClick={openLink}>Outfits</div>
      </section>

      <h1
        onClick={() => navigate('/shopii/')}
        className='text-3xl font-extrabold pr-20 max-[800px]:text-[15px] max-[800px]:font-bold max-[500px]:text-[30px] max-[500px]:pl-0 cursor-pointer'
      >
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
