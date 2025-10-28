import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(SplitText, ScrollTrigger, ScrollToPlugin)
import { useRef, useEffect, useState } from 'react'
import { FaRegHeart } from 'react-icons/fa6'
import { BsArrowUpRight } from 'react-icons/bs'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import { IoPersonOutline } from 'react-icons/io5'
import { BsCart4 } from 'react-icons/bs'
import heroLeftimg from '../assets/img/heroLeft.png'
import heroRightimg from '../assets/img/heroRight.png'
import watchimg from '../assets/img/watch.png'
import shoesimg from '../assets/img/shoes.png'
import categoryMiddle from '../assets/img/categoryMiddle.png'
import { all } from '../utils/bestSellers'
import { outfitMiddle, outfitsLeft, outfitsRight } from '../utils/buildOutfits'

import infoFit from '../assets/img/infoFit.jpg'

export default function Homepage () {
  const heroLeft = useRef(null)
  const heroRight = useRef(null)
  const sellersRef = useRef(null)
  const buildRef = useRef(null)
  const [products, setProducts] = useState(all)

  return (
    <section className='flex flex-col h-max bg-white overflow-x-hidden  px-5 w-screen overflow-y-auto'>
      <Header />
      <Hero heroLeft={heroLeft} heroRight={heroRight} />
      <Categories heroLeft={heroLeft} heroRight={heroRight} />
      <BestSellers sellersRef={sellersRef} products={products} />
      <BuildOutfits
        buildRef={buildRef}
        outfitsMiddle={outfitMiddle}
        outfitsLeft={outfitsLeft}
        outfitsRight={outfitsRight}
        sellersRef={sellersRef}
      />
      <MoreInfo buildRef={buildRef} />
      <Footer />
    </section>
  )
}

function Categories ({ heroLeft, heroRight }) {
  const categoriesLeft = useRef(null)
  const categoriesMiddle = useRef(null)
  const categoriesRight = useRef(null)
  const isMobile = innerWidth <= 500
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRight.current,
        start: isMobile ? '+=100px' : 'bottom 90%',
        scrub: 7
      }
    })
    tl.fromTo(
      categoriesLeft.current,
      { y: 500, opacity: 0.3 },
      { y: 0, opacity: 1 }
    )
      .fromTo(
        categoriesMiddle.current,
        { y: 500, opacity: 0.3 },
        { y: 0, opacity: 1 }
      )
      .fromTo(
        categoriesRight.current,
        {
          y: 300,
          opacity: 0.3
        },
        {
          y: 0,
          opacity: 1
        }
      )
  }, [])

  return (
    <section className='h-250 max-[1100px]:h-200 max-[800px]:h-140 bg-white mt-40 flex flex-col pb-10 max-[500px]:h-max'>
      <div className='text-3xl text-black justify-center items-center flex font-bold'>
        Categories
      </div>

      <section className='h-full gap-5 max-[1100px]:gap-1  mt-5 flex flex-row max-[500px]:flex-col max-[500px]:h-250  max-[500px]:gap-14'>
        <section
          ref={categoriesLeft}
          className=' w-23/100 h-[60%] max-[500px]:w-full max-[500px]:h-[25%]'
        >
          <div className='w-full flex h-73/100 max-[1100px]:h-[60%] justify-center items-center  bg-[#b1b1bb25]  max-[800px]:h-full'>
            <img src={watchimg} className=' max-[500px]:h-full' alt='photo' />
          </div>
          <div className='text-xl text-black font-semibold pl-10 flex gap-10 items-center pt-5 max-[800px]:text-[15px] max-[800px]:gap-5 max-[800px]:pt-1 max-[800px]:pl-2'>
            Accesories
            <BsArrowUpRight className='font-extrabold text-xl max-[800px]:text-xs' />
          </div>
        </section>
        <section
          ref={categoriesMiddle}
          className=' w-60/100 h-auto max-[500px]:w-full max-[500px]:h-[70%]'
        >
          <div className='w-full h-93/100 flex items-center justify-center  bg-[#b1b1bb25]'>
            <img
              src={categoryMiddle}
              className='w-75/100 max-[330px]:w-full'
              alt='photo'
            />
          </div>
          <div className='text-xl pt-5  text-black font-semibold pl-10 flex gap-10 items-center max-[800px]:text-[15px] max-[800px]:gap-5 max-[800px]:pt-1 max-[800px]:pl-2'>
            Clothes
            <BsArrowUpRight className='font-extrabold text-xl max-[800px]:text-xs' />
          </div>
        </section>
        <section
          ref={categoriesRight}
          className='w-25/100 h-50/100 flex flex-col self-end max-[500px]:w-full max-[500px]:h-[25%]'
        >
          <div className='w-full h-full p-0  flex items-center max-[800px]:h-full'>
            <img className=' bg-[#b1b1bb25]' src={shoesimg} alt='photo' />
          </div>
          <div className='text-xl text-black font-semibold pl-10 flex gap-10  items-center max-[800px]:text-[15px] max-[800px]:gap-5 max-[800px]:pt-1 max-[800px]:pl-2'>
            Shoes
            <BsArrowUpRight className='font-extrabold text-xl max-[800px]:text-xs' />
          </div>
        </section>
      </section>
    </section>
  )
}

