import { IoPersonOutline } from 'react-icons/io5'
import { BsCart4 } from 'react-icons/bs'
import { FaRegHeart } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useEffect } from 'react'
import { FaXmark } from 'react-icons/fa6'
import { useState } from 'react'
const API_URL = import.meta.env.VITE_PORT_URL
export default function Header ({
  fixed = false,
  cartRef,
  recur,
  showCart,
  showMenu,
  menu,
  showCheckout
}) {
  const navigate = useNavigate()
  const isMobile = innerWidth < 500
  const [total, setTotal] = useState(0)

  function openLink () {
    showCart(false)
    showCheckout(false)
    navigate('/products')
  }

  useEffect(() => {
    ;(async function fetchTotal () {
      try {
        const res = await fetch(`${API_URL}/api/fetchTotal`, {
          method: 'PUT'
        })

        const use = await res.json()
        if (use) {
          setTotal(use.total)
        }
      } catch (error) {
        console.log(error.message)
      }
    })()
  }, [recur])
  return (
    <section className='h-full w-full z-100 relative overflow-hidden '>
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
          <div
            onClick={() => {
              showMenu(prev => !prev)
            }}
            className='text-4xl pr-7'
          >
            {menu ? <FaXmark /> : <GiHamburgerMenu />}
          </div>
        ) : (
          <section className='flex flex-row h-max font-semibold  gap-5 max-[500px]:hidden max-[800px]:text-[11px] cursor-pointer '>
            <div onClick={openLink}>Catalog</div>
            <div onClick={openLink}>Products</div>
            <div onClick={openLink}>Outfits</div>
          </section>
        )}
        <h1
          onClick={() => {
            navigate('/'), showCheckout(false), showCart(false)
          }}
          className='text-3xl font-extrabold pr-20 max-[800px]:text-[15px] max-[800px]:font-bold max-[500px]:text-[32px] max-[500px]:pl-0 cursor-pointer  max-[500px]:pr-0 max-[500px]:hidden'
        >
          SHOPII
        </h1>

        <section className='flex flex-row h-max text-xl  gap-7 max-[800px]:text-[13px] max-[500px]:gap-6 max-[500px]:text-[19px]'>
          <div>
            <IoPersonOutline className='cursor-pointer' />
          </div>
          <div>
            <FaRegHeart className='cursor-pointer' />
          </div>
          <div
            onClick={() => {
              showCheckout(false)
              showCart(true)
            }}
            className='relative cursor-pointer'
            ref={cartRef}
          >
            <div className='absolute h-6 w-6 text-[18px] -top-2 -right-4 text-white rounded-[50%] bg-red-600 flex items-center justify-center  max-sm:h-5 max-sm:w-5'>
              {total}
            </div>
            <BsCart4 />
          </div>
        </section>
      </section>
    </section>
  )
}
