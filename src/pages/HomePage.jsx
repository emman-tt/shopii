import { useRef, useState, useEffect, useReducer, useContext } from 'react'
import { lazy } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Cards from '../reuse/StackedCards'
import Overlay from '../reuse/overlay'
const Categories = lazy(() => import('../SecondaryComp/categories'))
const Hero = lazy(() => import('../SecondaryComp/heroSection'))
const Footer = lazy(() => import('../PrimaryComp/footer'))
const BestSellers = lazy(() => import('../SecondaryComp/bestSellers'))
const Header = lazy(() => import('../PrimaryComp/header'))
const MoreInfo = lazy(() => import('../SecondaryComp/moreInfo'))
const BuildOutfits = lazy(() => import('../SecondaryComp/buildOutfits'))
const Sneakers = lazy(() => import('../SecondaryComp/SneakerSection'))
const MobileMenu = lazy(() => import('../reuse/mobileMenu'))
const CartUi = lazy(() => import('../SecondaryComp/Cart'))
const TopPicks = lazy(() => import('../SecondaryComp/topPicks.jsx'))
const Carousel = lazy(() => import('../SecondaryComp/carousel.jsx'))
const Marquee = lazy(() => import('../SecondaryComp/marquee.jsx'))

import { FilterContext } from '../App.jsx'
gsap.registerPlugin(ScrollTrigger)

export default function Homepage ({
  menu,
  showMenu,
  cart,
  showCart,
  recur,
  setRecur,
  checkout,
  showCheckout
}) {
  const heroLeft = useRef(null)
  const heroRight = useRef(null)
  const sellersRef = useRef(null)
  const buildRef = useRef(null)
  const lenisRef = useRef(null)
  const lastcard = useRef(null)
  const isMobile = window.innerWidth <= 500
  const [ready, setReady] = useState(false)
  const { state, dispatch } = useContext(FilterContext)



  
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

      setTimeout(() => {
        ScrollTrigger.refresh()
        setReady(true)
      }, 10000)
    }

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

  return (
    <section className='flex flex-col h-max bg-white overflow-x-hidden w-full'>
      <Header
        showCart={showCart}
        showMenu={showMenu}
        menu={menu}
        fixed={true}
        showCheckout={showCheckout}
      />
      {menu && (
        <MobileMenu
          showCart={showCart}
          showCheckout={showCheckout}
          showMenu={showMenu}
        />
      )}
      {cart && (
        <CartUi
          checkout={checkout}
          showCheckout={showCheckout}
          setRecur={setRecur}
          showCart={showCart}
        />
      )}
      {cart && <Overlay showCart={showCart} />}
      <Hero heroLeft={heroLeft} heroRight={heroRight} />
      <Categories state={state} dispatch={dispatch} heroLeft={heroLeft} heroRight={heroRight} />
      <TopPicks />
      <Marquee />
      <Carousel />
      {!isMobile ? <Cards lastcard={lastcard} /> : null}
      <Sneakers lastcard={lastcard} />
      <BestSellers sellersRef={sellersRef} />
      <BuildOutfits buildRef={buildRef} sellersRef={sellersRef} />
      <MoreInfo buildRef={buildRef} />
      <Footer />
    </section>
  )
}
