import Header from '../PrimaryComp/header'
import FeaturesComp from '../reuse/SPPcomp'
import { useState } from 'react'
import { FaRegHeart } from 'react-icons/fa6'
import { FaHeart } from 'react-icons/fa'
import ImageWithShimmer from '../reuse/shimmer'
import { useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SPP () {
  const [qty, setQty] = useState(1)
  const [clicked, setClicked] = useState(false)
  const [data, setData] = useState([])
  const [size, selectSize] = useState('m')
  const [color, setColor] = useState(null)
  const { state } = useLocation()
  const itemRef = useRef(null)
  const cartRef = useRef(null)

  const PORT = 'http://localhost:3000'
  useEffect(() => {
    const details = state.details
    console.log(details)
    setColor(details.colours[0])
    setData([details])
  }, [])

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
      // x: 260,
      // y: -600,
      left: itemPos.left,
      right: itemPos.top,
      width: itemPos.width,
      scale: 0.7,
      height: itemPos.height
    })

    gsap.to(clone, {
      x: cartPos.left,
      y: -700,
      width: cartPos.width,
      height: cartPos.height,
      duration: 1.9,
      ease: 'power2.inOut',
      onComplete: () => clone.remove()
    })
  }
  async function saveToCart (id) {
    try {
      const res = await fetch(
        `${PORT}/api/cart?itemID=${id}&size=${size}&color=${color}&quantity=${qty}`,
        {
          method: 'POST'
        }
      )
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <section className='w-screen h-screen  overflow-hidden'>
      <Header cartRef={cartRef} />
      {data.map(item => (
        <section key={item.id} className='flex w-screen px-[12%] mt-5'>
          <section className=' h-[full]  flex place-content-center w-[60%]'>
            <img ref={itemRef} className={'h-[60%] w-auto'} src={item.image} />
          </section>
          <section className=' grow px-5 gap-7 flex flex-col'>
            <section className='flex justify-between border-b pb-2 pt-5 '>
              <section className='flex flex-col'>
                <div className=' text-[13px]'>{item.name}</div>
                <div className='font-bold text-[20px]'>{item.description}</div>
              </section>

              <div className='font-bold text-[20px] place-content-center pr-7'>
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
      ))}
    </section>
  )
}
