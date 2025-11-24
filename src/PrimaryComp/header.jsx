import { IoPersonOutline } from 'react-icons/io5'
import { BsCart4 } from 'react-icons/bs'
import { FaRegHeart } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'

export default function Header ({ fixed = false }) {
  const navigate = useNavigate()
  const isMobile = innerWidth < 500
  function openLink () {
    navigate('/products')
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
              zIndex: 3,
              backgroundColor: '#fff'
            }
          : {}
      }
      className='flex flex-row h-max py-2 justify-between px-10 items-center text-black max-[800px]:px-5 max-[500px]:px-5 '
    >
      {isMobile ? (
        <div className='text-2xl pr-7'>
          <GiHamburgerMenu />
        </div>
      ) : (
        <section className='flex flex-row h-max font-semibold  gap-5 max-[500px]:hidden max-[800px]:text-[11px] cursor-pointer '>
          <div onClick={openLink}>Catalog</div>
          <div onClick={openLink}>Products</div>
          <div onClick={openLink}>Outfits</div>
        </section>
      )}
      <h1
        onClick={() => navigate('/')}
        className='text-3xl font-extrabold pr-20 max-[800px]:text-[15px] max-[800px]:font-bold max-[500px]:text-[32px] max-[500px]:pl-0 cursor-pointer  max-[500px]:pr-0 max-[500px]:hidden'
      >
        SHOPII
      </h1>

      <section className='flex flex-row h-max text-xl  gap-7 max-[800px]:text-[13px] max-[500px]:gap-4 max-[500px]:text-[15px]'>
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
