import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import SplitText from 'gsap/SplitText'
import { useEffect, useState, useRef } from 'react'
import { cardsData } from '../utils/stackedCards'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, ScrollSmoother)

export default function Cards () {
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
          markers: true,
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
        className='w-[70%]  h-full flex flex-col gap-[70vh] items-center  overflow-x-hidden [scrollbar-width:none] '
      >
        {cardsData.map(item => (
          <section
            id='each'
            className='w-[90%] h-[80vh]  flex flex-col justify-end pb-20 gap-10 rounded-2xl relative'
            key={item.id}
            style={item.id === cardsData.length ? { zIndex: 4 } : {}}
          >
            <div className='absolute z-[-1] w-full h-full left-0 bottom-0 top-0 right-0 rounded-[inherit]'>
              <img
                className=' w-full h-auto rounded-[inherit]'
                src={item.img}
                alt=''
              />
            </div>
            <h1 className=' backdrop-blur-[15px] flex text-5xl font-bold justify-center py-5'>
              {item.title}
            </h1>
            <div className='px-15 text-center text-[14px]'>
              {item.description}
            </div>
          </section>
        ))}
      </section>
    </section>
  )
}
