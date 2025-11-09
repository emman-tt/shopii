import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import SplitText from 'gsap/SplitText'
import { useEffect, useState, useRef } from 'react'
import { cardsData } from '../utils/stackedCards'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, ScrollSmoother)

export default function Cards ({ lastcard }) {
  useEffect(() => {
    const cards = gsap.utils.toArray('#each')
    cards.forEach((card, i) => {
      const isLast = i === cards.length - 1

      //  if (isLast) return

      gsap.to(card, {
        scale: 0.4 * (i / (cards.length - 1)),
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top top',
          end: 'bottom bottom',
          endTrigger: '#container',
          scrub: true,
          pin: card,
          pinSpacing: false,
          invalidateOnRefresh: true
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      id='container'
      className='w-full h-max bg-[#ffffff] mt-100 flex items-center justify-center pt-10 '
    >
      <section
        id='smooth-content'
        className='w-[70%]  h-full flex flex-col gap-[70vh] items-center overflow-x-hidden [scrollbar-width:none] max-[500px]:gap-[30vh]  max-[500px]:w-full max-[800px]:w-full'
      >
        {cardsData.map(item => (
          <section
            id='each'
            className='w-[90%]  h-[80vh]  max-[450px]:h-[65vh]  flex flex-col justify-end pb-20 gap-10 rounded-2xl relative max-[500px]:gap-5 max-[450px]:w-full'
            key={item.id}
            style={item.id === cardsData.length ? { zIndex: -1 } : {}}
            ref={item.id === cardsData.length ? lastcard : null}
          >
            <div  className='absolute z-[-1] w-full h-full left-0 bottom-0 top-0 right-0 rounded-[inherit]'>
              <img
                className=' w-full max-[500px]:h-full  rounded-[inherit]'
                src={item.img}
                alt=''
              />
            </div>
            <h1 className=' backdrop-blur-[15px] flex text-5xl font-bold justify-center max-[780px]:py-1 max-[780px]:text-[32px] py-5 max-[500px]:text-[20px]'>
              {item.title}
            </h1>
            <div className='px-15 text-center text-[14px] max-[780px]:text-[10px] max-[500px]:text-[9px] max-[500px]:px-8'>
              {item.description}
            </div>
          </section>
        ))}
      </section>
    </section>
  )
}
