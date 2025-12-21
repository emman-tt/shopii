import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs'
import { topPicksList } from '../utils/topPicks'
import { useNavigate } from 'react-router-dom'
export default function CircularCarousel () {
  const containerRef = useRef(null)
  const cardsRef = useRef([])
  const [index, setIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const navigate = useNavigate()
  const radius = 220
  const total = topPicksList.length

  useEffect(() => {
    positionCards()
  }, [index])

  useEffect(() => {
    const handleKeyPress = e => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isAnimating])

  function positionCards () {
    setIsAnimating(true)
    cardsRef.current.forEach((card, i) => {
      if (!card) return

      const angle = (i - index) * (360 / total)
      const rad = (angle * Math.PI) / 180

      const x = radius * Math.sin(rad)
      const y = -radius * Math.cos(rad)
      const depth = Math.cos(rad)
      const isCenter = i === index
      gsap.to(card, {
        x,
        y,
        scale: 0.7 + depth * 0.4,
        opacity: isCenter ? 1 : 0.2 + depth * 0.6,
        zIndex: Math.round(depth * 10),
        duration: 0.8,
        ease: 'power3.out',
        onComplete: () => setIsAnimating(false)
      })
    })
  }

  function next () {
    if (isAnimating) return
    setIndex(prev => (prev + 1) % total)
  }

  function prev () {
    if (isAnimating) return
    setIndex(prev => (prev - 1 + total) % total)
  }

  function openSPP (id) {
    navigate(`/products/:${id}`)
  }
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center gradient-to-b overflow-hidden pt-30 bg-black sm:hidden relative '>
      <h1 className=' text-3xl w-full mb-50 text-left text-white flex font-bold pl-9'>
        Top Picks for You
      </h1>

      <div className='relative perspective'>
        <div
          ref={containerRef}
          className='relative w-[500px] h-[500px] flex items-center justify-center'
          style={{ perspective: '1000px' }}
        >
          {topPicksList.map((item, i) => (
            <div
              onClick={() => openSPP(item.id)}
              key={i}
              ref={el => (cardsRef.current[i] = el)}
              className={`absolute w-60 h-70  rounded-2xl  flex items-center justify-center text-2xl font-bold text-white cursor-pointer will-change-transform bg-blue-900`}
              style={{
                backfaceVisibility: 'hidden'
              }}
            >
              <img className='rounded-4xl' src={item.image} alt='photo' />
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-6 w-full justify-around left-0 right-0  absolute  bottom-[15%] '>
        <button
          onClick={prev}
          disabled={isAnimating}
          className='flex rounded-4xl items-center justify-center  text-white border-[0.1px] border-gray-500  bg-black/10  backdrop-blur-[7px] p-6 text-6xl font-extrabold '
        >
          <BsArrowLeft />
        </button>
        <button
          onClick={next}
          disabled={isAnimating}
          className='flex  rounded-4xl items-center justify-center  text-white border-[0.1px] border-gray-500  bg-black/10  backdrop-blur-[7px] p-6 text-6xl font-extrabold'
        >
          <BsArrowRight />
        </button>
      </div>
    </div>
  )
}
