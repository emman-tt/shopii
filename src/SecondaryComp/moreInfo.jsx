import { useRef,useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import infoFit from '../assets/img/infoFit.jpg'
gsap.registerPlugin(SplitText, ScrollTrigger)
export default function MoreInfo ({ buildRef }) {
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
