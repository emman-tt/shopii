import { IoPersonOutline } from 'react-icons/io5'
import { BsCart4 } from 'react-icons/bs'
import { FaRegHeart } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useEffect } from 'react'
import { useState } from 'react'
export default function Header ({ fixed = false, cartRef,recur,setRecur }) {
  const navigate = useNavigate()
  const isMobile = innerWidth < 500
  const [total, setTotal] = useState(0)
  function openLink () {
    navigate('/products')
  }
  const PORT = 'http://localhost:3000'

  useEffect(() => {
    console.log(recur)
    ;(async function fetchTotal () {
      try {
        const res = await fetch(`${PORT}/api/fetchTotal`, {
          method: 'PUT'
        })

        // console.log(res)

        const use = await res.json()
        if (use) {
          console.log(use)
          setTotal(use.total)
        }
      } catch (error) {
        console.log(error.message)
      }
    })()
  }, [recur])
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
        <div className='relative' ref={cartRef}>
          <div className='absolute h-6 w-6 text-[18px] -top-2 -right-4 text-white rounded-[50%] bg-red-600 flex place-content-center'>
            {total}
          </div>
          <BsCart4 />
        </div>
      </section>
    </section>
  )
}
