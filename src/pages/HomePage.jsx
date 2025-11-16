import { useRef, useState, useEffect } from 'react'
import { lazy } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Cards from '../reuse/StackedCards'

const Categories = lazy(() => import('../SecondaryComp/categories'))
const Hero = lazy(() => import('../SecondaryComp/heroSection'))
const Footer = lazy(() => import('../PrimaryComp/footer'))
const BestSellers = lazy(() => import('../SecondaryComp/bestSellers'))
const Header = lazy(() => import('../PrimaryComp/header'))
const MoreInfo = lazy(() => import('../SecondaryComp/moreInfo'))
const BuildOutfits = lazy(() => import('../SecondaryComp/buildOutfits'))
const Sneakers = lazy(() => import('../SecondaryComp/SneakerSection'))

gsap.registerPlugin(ScrollTrigger)

export default function Homepage () {
  const heroLeft = useRef(null)
  const heroRight = useRef(null)
  const sellersRef = useRef(null)
  const buildRef = useRef(null)
  const lenisRef = useRef(null)
  const lastcard = useRef(null)
  const isMobile = window.innerWidth <= 450
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const initializeLenis = () => {
      lenisRef.current = new Lenis({
        duration: isMobile ? 0 : 1.2,
        easing: t => (isMobile ? t : Math.min(1, 1.001 - Math.pow(2, -10 * t))),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        smoothTouch: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1,
        touchInertiaMultiplier: isMobile ? 1 : 20,
        autoResize: true
      })

      lenisRef.current.on('scroll', ScrollTrigger.update)

      gsap.ticker.add(time => {
        lenisRef.current?.raf(time * 1000)
      })

      gsap.ticker.lagSmoothing(0)

      // Allow time for layout (especially stacked cards) to settle
      setTimeout(() => {
        ScrollTrigger.refresh()
        setReady(true)
      }, 10000)
    }

    // Ensure this runs only after images and lazy components are loaded
    if (document.readyState === 'complete') {
      initializeLenis()
    } else {
      window.addEventListener('load', initializeLenis)
    }

    return () => {
      window.removeEventListener('load', initializeLenis)
      lenisRef.current?.destroy()
      gsap.ticker.remove(time => lenisRef.current?.raf(time * 1000))
    }
  }, [])

  // if (!ready) {
  //   return (
  //     <div className='flex justify-center items-center h-screen text-lg font-semibold'>
  //       Preparing experience...
  //     </div>
  //   )
  // }

  return (
    <section className='flex flex-col h-max bg-white overflow-x-hidden w-screen'>
      <Header />
      <Hero heroLeft={heroLeft} heroRight={heroRight} />
      <Categories heroLeft={heroLeft} heroRight={heroRight} />

      {!isMobile ? <Cards lastcard={lastcard}/> : null}
      <Sneakers lastcard={lastcard} />
      <BestSellers sellersRef={sellersRef} />
      <BuildOutfits buildRef={buildRef} sellersRef={sellersRef} />
      <MoreInfo buildRef={buildRef} />
      <Footer />
    </section>
  )
}
