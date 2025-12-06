import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
const API_URL = import.meta.env.VITE_PORT_URL
import InformationBox from './Information'
export default function Cart ({ showCart }) {
  const array = [1, 2, 3, 4]
  const box = useRef(null)
  const [products, setProducts] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  function removeFromCart (id) {
    setProducts(prev => prev.filter(item => item.id != id))
  }

  useEffect(() => {
    const sum = products.reduce((acc, item) => {
      return acc + item.price
    }, 0)

    setTotalPrice(sum.toFixed(2))
  }, [products])

  useEffect(() => {
    ;(async function fetchCart () {
      const res = await fetch(`${API_URL}/fetchCart`, {
        method: 'GET'
      })
      if (res) {
        const items = await res.json()
        const data = items.products

        // const sum = data.reduce((acc, item) => {
        //   return acc + item.price
        // }, 0)

        // setTotalPrice(sum.toFixed(2))
        setProducts(data.reverse())
      }
    })()
  }, [])

  useEffect(() => {
    gsap.fromTo(
      box.current,
      {
        x: 100
      },
      {
        x: box.current,
        duration: 0.5,
        ease: 'elastic'
      }
    )
  }, [])

  function moveCart () {
    gsap.to(box.current, {
      x: 800,
      ease: 'power1.inOut',
      duration: 0.1,
      onComplete: () => {
        showCart(false)
      }
    })
  }

  useEffect(() => {}, [])

  return (
    <section className='w-full h-full flex bg-amber-300'>
    
        
        <InformationBox/>
  
      <section
        ref={box}
        className='fixed right-0 top-10 bottom-0 w-[45%] bg-white z-50 flex flex-col h-full pb-15 gap-0 justify-between pt-5 px-15'
      >
        <section>
          <section className='flex w-full justify-between items-center'>
            <h2 className='text-4xl font-semibold'>Cart</h2>
            <div
              onClick={() => {
                // showCart(false)
                moveCart()
              }}
              className='underline pb-1 text-m cursor-pointer'
            >
              Close
            </div>
          </section>

          <section className='flex-1 bg-white rounded-lg overflow-hidden'>
            <section
              className='
            flex 
            flex-col 
            gap-3 
            overflow-y-auto 
            h-120
            p-4
            pr-2
          '
            >
              {products.map(item => (
                <section
                  key={item.id}
                  className='w-full h-50 shrink-0 flex border-b-[0.2px] border-gray-300  text-black gap-5 pb-5'
                >
                  <figure className='  w-[40%] flex justify-center items-center h-full'>
                    <img
                      src={item.image}
                      className='h-full w-auto'
                      alt='photo'
                    />
                  </figure>
                  <section className='flex flex-col px-3 w-full justify-between'>
                    <header className='flex w-full justify-between'>
                      <div className='flex flex-col'>
                        <div className='font-semibold'>{item.description}</div>
                        <div className='text-[13px] text-[#515151fe]'>
                          id293njds
                        </div>
                      </div>
                      <div
                        onClick={() => removeFromCart(item.id)}
                        className='font-bold text-[13px] cursor-pointer'
                      >
                        X
                      </div>
                    </header>

                    <footer className='flex w-full justify-between '>
                      <div className='text-[13px] text-[#515151fe]'>
                        <p>Color: {item.cartProduct.colour}</p>
                        <p>Size: {item.cartProduct.size}</p>
                      </div>

                      <div className='flex gap-10 font-semibold items-center'>
                        <section className='flex   gap-5'>
                          <button className='cursor-pointer'>-</button>
                          {item.cartProduct.quantity}
                          <button className='cursor-pointer'>+</button>
                        </section>

                        <p>{item.price}$</p>
                      </div>
                    </footer>
                  </section>
                </section>
              ))}
            </section>
          </section>
        </section>
        <section className=' h-full  w-full '>
          <header className='flex w-full justify-between font-semibold flex-col border-t border-b border-gray-300 py-6 px-4'>
            <div className='flex w-full justify-between'>
              <p>SubTotal :</p>
              <p>{totalPrice} $</p>
            </div>
            <div className='flex w-full justify-between'>
              <p>Shipping :</p>
              <p>Calculated at the next step</p>
            </div>
          </header>

          <footer className='flex w-full justify-between font-semibold px-4 mt-2'>
            <div>Total:</div>
            <div>{totalPrice}$</div>
          </footer>

          <button className='w-[60%] mt-2 flex self-center justify-self-center bg-black text-white py-3 items-center justify-center font-bold'>
            Check out
          </button>
        </section>
      </section>
    </section>
  )
}
