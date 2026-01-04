import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import {
  Home,
  UserCircle2,
  ShoppingBag,
  Lock,
  Heart,
  CreditCard,
  Settings,
  ShoppingBasket,
  Bitcoin
} from 'lucide-react'

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
    <section
      ref={box}
      className=' bg-white  max-[340px]:overflow-y-scroll fixed w-full   z-70  bottom-0 right-0 top-0 left-0 text-black pt-20 '
    >
      <section className='flex justify-between flex-col pb-20 h-max'>
        <section className='flex flex-col items-center    w-full'>
          <div className='w-20 h-20 rounded-[50%] bg-[#bfcce2b3] mb-5 justify-center items-center flex'>
            <UserCircle2 size={'80%'} />
          </div>
          <div>Guest</div>
          <div>Guest@gmail.com</div>

          <ul className='flex flex-col w-full mt-5'>
            <li
              onClick={() => {
                openLink('home')
              }}
              className=' border-t-[0.5px] pl-5 py-2 flex gap-3  items-center border-gray-500'
            >
              <Home size={20} />
              Home
            </li>
            <li
              onClick={() => {
                openLink('products')
              }}
              className=' border-t-[0.5px] pl-5 py-2 flex gap-3  items-center border-gray-500'
            >
              <ShoppingBag size={20} />
              All Clothing & Outfits
            </li>
            <li
              onClick={() => {
                openLink('cart')
              }}
              className='border-t-[0.5px] border-b-[0.5px] pl-5 py-2 flex gap-3  items-center border-gray-400'
            >
              <ShoppingBasket size={20} />
              My orders
            </li>
            <li
              onClick={() => {
                openLink('wishlist')
              }}
              className=' border-b-[0.5px]
           pl-5 py-2 flex gap-3  items-center border-gray-500'
            >
              <Heart size={20} />
              My wishlist
            </li>

            <li className=' border-b-[0.5px] pl-5 py-2 flex gap-3  items-center border-gray-500'>
              <CreditCard size={20} />
              Payment Method
            </li>
            <li className=' border-b-[0.5px] pl-5 py-2 flex gap-3  items-center border-gray-500'>
              <Bitcoin />
              Bonuses and Coupons
            </li>
            <li className=' border-b-[0.5px] pl-5 py-2 flex gap-3  items-center border-gray-500'>
              <Settings />
              Support
            </li>
            <li className='border-b-[0.5px]  pl-5  py-2 flex gap-3  items-center border-gray-500'>
              <Lock />
              Privacy Policy
            </li>
          </ul>
        </section>
        <button className='flex self-center border w-[80%]   justify-self-center justify-center py-3 mt-10 align-bottom'>
          Log Out
        </button>
      </section>
    </section>
  )
}
