import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import { outfitMiddle, outfitsLeft, outfitsRight } from '../utils/buildOutfits'
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
export default function BuildOutfits ({
  sellersRef,
  buildRef
}) {
  const leftTop = useRef(null)
  const rightTop = useRef(null)
  const rightBottom = useRef(null)
  const leftBottom = useRef(null)
  const middle = useRef(null)
  const trigger = useRef(null)
  const isMobile = innerWidth <= 500

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sellersRef.current,
      start: 'bottom',
      scrub: 1,
      animation: gsap.fromTo(
        leftTop.current,
        {
          scale: 3,
          x: -300,
          opacity: 0
        },
        { scale: 1, x: leftTop.current, ease: 'linear', opacity: 1 }
      )
    })
    ScrollTrigger.create({
      trigger: isMobile ? leftBottom.current : sellersRef.current,
      start: isMobile ? 'bottom +=900px' : 'bottom',
      scrub: 1,
      end: '+=100px',
      animation: gsap.fromTo(
        rightTop.current,
        {
          scale: 3,
          x: 300,
          opacity: 0
        },
        { scale: 1, x: rightTop.current, ease: 'linear', opacity: 1 }
      )
    })
    ScrollTrigger.create({
      trigger: sellersRef.current,
      start: 'bottom',
      scrub: 1,
      animation: gsap.fromTo(
        leftBottom.current,
        {
          scale: 3,
          x: -300,
          y: -100,
          opacity: 0
        },
        {
          scale: 1,
          x: leftBottom.current,
          ease: 'linear',
          y: leftBottom.current,
          opacity: 1
        }
      )
    })
    ScrollTrigger.create({
      trigger: sellersRef.current,
      start: 'bottom',
      scrub: 1,
      animation: gsap.fromTo(
        rightBottom.current,
        {
          scale: 3,
          x: 300,
          y: 100,
          opacity: 0
        },
        {
          scale: 1,
          x: leftBottom.current,
          ease: 'linear',
          y: leftBottom.current,
          opacity: 1
        }
      )
    })
    ScrollTrigger.create({
      trigger: isMobile ? leftBottom.current : sellersRef.current,
      start: isMobile ? 'center center' : 'bottom',
      scrub: 1,
      end: isMobile ?? '+=50px',
      animation: gsap.fromTo(
        middle.current,
        {
          scale: 5,
          opacity: 0
        },
        { scale: 1, ease: 'linear', opacity: 1 }
      )
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  function scrollRight () {
    gsap.to(middle.current, {
      scrollTo: {
        x:
          innerWidth <= 1200 && innerWidth >= 1040
            ? '+=600'
            : innerWidth <= 1030 && innerWidth >= 1000
            ? '+=520'
            : innerWidth <= 900 && innerWidth >= 500
            ? '+=400'
            : innerWidth <= 430 && innerWidth >= 380
            ? '+=380'
            : innerWidth <= 376 && innerWidth >= 330
            ? '+=320'
            : innerWidth <= 326 && innerWidth >= 300
            ? '+=270'
            : '+=800'
      },
      duration: 0.8,
      ease: 'power2.out'
    })
  }
  function scrollLeft () {
    gsap.to(middle.current, {
      scrollTo: {
        x:
          innerWidth <= 1200 && innerWidth >= 1040
            ? '+=-600'
            : innerWidth <= 1040 && innerWidth >= 1000
            ? '+=-520'
            : innerWidth <= 900 && innerWidth >= 500
            ? '+=-400'
            : innerWidth <= 430 && innerWidth >= 380
            ? '+=-380'
            : innerWidth <= 376 && innerWidth >= 330
            ? '+=-320'
            : innerWidth <= 326 && innerWidth >= 300
            ? '-=270'
            : '+=-800'
      },
      duration: 0.8,
      ease: 'power2.out'
    })
  }

  return (
    <section
      ref={buildRef}
      className='h-max overflow-hidden bg-white mt-50 flex flex-col text-black mb-20  '
    >
      <div
        ref={trigger}
        className='text-3xl text-black justify-center items-center flex font-bold relative z-10'
      >
        Build your Outfits
      </div>

      <section className='h-full gap-5 mt-5 flex flex-row max-[500px]:flex-col max-[500px]:h-max'>
        <section className='w-23/100 h-full flex flex-col justify-between  gap-5 max-[500px]:w-full'>
          {outfitsLeft.map(item => (
            <section
              key={item.id}
              ref={item.id === 1 ? leftTop : leftBottom}
              className=' flex justify-between flex-col'
            >
              <div className='w-full max-[500px]:h-110   max-[500px]:justify-center flex max-[376px]:h-100 max-[336px]:h-80'>
                <img
                  src={item.image}
                  className='h-full w-full max-[500px]:w-120 max-[500px]:h-auto '
                  alt='photo'
                />
              </div>

              <div className='flex flex-row text-l font-medium justify-around relative z-10 max-[1030px]:text-sm'>
                <p className=''>{item.description}</p>
                <p className='w-[40%] max-[500px]:w-max'>$ {item.price}</p>
              </div>
            </section>
          ))}
        </section>

        <section
          ref={middle}
          id='middle'
          className=' px-[0%]  flex text-black overflow-hidden max-[1441px]:h-210 max-[1200px]:h-190 max-[1040px]:h-165 w-[60%]  h-230 max-[800px]:h-120 max-[500px]:w-full  '
        >
          <section className='[scrollbar-width:none]  flex  '>
            {outfitMiddle.map(item => (
              <section
                className='flex justify-between flex-col gap-0 
                 h-full  w-200  mr-0 relative max-[1030px]:w-130 max-[800px]:w-100 max-[500px]:w-[380px] max-[380px]:w-[320px] max-[322px]:w-[270px] max-[323px]:h-[80%]'
                key={item.id}
              >
                <div
                  onClick={scrollLeft}
                  className=' absolute left-[5%] top-[35%] z-5 text-4xl font-extrabold text-black 
                  max-[323px]:left-[1%]'
                >
                  <SlArrowLeft />
                </div>
                <div
                  onClick={scrollRight}
                  className=' absolute right-[5%] top-[35%] z-5 text-4xl font-extrabold text-black max-[320px]:right-[1%] max-[400px]:right-[10%]'
                >
                  <SlArrowRight />
                </div>
                <div className='h-[95%]   w-full '>
                  <img
                    src={item.image}
                    className='h-[105%] w-full max-[1030px]:h-full max-[380px]:h-[90%] '
                    alt='photo'
                  />
                </div>
                <div className='flex flex-row text-black font-medium justify-around  items-center max-[1030px]:text-sm'>
                  <p className=''>{item.description}</p>
                  <p className=''>$ {item.price}</p>
                </div>
              </section>
            ))}
          </section>
        </section>

        <section className='w-23/100 h-full flex flex-col justify-between  gap-5 max-[500px]:w-full '>
          {outfitsRight.map(item => (
            <section
              key={item.id}
              ref={item.id === 1 ? rightTop : rightBottom}
              className=' h-full flex flex-col items-center  max-[500px]:justify-center '
            >
              <div className='w-full   h-[92%] max-[500px]:h-[50%] max-[500px]:justify-center flex max-[376px]:h-80'>
                <img
                  src={item.image}
                  className='h-full w-full max-[500px]:w-auto max-[500px]:h-90'
                  alt='photo'
                />
              </div>
              <div className='flex flex-row text-l font-medium justify-around max-[1030px]:text-sm'>
                <p className=''>{item.description}</p>
                <p className='w-[40%] max-[500px]:w-max'>$ {item.price}</p>
              </div>
            </section>
          ))}
        </section>
      </section>
    </section>
  )
}
