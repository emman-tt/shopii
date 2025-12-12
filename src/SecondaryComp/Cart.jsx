import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
const API_URL = import.meta.env.VITE_PORT_URL
import InformationBox from './Information'
export default function Cart ({ showCart, setRecur, checkout, showCheckout }) {
  const array = [1, 2, 3, 4]
  const box = useRef(null)

  const [products, setProducts] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [shippingAmount, setShippingAmount] = useState(0)
  const [cartBottom, changeCartBottom] = useState(false)
  const [subTotal, setSubTotal] = useState(0)
  async function updateQuantity (id, qty) {
    try {
      setRecur(prev => prev + 1)
      setProducts(prev =>
        prev.map(item =>
          item.id === id
            ? {
                ...item,
                cartProduct: {
                  ...item.cartProduct,
                  quantity: Number(item.cartProduct.quantity) + Number(qty)
                }
              }
            : item
        )
      )
      const res = await fetch(
        `${API_URL}/UpdateCart?qty=${qty}&productID=${id}`,
        {
          method: 'PUT'
        }
      )
      // const result = await res.json()
      // if (result) {
      // }
    } catch (error) {
      console.log(error.message)
    }
  }

  async function removeFromCart (id) {
    try {
      setRecur(prev => prev - 1)
      setProducts(prev => prev.filter(item => item.id != id))
      const res = await fetch(`${API_URL}/RemoveCart?productID=${id}`, {
        method: 'DELETE'
      })

     

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    const sum = products.reduce((acc, item) => {
      const qty = Number(item.cartProduct?.quantity ?? 1)
      const price = Number(item.price ?? 0)
      return acc + price * qty
    }, 0)

    setSubTotal(sum.toFixed(2))
    const extraFee = Number(shippingAmount > 0 ? shippingAmount : 0)
    const calcTotal = extraFee + sum
    setTotalPrice(calcTotal.toFixed(2))
  }, [products, shippingAmount])

  useEffect(() => {
    ;(async function fetchCart () {
      const res = await fetch(`${API_URL}/fetchCart`, {
        method: 'GET'
      })
      if (res) {
        const items = await res.json()
        const data = items.products
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

  return (
    <section className='w-full h-full flex '>
      {checkout && (
        <InformationBox
          showCheckout={showCheckout}
          z={innerWidth <= 900 ? 60 : 40}
          changeCartBottom={changeCartBottom}
          setShippingAmount={setShippingAmount}
        />
      )}
      <section
        ref={box}
        className='fixed right-0 top-10 bottom-0 w-[45%] max-lg:w-full  bg-white z-50 flex flex-col h-full pb-15 gap-0 justify-between pt-5 px-15 max-xl:px-7 overflow-y-scroll [scrollbar-width:none] '
      >
        <section>
          <section className='flex w-full justify-between items-center'>
            <h2 className='text-4xl font-semibold'>Cart</h2>
            <div
              onClick={() => {
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
            h-120 max-[900px]:h-160
            p-4 max-sm:h-100
            pr-2 max-lg:p-0
          '
            >
              {products.map(item => (
                <section
                  key={item.id}
                  className='w-full h-50 shrink-0 flex border-b-[0.2px] border-gray-300  text-black gap-5 pb-5 max-[900px]:gap-0 '
                >
                  <figure className='w-[40%] grow   flex justify-center items-center h-full'>
                    <img
                      src={item.image}
                      className='h-full w-auto '
                      alt='photo'
                    />
                  </figure>
                  <section
                    className='flex flex-col max-[900px]:w-[60%]  px-3 w-full
                   justify-between'
                  >
                    <header className='flex w-full justify-between'>
                      <div className='flex flex-col'>
                        <div className='font-semibold max-sm:text-[14px] max-sm:w-[70%]'>
                          {item.description}
                        </div>
                        <div className='text-[13px] text-[#515151fe]'>
                          {`prod${-item.id}`}
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          removeFromCart(item.id)
                        }}
                        className='font-bold text-[13px] cursor-pointer'
                      >
                        X
                      </div>
                    </header>

                    <footer className='flex w-full justify-between max-sm:flex-col'>
                      <div className='text-[13px] text-[#515151fe]'>
                        <p>Color: {item.cartProduct.colour}</p>
                        <p>Size: {item.cartProduct.size}</p>
                      </div>

                      <div className='flex gap-10 font-semibold items-center'>
                        <section className='flex   gap-5'>
                          <button
                            onClick={() => {
                              item.cartProduct.quantity > 1
                                ? updateQuantity(item.id, -1)
                                : null
                            }}
                            className='cursor-pointer'
                          >
                            -
                          </button>
                          {item.cartProduct.quantity}
                          <button
                            onClick={() => {
                              updateQuantity(item.id, 1)
                            }}
                            className='cursor-pointer'
                          >
                            +
                          </button>
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
          <header className='flex w-full justify-between font-semibold flex-col border-t border-b border-gray-300 py-6 px-4 max-[325px]:px-1'>
            <div className='flex w-full justify-between'>
              <p>SubTotal :</p>
              <p>{subTotal} $</p>
            </div>
            <div className='flex w-full justify-between'>
              <p>Shipping :</p>
              {cartBottom ? (
                <p>{shippingAmount > 0 ? shippingAmount + '.00 $' : 'free'}</p>
              ) : (
                <p className='max-sm:text-xs'>Calculated at the next step</p>
              )}
            </div>
          </header>

          <footer className='flex w-full justify-between font-semibold px-4 mt-2'>
            <div>Total:</div>
            <div>{totalPrice}$</div>
          </footer>

          {cartBottom ? (
            ''
          ) : (
            <button
              onClick={() => {
                changeCartBottom(true)
                showCheckout(true)
              }}
              className='w-[60%] mt-2 flex self-center justify-self-center bg-black text-white py-3 items-center justify-center font-bold max-sm:w-full'
            >
              Check out
            </button>
          )}
        </section>
      </section>
    </section>
  )
}
