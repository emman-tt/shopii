import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import { useEffect, useState } from 'react'
import { cardsData } from '../utils/stackedCards'
import ImageWithShimmer from './shimmer'
import { useRef } from 'react'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

export default function Cards ({ lastcard }) {

  useEffect(() => {
    const initializeCards = () => {
      const cards = gsap.utils.toArray('#each')

      cards.forEach((card, i) => {
        const isLast = i === cards.length - 1
        // if (isLast) return

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
            invalidateOnRefresh: true,
          }
        })
      })

      ScrollTrigger.refresh()
      console.log(' Cards ready')
    }


    initializeCards()

    // const timer = setTimeout(() => {
    //   if (document.readyState === 'complete') {
    //     initializeCards();
    //   } else {
    //     window.addEventListener('load', initializeCards, { once: true })
    //   }
    // }, 100)

    return () => {
  //    clearTimeout(timer)
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
            className='w-[90%]  h-[80vh]  max-[450px]:h-[65vh]  flex flex-col justify-end pb-20 gap-10 rounded-2xl relative max-[500px]:gap-5 max-[450px]:w-full bg-amber-300'
            key={item.id}
            style={item.id === cardsData.length ? { zIndex: -1 } : {}}
            ref={item.id === cardsData.length ? lastcard : null}
          >
            <div className='absolute z-[-1] w-full h-full left-0 bottom-0 top-0 right-0 rounded-2xl'>
              <ImageWithShimmer
                className='w-full max-[500px]:h-full rounded-2xl'
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




// import { useRef, useState, useEffect } from 'react'
// import { lazy } from 'react'
// import Lenis from '@studio-freight/lenis'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import Cards from '../reuse/StackedCards'

// const Categories = lazy(() => import('../SecondaryComp/categories'))
// const Hero = lazy(() => import('../SecondaryComp/heroSection'))
// const Footer = lazy(() => import('../PrimaryComp/footer'))
// const BestSellers = lazy(() => import('../SecondaryComp/bestSellers'))
// const Header = lazy(() => import('../PrimaryComp/header'))
// const MoreInfo = lazy(() => import('../SecondaryComp/moreInfo'))
// const BuildOutfits = lazy(() => import('../SecondaryComp/buildOutfits'))
// const Sneakers = lazy(() => import('../SecondaryComp/SneakerSection'))

// gsap.registerPlugin(ScrollTrigger)

// export default function Homepage() {
//   const heroLeft = useRef(null)
//   const heroRight = useRef(null)
//   const sellersRef = useRef(null)
//   const buildRef = useRef(null)
//   const lenisRef = useRef(null)
//   const lastcard = useRef(null)
//   const isMobile = window.innerWidth <= 450
//   const [ready, setReady] = useState(false)

//   useEffect(() => {
//     // Function to safely initialize Lenis after page + images are ready
//     const initializeLenis = () => {
//       lenisRef.current = new Lenis({
//         duration: isMobile ? 0.5 : 1.2,
//         easing: t => (isMobile ? t : Math.min(1, 1.001 - Math.pow(2, -10 * t))),
//         orientation: 'vertical',
//         gestureOrientation: 'vertical',
//         smoothWheel: true,
//         smoothTouch: true,
//         wheelMultiplier: 0.8,
//         touchMultiplier: 1,
//         touchInertiaMultiplier: isMobile ? 1 : 20,
//         autoResize: true,
//       })

//       lenisRef.current.on('scroll', ScrollTrigger.update)

//       gsap.ticker.add(time => {
//         lenisRef.current?.raf(time * 1000)
//       })

//       gsap.ticker.lagSmoothing(0)

//       // Allow time for layout (especially stacked cards) to settle
//       setTimeout(() => {
//         ScrollTrigger.refresh()
//         setReady(true)
//       }, 800)
//     }

//     // Ensure this runs only after images and lazy components are loaded
//     if (document.readyState === 'complete') {
//       initializeLenis()
//     } else {
//       window.addEventListener('load', initializeLenis)
//     }

//     return () => {
//       window.removeEventListener('load', initializeLenis)
//       lenisRef.current?.destroy()
//       gsap.ticker.remove(time => lenisRef.current?.raf(time * 1000))
//     }
//   }, [])

//   // Optional: simple preloader
//   if (!ready) {
//     return (
//       <div className="flex justify-center items-center h-screen text-lg font-semibold">
//         Preparing experience...
//       </div>
//     )
//   }

//   return (
//     <section className="flex flex-col h-max bg-white overflow-x-hidden w-screen">
//       <Header />
//       <Hero heroLeft={heroLeft} heroRight={heroRight} />
//       <Categories heroLeft={heroLeft} heroRight={heroRight} />
//       <Cards lastcard={lastcard} />
//       <Sneakers lastcard={lastcard} />
//       <BestSellers sellersRef={sellersRef} />
//       <BuildOutfits buildRef={buildRef} sellersRef={sellersRef} />
//       <MoreInfo buildRef={buildRef} />
//       <Footer />
//     </section>
//   )
// }