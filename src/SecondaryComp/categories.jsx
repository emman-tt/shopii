import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import { useRef, useEffect, useReducer, useState } from 'react'
import watchimg from '../assets/img/watch.png'
import shoesimg from '../assets/img/shoes.png'
import categoryMiddle from '../assets/img/categoryMiddle.png'
import { BsArrowUpRight } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { categoriesList } from '../utils/categories'

export default function Categories ({ heroLeft, heroRight, state, dispatch }) {
  const navigate = useNavigate()
  const categoriesLeft = useRef(null)
  const categoriesMiddle = useRef(null)
  const categoriesRight = useRef(null)
  const isMobile = innerWidth <= 500
  const [shouldNavigate, setShouldNavigate] = useState(false)
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRight.current,
        start: isMobile ? '+=100px' : 'bottom 90%',
        scrub: 7
      }
    })
    tl.fromTo(
      categoriesLeft.current,
      { y: 500, opacity: 0.3 },
      { y: 0, opacity: 1 }
    )
      .fromTo(
        categoriesMiddle.current,
        { y: 500, opacity: 0.3 },
        { y: 0, opacity: 1 }
      )
      .fromTo(
        categoriesRight.current,
        {
          y: 300,
          opacity: 0.3
        },
        {
          y: 0,
          opacity: 1
        }
      )
  }, [])

  useEffect(() => {
    if (shouldNavigate) {
      navigate('/products')

      setShouldNavigate(false)
    }
  }, [shouldNavigate])

  async function OpenLinks (genderId, categoryId) {
    try {
      dispatch({ type: 'changeGender', payload: genderId })
      dispatch({ type: 'changeCategory', payload: categoryId })
      dispatch({ type: 'changeFilterCategory', payload: categoryId })
      dispatch({ type: 'changeFilterColor', payload: 'All' })
      dispatch({ type: 'changeColour', payload: 'all' })
      setShouldNavigate(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <section className='sm:hidden  h-60 w-full mt-15 '>
        <div className='text-3xl text-black  flex font-bold pl-9'>
          Categories
        </div>

        <section className=' w-full [scrollbar-width:none] overflow-scroll'>
          <section className=' w-max overflow-x-hidden flex gap-10 h-50 p-5'>
            {categoriesList.map(item => (
              <div
                onClick={() => {
                  OpenLinks(item.gender, item.category)
                }}
                key={item.id}
                className='border h-full w-40 rounded-3xl relative '
              >
                <div className='absolute w-full h-full flex justify-center overflow-hidden'>
                  <img src={item.image} className='h-full' alt='image' />
                </div>
                <span className='bg-indigo-50 w-[70%] absolute bottom-3 flex text-center rounded-[13px] p-1 text-[13px] left-5 justify-center'>
                  {item.text}
                </span>
              </div>
            ))}
          </section>
        </section>
      </section>
      <section className='h-250 max-[1100px]:h-200 max-[800px]:h-140 bg-white mt-40 flex  flex-col px-5 pb-10 max-[500px]:h-max max-sm:hidden'>
        <div className='text-3xl text-black justify-center items-center flex font-bold'>
          Categories
        </div>

        <section className='h-full gap-5 max-[1100px]:gap-1  mt-5 flex flex-row max-[500px]:flex-col max-[500px]:h-250  max-[500px]:gap-14'>
          <section
            onClick={() => navigate('/products')}
            ref={categoriesLeft}
            className=' w-23/100 h-[60%] max-[500px]:w-full max-[500px]:h-[25%]'
          >
            <div className='w-full flex h-73/100 max-[1100px]:h-[60%] justify-center items-center  bg-[#b1b1bb25]  max-[800px]:h-full'>
              <img src={watchimg} className=' max-[500px]:h-full' alt='photo' />
            </div>
            <div className='text-xl text-black font-semibold pl-10 flex gap-10 items-center pt-5 max-[800px]:text-[15px] max-[800px]:gap-5 max-[800px]:pt-1 max-[800px]:pl-2 hover:opacity-[0.4] cursor-pointer'>
              Accesories
              <BsArrowUpRight className='font-extrabold text-xl max-[800px]:text-xs' />
            </div>
          </section>
          <section
            onClick={() => navigate('/products')}
            ref={categoriesMiddle}
            className=' w-60/100 h-auto max-[500px]:w-full max-[500px]:h-[70%]'
          >
            <div className='w-full h-93/100 flex items-center justify-center  bg-[#b1b1bb25]'>
              <img
                src={categoryMiddle}
                className='w-75/100 max-[330px]:w-full'
                alt='photo'
              />
            </div>
            <div className='text-xl pt-5  text-black font-semibold pl-10 flex gap-10 items-center max-[800px]:text-[15px] max-[800px]:gap-5 max-[800px]:pt-1 max-[800px]:pl-2 hover:opacity-[0.4] cursor-pointer'>
              Clothes
              <BsArrowUpRight className='font-extrabold text-xl max-[800px]:text-xs' />
            </div>
          </section>
          <section
            onClick={() => navigate('/products')}
            ref={categoriesRight}
            className='w-25/100 h-50/100 flex flex-col self-end max-[500px]:w-full max-[500px]:h-[25%]'
          >
            <div className='w-full h-full p-0  flex items-center max-[800px]:h-full'>
              <img className=' bg-[#b1b1bb25]' src={shoesimg} alt='photo' />
            </div>
            <div className='text-xl text-black font-semibold pl-10 flex gap-10  items-center max-[800px]:text-[15px] max-[800px]:gap-5 max-[800px]:pt-1 max-[800px]:pl-2 hover:opacity-[0.4] cursor-pointer'>
              Shoes
              <BsArrowUpRight className='font-extrabold text-xl max-[800px]:text-xs' />
            </div>
          </section>
        </section>
      </section>
    </>
  )
}
