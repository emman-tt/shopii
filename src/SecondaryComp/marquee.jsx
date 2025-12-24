import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { marquesListOne, marquesListTwo } from '../utils/marques'
export default function Marquee () {
  const trackOneRef = useRef(null)
  const trackTwoRef = useRef(null)

  useEffect(() => {
    const trackOne = trackOneRef.current
    const trackTwo = trackTwoRef.current

    if (!trackOne || !trackTwo) {
      return
    }
    const widthOne = trackOne.scrollWidth / 2
    const widthTwo = trackTwo.scrollWidth / 2

    const tween1 = gsap.to(trackOne, {
      x: -widthOne,
      duration: 10,
      ease: 'none',
      repeat: -1
    })

    const tween2 = gsap.to(trackTwo, {
      x: 50,
      duration: 30,
      ease: 'none',
      repeat: -1
    })

    trackOne.addEventListener('mouseenter', () => {
      tween1.pause()
    })
    trackTwo.addEventListener('mouseenter', () => {
      tween2.pause()
    })

    trackOne.addEventListener('mouseleave', () => {
      tween1.resume()
    })
    trackTwo.addEventListener('mouseleave', () => {
      tween2.resume()
    })
  }, [])

  return (
    <section className='bg-black h-max py-30 sm:mt-60 pt-60 overflow-hidden flex flex-col gap-10 relative w-full'>
      {/* right shadow */}
      <div className='absolute h-full w-[5%] max-sm:w-[0%] bg-[#050101] right-0   bottom-0 z-5 shadow-[-50px_0px_1000px_250px_rgba(0,0,0,0.3)] max-sm:shadow-[0px_0px_90px_90px_rgba(0,0,0,0.3)] shadow-black top-[10%] max-sm:top-[40%] '></div>

      {/* left shadow */}

      <div className='absolute h-full w-[5%] max-sm:w-[4%] bg-[#050101] left-0   bottom-0 z-5 shadow-[50px_0px_1200px_250px_rgba(0,0,0,0.3)] shadow-black max-sm:shadow-[0px_0px_90px_90px_rgba(0,0,0,0.3)] top-[10%]  max-sm:pb-10'></div>
      <div className='text-3xl text-white flex font-bold pl-9 justify-center items-center w-full relative z-10'>
        Shop From Your Favourite Brands
      </div>
      <div ref={trackOneRef} className='flex gap-5 max-sm:gap-2 w-max'>
        {marquesListOne.map((item, i) => (
          <div
            key={i}
            className='w-max flex justify-center items-center  max-sm:h-15 h-30 max-sm:max-w-80 '
          >
            <img
              src={item.image}
              className='bg-white w-max rounded-2xl h-full'
              alt='photoads'
            />
          </div>
        ))}
      </div>
      <div
        ref={trackTwoRef}
        className='flex gap-5 max-sm:gap-2  w-max  -translate-x-[250vw]  '
      >
        {marquesListTwo.map((item, i) => (
          <div
            key={i}
            className='w-max max-sm:max-w-100 flex justify-center items-center max-sm:h-15 h-30  '
          >
            <img
              src={item.image}
              className='rounded-2xl w-max sm:max-w-full h-full'
              alt='photoads'
            />
          </div>
        ))}
      </div>
    </section>
  )
}
