import { BiCart, BiHeart, BiCard } from 'react-icons/bi'
import { BsPerson } from 'react-icons/bs'
import { FaCoins } from 'react-icons/fa'
import { FaGears } from 'react-icons/fa6'
import { GiPadlock } from 'react-icons/gi'
import { CgProfile } from 'react-icons/cg'
import { CgHome } from 'react-icons/cg'
import { BsShop } from 'react-icons/bs'
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

export default function mobileMenu ({ showMenu, showCart, showCheckout }) {
  const navigate = useNavigate()
  const box = useRef(null)

  function openLink (item) {
    showMenu(false)
    showCart(false)
    showCheckout(false)
    const use = item.toLowerCase()
    use === 'home'
      ? navigate('/')
      : use === 'products'
      ? navigate('/products')
      : use === 'cart'
      ? showCart(true)
      : use === 'wishlist'
      ? navigate('/wishlist')
      : navigate('/')
  }

  useEffect(() => {
    gsap.fromTo(
      box.current,
      {
        x: -100
      },
      {
        x: box.current,
        duration: 0.6,
        ease: 'bounce'
      }
    )
  }, [])


  return (
    <section ref={box} className='bg-white fixed w-full h-screen  z-70 bottom-0 right-0 top-0 left-0 text-black pt-20'>
      <section className='flex justify-between flex-col h-[95%]'>
        <section className='flex flex-col items-center   w-full'>
          <div className='w-20 h-20 rounded-[50%] bg-[#bfcce2b3] mb-5 justify-center items-center flex'>
            <CgProfile size={'80%'} />
          </div>
          <div>Emmanuel</div>
          <div>emmanuel@gmail.com</div>

          <ul className='flex flex-col w-full mt-5'>
            <li
              onClick={() => {
                openLink('home')
              }}
              className=' border-t-[0.5px] pl-5 py-2 flex gap-3  items-center border-gray-500'
            >
              <CgHome size={20} />
              Home
            </li>
            <li
              onClick={() => {
                openLink('products')
              }}
              className=' border-t-[0.5px] pl-5 py-2 flex gap-3  items-center border-gray-500'
            >
              <BsShop size={20} />
              All Clothing & Outfits
            </li>
            <li
              onClick={() => {
                openLink('cart')
              }}
              className='border-t-[0.5px] border-b-[0.5px] pl-5 py-2 flex gap-3  items-center border-gray-400'
            >
              <BiCart size={20} />
              My orders
            </li>
            <li
              onClick={() => {
                openLink('wishlist')
              }}
              className=' border-b-[0.5px]
           pl-5 py-2 flex gap-3  items-center border-gray-500'
            >
              <BiHeart size={20} />
              My wishlist
            </li>

            <li className=' border-b-[0.5px] pl-5 py-2 flex gap-3  items-center border-gray-500'>
              <BiCard size={20} />
              Payment Method
            </li>
            <li className=' border-b-[0.5px] pl-5 py-2 flex gap-3  items-center border-gray-500'>
              <FaCoins />
              Bonuses and Coupons
            </li>
            <li className=' border-b-[0.5px] pl-5 py-2 flex gap-3  items-center border-gray-500'>
              <FaGears />
              Support
            </li>
            <li className='border-b-[0.5px]  pl-5  py-2 flex gap-3  items-center border-gray-500'>
              <GiPadlock />
              Privacy Policy
            </li>
          </ul>
        </section>
        <button className='flex self-center border w-[80%]  justify-self-center justify-center py-3 align-bottom'>
          Log Out
        </button>
      </section>
    </section>
  )
}
