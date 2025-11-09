import { useRef } from 'react'
import { gsap } from 'gsap'
import ImageWithShimmer from '../reuse/shimmer'
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(SplitText)
import heroLeftimg from '../assets/img/heroLeft.png'
import heroRightimg from '../assets/img/heroRight.png'
import { BsArrowUpRight } from 'react-icons/bs'

import { useEffect } from 'react'

export default function Hero ({ heroLeft, heroRight }) {
  const heroLeftText = useRef(null)
  const heroRightText = useRef(null)
  useEffect(() => {
    const heroLeftSplit = new SplitText(heroLeftText.current, {
      type: 'chars,words,lines'
    })
    const heroRightSplit = new SplitText(heroRightText.current, {
      type: 'chars,words,lines'
    })

    gsap.from([heroLeftSplit.chars, heroRightSplit.chars], {
      opacity: 0,
      y: 40,
      stagger: 0.09,
      duration: 0.8,
      ease: 'back'
    })

    gsap.fromTo(
      heroLeft.current,
      { x: -1000 },
      {
        x: heroLeft.current,
        duration: 2,
        ease: 'power3.out'
      }
    )

    gsap.fromTo(
      heroRight.current,
      {
        x: 1000
      },
      {
        x: heroRight.current,
        duration: 3,
        ease: 'power3.out'
      }
    )
  }, [])

  return (
    <>
      <section
        id='hero'
        className='h-150 px-5 flex gap-5 mt-5 max-[800px]:h-100 max-[500px]:flex-col max-[500px]:h-max overflow-hidden'
      >
        <div
          ref={heroLeft}
          className='w-50/100 flex justify-center items-center  text-black bg-[#79797a1c] max-[500px]:w-full 
          max-[500px]:h-[70%]'
        >
          <ImageWithShimmer
            src={heroLeftimg}
            className='flex h-[89%] max-[1100px]:w-[70%] max-[500px]:h-[140%] w-[60%]  items-center'
            alt='photo'
          />
        </div>
        <div
          ref={heroRight}
          className='w-50/100 flex justify-center bg-[#79797a1c]  text-black max-[500px]:w-full max-[500px]:h-70/100'
        >
          <ImageWithShimmer src={heroRightimg} className='flex  self-center  ' alt='phot0' />
        </div>
      </section>

      <div className=' flex gap-10 mt-3 max-[800px]:text-[15px] text-2xl text-black font-bold'>
        <div className='w-50/100 justify-center pl-0 flex flex-row gap-6 items-center  hover:opacity-[0.4] cursor-pointer'>
          <div ref={heroLeftText}>Limited Edition</div>

          <BsArrowUpRight className='font-extrabold text-3xl max-[800px]:text-sm' />
        </div>
        <div className='w-50/100 pl-0 justify-center flex flex-row gap-6 items-center hover:opacity-[0.4] cursor-pointer'>
          <div ref={heroRightText}>New Arrivals</div>
          <BsArrowUpRight className='font-extrabold text-3xl max-[800px]:text-sm' />
        </div>
      </div>
    </>
  )
}
