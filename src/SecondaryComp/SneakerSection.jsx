import Shoes from '../utils/shoes.js'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import ImageWithShimmer from '../reuse/shimmer.jsx'
gsap.registerPlugin(ScrollTrigger)

export default function Sneakers ({ lastcard }) {
  const shoe1ref = useRef(null)
  const shoe2ref = useRef(null)
  const isSmallLap = innerWidth <= 1100 && innerWidth >= 800
  const isTablet = innerWidth <= 800 && innerWidth >= 500
  const isMobile = innerWidth <= 480 && innerWidth >= 300

  useEffect(() => {
    ScrollTrigger.create({
      trigger: lastcard.current,
      start: 'top top',
      scrub: 3,
      animation: gsap.fromTo(
        shoe1ref.current,
        {
          opacity: 0.9,
          y: '-120vh',
          scale: 1.2,
          rotateZ: '-50deg',
          x: isTablet ? 80 : -50
        },
        {
          rotateZ: '0deg',
          opacity: 1,
          scale: 1,
          x: shoe1ref.current,
          y: shoe1ref.current
        }
      )
    })
    ScrollTrigger.create({
      trigger: lastcard.current,
      start: 'top top',
      scrub: 3,
  
      animation: gsap.fromTo(
        shoe2ref.current,
        {
          opacity: 0.9,
          y: '-120vh',
          scale: 1.2,
          rotateZ: '50deg',
          x: isSmallLap ? -50 : isTablet ? -140 : 50
        },
        {
          rotateZ: '0deg',
          opacity: 1,
          scale: 1,
          y: shoe2ref.current,
          x: shoe2ref.current
        }
      )
    })

    if (isMobile) {
      ScrollTrigger.create({
        trigger: lastcard.current,
        start: 'top top',
        scrub: 3,
        animation: gsap.fromTo(
          shoe1ref.current,
          {
            opacity: 0.9,
            y: '-90vh',
            scale: 1.2,
            rotateZ: '-50deg',
            x:  -50
          },
          {
            rotateZ: '0deg',
            opacity: 1,
            scale: 1,
            x: shoe1ref.current,
            y: shoe1ref.current
          }
        )
      })

      ScrollTrigger.create({
        trigger: lastcard.current,
        start: 'top top',
        scrub: 3,
    
        animation: gsap.fromTo(
          shoe2ref.current,
          {
            opacity: 0.9,
            y: '-100vh',
            scale: 1.2,
            rotateZ: '50deg',
            x:  50
          },
          {
            rotateZ: '0deg',
            opacity: 1,
            scale: 1,
            y: shoe2ref.current,
            x: shoe2ref.current
          }
        )
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
      <h1 className='text-black mt-50 font-extrabold text-3xl flex justify-center mb-15'>
        TRENDY SNEAKERS
      </h1>
      <section className='flex  h-80 mb-10 relative  w-full justify-center align-middle  max-[800px]:h-110  gap-10 px-10 max-[500px]:wrap-normal max-[500px]:gap-0 max-[500px]:px-1 max-[500px]:flex-wrap'>
        {Shoes.map(item => (
          <section
            ref={item.id === 1 ? shoe1ref : item.id === 4 ? shoe2ref : null}
            className=' h-full w-full max-[500px]:w-[50%] max-[500px]:h-[50%] '
            key={item.id}
          >
            <div className='w-full h-full relative z-10'>
              <ImageWithShimmer src={item.img} alt='photo' />
            </div>
          </section>
        ))}
      </section>
    </>
  )
}
