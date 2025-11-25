import Header from '../PrimaryComp/header'
import FeaturesComp from '../reuse/SPPcomp'
import { useState } from 'react'
import { FaRegHeart } from 'react-icons/fa6'
import { FaHeart } from 'react-icons/fa'
import ImageWithShimmer from '../reuse/shimmer'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export default function SPP () {
  const [qty, setQty] = useState(1)
  const [clicked, setClicked] = useState(false)
  const [data, setData] = useState([])
  const [size, selectSize] = useState(null)
  const [color, setColor] = useState(null)

  const { state } = useLocation()
  useEffect(() => {
    const details = state.details
    console.log(details)
    setData([details])
  }, [])

  return (
    <section className='w-screen h-screen  overflow-hidden'>
      <Header />
      {data.map(item => (
        <section key={item.id} className='flex w-screen px-[12%] mt-5'>
          <section className=' h-[full]  flex place-content-center w-[60%]'>
            <img className={'h-[60%] w-auto'} src={item.image} />
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
              w={15}
              h={15}
              className={'flex justify-between border-b pb-3'}
              feature='Colours'
              colour={true}
              chlidren={[
                { name: 'red', selected: false },
                { name: 'green', selected: false },
                { name: 'yellow', selected: false },
                { name: 'blue', selected: false }
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
              <button className='bg-black rounded-[10px] w-[65%] text-white py-2.5'>
                Add To Cart
              </button>
              <button
                onClick={() => setClicked(!clicked)}
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
