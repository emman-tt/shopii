import { useRef,useState } from 'react'
import gsap from 'gsap'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import { FaRegHeart } from 'react-icons/fa6'
import { all } from '../utils/bestSellers'
import ImageWithShimmer from '../reuse/shimmer'

export default function BestSellers ({ sellersRef }) {
  const rightArrow = useRef(null)
  const leftArrow = useRef(null)
  const container = useRef(null)
  const isMobile = innerWidth <= 800
  const isSmallMobile = innerWidth <= 500
  const [products, setProducts] = useState(all)

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
              <ImageWithShimmer className='h-full w-full' src={item.image} alt='' />
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
