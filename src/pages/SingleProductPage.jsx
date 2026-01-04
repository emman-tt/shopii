import Header from '../PrimaryComp/header'
import FeaturesComp from '../reuse/SPPcomp'
import { useContext, useState } from 'react'
import { FaRegHeart } from 'react-icons/fa6'
import { FaHeart } from 'react-icons/fa'
const API_URL = import.meta.env.VITE_PORT_URL
import { useRef } from 'react'
import gsap from 'gsap'
import useFecthingSPP from '../hooks-and-reducers/useFetchingSPP'
import Loader from '../reuse/loadingAnime'
import { lazy } from 'react'
import { FilterContext } from '../App'
const MobileMenu = lazy(() => import('../reuse/mobileMenu'))
const Overlay = lazy(() => import('../reuse/overlay'))
const CartUi = lazy(() => import('../SecondaryComp/Cart'))
const PageNavigation = lazy(() => import('../SecondaryComp/pageNavigation'))
const Notification = lazy(() => import('../reuse/Notification'))
export default function SPP ({
  menu,
  showMenu,
  showCart,
  cart,
  checkout,
  showCheckout
}) {
  const [qty, setQty] = useState(1)
  const [clicked, setClicked] = useState(false)
  const [size, selectSize] = useState('m')
  const [color, setColor] = useState(null)
  const [message, showMessage] = useState(false)
  const { state, dispatch } = useContext(FilterContext)
  const { recur } = state
  const itemRef = useRef(null)
  const cartRef = useRef(null)

  const { isLoaded, data } = useFecthingSPP(setColor, recur)

  function Anime () {
    const clone = itemRef.current.cloneNode(true)
    Object.assign(clone.style, {
      position: 'absolute',
      zIndex: -1,
      pointerEvents: 'none'
    })
    document.body.appendChild(clone)

    const itemPos = itemRef.current.getBoundingClientRect()
    const cartPos = cartRef.current.getBoundingClientRect()

    gsap.set(clone, {
      left: itemPos.left,
      top: itemPos.top,
      width: itemPos.width,
      scale: 0.7,
      height: itemPos.height
    })

    gsap.to(clone, {
      left: cartPos.left,
      top: cartPos.top,
      width: cartPos.width,
      height: cartPos.height,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => clone.remove()
    })
  }
  async function saveToCart (id) {
    showMessage(true)
    try {
      dispatch({ type: 'fetchTotal' })
      setTimeout(() => {
        showMessage(false)
      }, 2000)
      const res = await fetch(
        `${API_URL}/cart?itemID=${id}&size=${size}&color=${color}&quantity=${qty}`,
        {
          method: 'POST',
          credentials: 'include',
        }
      )
      if (res.ok) {
        dispatch({ type: 'fetchTotal' })
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <section className='w-full h-full lg:overflow-hidden overflow-x-hidden relative[scrollbar-width:none] pt-15'>
      {message && <Notification />}
      <Header
        showCart={showCart}
        menu={menu}
        showMenu={showMenu}
        cartRef={cartRef}
        fixed={true}
        showCheckout={showCheckout}
      />
      <PageNavigation top={5} pt={10} />
      {menu && (
        <MobileMenu
          showCart={showCart}
          showCheckout={showCheckout}
          showMenu={showMenu}
        />
      )}
      {cart && <Overlay showCart={showCart} />}
      {cart && (
        <CartUi
          checkout={checkout}
          showCheckout={showCheckout}
          showCart={showCart}
        />
      )}

      {!isLoaded ? (
        <section className='w-full flex justify-center items-center align-middle h-screen   max-[800px]:pl-20 max-[500px]:pl-0 max-[500px]:w-full z-0 overflow-x-hidden '>
          <Loader />
        </section>
      ) : (
        data.map(item => (
          <section
            key={item.id}
            className='flex md:px-[4%] lg:px-[12%] mt-15 pb-20   max-[900px]:flex-col '
          >
            <section className=' h-130   flex place-content-center w-[60%] max-sm:w-full max-sm:h-100  '>
              <img
                ref={itemRef}
                className={'h-full w-auto  max-sm:h-full'}
                src={item.image}
              />
            </section>
            <section className=' grow px-5 gap-7 flex flex-col '>
              <section className='flex justify-between border-b pb-2 pt-5 '>
                <section className='flex flex-col'>
                  <div className=' text-[13px]'>{item.name}</div>
                  <div className='text-[20px] font-bold max-[430px]:text-[15px]'>
                    {item.description}
                  </div>
                </section>

                <div className='font-bold text-[20px] max-[430px]:text-[17px] place-content-center pr-7 max-md:pr-0'>
                  ${item.price}
                </div>
              </section>
              <FeaturesComp
                setColor={setColor}
                setSize={selectSize}
                feature='Size'
                chlidren={[
                  { name: 'xs', selected: false },
                  { name: 's', selected: false },
                  { name: 'm', selected: true },
                  { name: 'l', selected: false },
                  { name: 'xl', selected: false },
                  { name: 'xxl', selected: false }
                ]}
                className={'flex justify-between border-b pb-3'}
              />
              <FeaturesComp
                setColor={setColor}
                setSize={selectSize}
                size={size}
                w={15}
                h={15}
                className={'flex justify-between border-b pb-3'}
                feature='Colours'
                colour={true}
                chlidren={[
                  { name: 'red', selected: false },
                  { name: 'green', selected: false },
                  { name: 'yellow', selected: false },
                  { name: 'blue', selected: false },
                  { name: 'black', selected: true },
                  { name: 'white', selected: false }
                ]}
              />

              <section className='flex justify-between pb-2 border-b'>
                <div>Quantity</div>
                <section className='flex gap-5 text-[20px]'>
                  <button
                    onClick={() => (qty > 1 ? setQty(qty - 1) : null)}
                    className=' bg-[#8d8a8a2a] rounded-[10px] px-4 font-bold'
                  >
                    -
                  </button>
                  <div>{qty}</div>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className='flex place-content-center bg-[#8d8a8a2a] rounded-[10px] px-4 font-bold'
                  >
                    +
                  </button>
                </section>
              </section>

              <section className='flex justify-between gap-4'>
                <button
                  onClick={() => {
                    Anime(), saveToCart(item.id)
                  }}
                  className='bg-black rounded-[10px] w-[65%] text-white py-2.5'
                >
                  Add To Cart
                </button>
                <button
                  onClick={() => {
                    setClicked(!clicked)
                  }}
                  className='grow border rounded-[10px] hover:bg-[#3d3c3c37] flex h-inherit justify-center gap-3'
                >
                  <div className='flex self-center'>wishlist</div>
                  {clicked ? (
                    <FaHeart className='align-middle self-center flex' />
                  ) : (
                    <FaRegHeart className='align-middle self-center flex' />
                  )}
                </button>
              </section>
              <section>
                <div className='font-bold text-[13px]'>Estimated Delivery</div>
                <div className='text-[14px]'>Dec 1 - Dec 9</div>
              </section>

              <section>
                <p className='font-bold text-[20px]'>Highlights</p>
                <ul className='list-disc pl-7'>
                  {Array.from({ length: item.highlights.length }, (_, i) => (
                    <li key={i}>{item.highlights[i]}</li>
                  ))}
                </ul>
              </section>
            </section>
          </section>
        ))
      )}
    </section>
  )
}