function Hero ({ heroLeft, heroRight }) {
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
        className=' h-150 flex gap-5 mt-5 max-[800px]:h-100 max-[500px]:flex-col max-[500px]:h-max  w-full'
      >
        <div
          ref={heroLeft}
          className='w-50/100 flex justify-center items-center  text-black bg-[#79797a1c] max-[500px]:w-full 
          max-[500px]:h-[70%]'
        >
          <img
            src={heroLeftimg}
            className='flex h-[89%] max-[1100px]:w-[70%] max-[500px]:h-[140%] w-[60%]  items-center'
            alt='photo'
          />
        </div>
        <div
          ref={heroRight}
          className='w-50/100 flex justify-center bg-[#79797a1c]  text-black max-[500px]:w-full max-[500px]:h-70/100'
        >
          <img src={heroRightimg} className='flex  self-center  ' alt='phot0' />
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

function Footer () {
  return (
    <section className='h-max w-full flex flex-row bg-[#98939332] mt-10 justify-between text-black pt-5 px-[5%] max-[800px]:flex-col'>
      <section className='w-[40%] flex flex-col max-[1026px]:w-[30%] max-[800px]:w-full'>
        <h2 className='text-4xl font-bold '>Get in Touch With Us</h2>
        <div className='mt-10'>
          Shop with confidence. Enjoy free shipping on orders over $50, easy
          30-day returns, and dedicated customer support ready to assist you
          every step of the way.
        </div>

        <div className='border-b mt-7 w-[40%]  mb-10 max-[1026px]:w-full '>
          <input
            type='text'
            placeholder='Email'
            className='not-focus-visible:'
          />
        </div>
      </section>

      <section className='flex w-[45%] max-[1026px]:w-[60%]  gap-15 max-[800px]:w-full max-[800px]:justify-between max-[800px]:px-[15%] max-[800px]:pb-10 max-[500px]:px-0 max-[380px]:flex-col'>
        <ul className='text-[15px] max-[800px]:text-[12px] text-center max-[380px]:text-left font-light flex flex-col max-[380px]:text-[16px] max-[380px]:font-normal'>
          <li className='mb-1 text-[19px] max-[800px]:text-[14px] font-medium max-[380px]:text-2xl max-[380px]:mb-3'>
            Shop Addresses
          </li>
          <li>Ghana</li>
          <li>China</li>
          <li>Russia</li>
          <li>Mali</li>
        </ul>

        <ul className='text-[14px] max-[800px]:text-[12px] text-center max-[380px]:text-left font-light flex flex-col max-[380px]:text-[16px] max-[380px]:font-normal'>
          <li className='mb-1 text-[19px] font-medium max-[800px]:text-[14px] max-[380px]:text-2xl max-[380px]:mb-3'>
            Customer Services
          </li>
          <li>FAQ</li>
          <li>Products</li>
          <li>Delivery</li>
          <li>User Agreement</li>
          <li>Promotions</li>
          <li>Loyalty Progress</li>
        </ul>

        <ul className='text-[14px] max-[800px]:text-[12px] text-center max-[380px]:text-left font-light flex flex-col max-[380px]:text-[16px] max-[380px]:font-normal'>
          <li className='mb-1 text-[19px] font-medium max-[800px]:text-[14px] max-[380px]:text-2xl max-[380px]:mb-3'>
            About Us
          </li>
          <li>Twitter</li>
          <li>Facebook</li>
          <li>Instagram</li>
          <li>Resources</li>
        </ul>
      </section>
    </section>
  )
}

function Header () {
  return (
    <section className='flex flex-row h-max py-2 justify-between px-10 items-center text-black max-[800px]:px-0'>
      <section className='flex flex-row h-max font-semibold  gap-5 max-[500px]:hidden max-[800px]:text-[11px]'>
        <div>Catalog</div>
        <div>Collections</div>
        <div>Outfits</div>
      </section>

      <h1 className='text-3xl font-extrabold pr-20 max-[800px]:text-[15px] max-[800px]:font-bold max-[500px]:text-[30px] max-[500px]:pl-0'>
        SHOPII
      </h1>

      <section className='flex flex-row h-max text-xl  gap-7 max-[800px]:text-[13px]'>
        <div>
          <IoPersonOutline />
        </div>
        <div>
          <FaRegHeart />
        </div>
        <div>
          <BsCart4 />
        </div>
      </section>
    </section>
  )
}

function BestSellers ({ sellersRef, products }) {
  const rightArrow = useRef(null)
  const leftArrow = useRef(null)
  const container = useRef(null)
  const isMobile = innerWidth <= 800
  const isSmallMobile = innerWidth <= 500

  function scrollRight () {
    gsap.to(container.current, {
      scrollTo: { x: isMobile ? '+=220' : isSmallMobile ? '+=324' : '+=340' },
      duration: 0.8,
      ease: 'power2.out'
    })
  }
  function scrollLeft () {
    gsap.to(container.current, {
      scrollTo: {
        x: isMobile ? '+=-220' : isSmallMobile ? '+=-324' : '+=-324'
      },
      duration: 0.8,
      ease: 'power2.out'
    })
  }

  return (
    <section
      ref={sellersRef}
      className=' mt-40 flex flex-col h-120 mb-10 relative  w-screen  overflow-hidden max-[800px]:h-110'
    >
      <div
        ref={leftArrow}
        onClick={scrollLeft}
        className=' absolute left-[3%] top-[50%] z-5 text-4xl font-extrabold text-black cursor-pointer rounded-2xl border p-3 backdrop-blur-2xl max-[800px]:p-1 max-[500px]:hidden'
      >
        <SlArrowLeft />
      </div>
      <div
        ref={rightArrow}
        onClick={scrollRight}
        className=' absolute right-[6%] top-[50%] z-5 text-4xl font-extrabold text-black cursor-pointer  rounded-2xl border p-3 backdrop-blur-2xl max-[800px]:p-1 max-[500px]:right-[13%] max-[500px]:hidden '
      >
        <SlArrowRight />
      </div>
      <div className='text-3xl font-semibold text-center text-black mb-10 max-[500px]:text-left max-[500px]:pl-10'>
        Best Sellers
      </div>

      <section
        ref={container}
        className='scrollbar-hide flex  h-full gap-4 justify-between text-black overflow-scroll [scrollbar-width:none] px-20 max-[500px]:px-0 '
      >
        {products.map(item => (
          <section
            key={item.id}
            className=' min-w-[300px]  h-full relative  pb-3'
          >
            <FaRegHeart className='absolute right-5 z-10 top-5 text-xl ' />
            <div className='w-full h-93/100  max-[800px]:w-[95%]'>
              <img className='h-full w-full' src={item.image} alt='' />
            </div>
            <section className='text-sm text-black font-semibold  flex justify-around'>
              <div>{item.description}</div>
              <div>$ {item.price}</div>
            </section>
          </section>
        ))}
      </section>
    </section>
  )
}

function MoreInfo ({ buildRef }) {
  const infoText = useRef(null)
  const infoDetails = useRef(null)
  const isMobile = innerWidth <= 500

  useEffect(() => {
    const infoTextSplit = new SplitText(infoText.current, {
      type: 'chars,words,lines'
    })
    const infoDetailsSplit = new SplitText(infoDetails.current, {
      type: 'chars,words,lines'
    })

    gsap.from(infoTextSplit.chars, {
      scrollTrigger: {
        trigger: buildRef.current,
        start: isMobile ? 'bottom' : '50%',
        end: '+=50px',
        scrub: 1
      },
      opacity: 0,
      y: -50,
      duration: 0.5,
      stagger: { amount: 1, from: 'start' },
      ease: 'back'
    })
    gsap.from(infoDetailsSplit.chars, {
      scrollTrigger: {
        trigger: isMobile ? infoText.current : buildRef.current,
        start: isMobile ? '-80%' : '80%',
        end: isMobile ?? '+=50px',
        scrub: 1,
        markers: true
      },
      opacity: 0,
      x: 50,
      duration: 0.6,
      stagger: { amount: 2, from: 'end' },
      ease: 'power4'
    })

    return () => {
      infoTextSplit.revert()
      infoDetailsSplit.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section className='h-230 overflow-hidden text-black mb-60'>
      <h2
        ref={infoText}
        className='text-5xl w-[80%] bg-[#b1b1bb25]  mt-40 rounded-2xl   p-10 font-medium justify-right max-[800px]:w-full max-[800px]:text-[30px] max-[500px]:text-[20px] max-[500px]:p-5 '
      >
        Shopii is an experimental Fashion Brand that sells Luxury and Confidence
        with a touch of Class
      </h2>

      <section className='flex flex-row h-full mt-10 gap-5  max-[500px]:flex-col-reverse max-[500px]:mt-0 max-[500px]:h-160'>
        <div className='  flex justify-end align-bottom  pt-30 max-[500px]:pt-0'>
          <div className='h-full  w-[70%]'>
            <img className='w-full ' src={infoFit} alt='phtot' />
          </div>
        </div>
        <h3
          ref={infoDetails}
          className='w-[80%] 
        max-[500px]:text-[13px] max-[500px]:whitespace-pre-wrap'
        >
          Discover your signature style with our curated collection of premium
          clothing and accessories. From timeless classics to trend-setting
          pieces, we bring you fashion that celebrates individuality. Elevate
          your wardrobe with quality craftsmanship, sustainable materials, and
          designs that move with you through every season and occasion.
          <div className='mt-5 underline'>Read More</div>
        </h3>
      </section>
    </section>
  )
}

function BuildOutfits ({
  sellersRef,
  outfitsLeft,
  outfitsRight,
  outfitsMiddle,
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
      markers: true,
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
      // markers:true,
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
                  className=' absolute right-[5%] top-[35%] z-5 text-4xl font-extrabold text-black max-[320px]:right-[1%]'
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
