import { useRef, useState, useEffect } from 'react'
import { lazy } from 'react'
const Categories = lazy(() => import('../SecondaryComp/categories'))
const Hero = lazy(() => import('../SecondaryComp/heroSection'))
const Footer = lazy(() => import('../PrimaryComp/footer'))
const BestSellers = lazy(() => import('../SecondaryComp/bestSellers'))
const Header = lazy(() => import('../PrimaryComp/header'))
const MoreInfo = lazy(() => import('../SecondaryComp/moreInfo'))
const BuildOutfits = lazy(() => import('../SecondaryComp/buildOutfits'))
const Cards = lazy(() => import('../reuse/StackedCards'))
import Lenis from '@studio-freight/lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

export default function Homepage() {
  const heroLeft = useRef(null)
  const heroRight = useRef(null)
  const sellersRef = useRef(null)
  const buildRef = useRef(null)
  const lenisRef = useRef(null)

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',      
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.8, 
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenisRef.current.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenisRef.current?.destroy()
      gsap.ticker.remove((time) => lenisRef.current?.raf(time * 1000))
    }
  }, [])

  return (
    <section className='flex flex-col h-max bg-white overflow-x-hidden px-0 w-screen'>
      <Header />
      <Hero heroLeft={heroLeft} heroRight={heroRight} />
      <Categories heroLeft={heroLeft} heroRight={heroRight} />
      <Cards />
      <BestSellers sellersRef={sellersRef} />
      <BuildOutfits buildRef={buildRef} sellersRef={sellersRef} />
      <MoreInfo buildRef={buildRef} />
      <Footer />
    </section>
  )
}