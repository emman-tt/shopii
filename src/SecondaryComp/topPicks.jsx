import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { lazy } from 'react'
const blackVid = lazy(() => import('../assets/img/blackVid.mp4'))
gsap.registerPlugin(ScrollTrigger)

export default function TopPicks () {
  return (
    <section className='sm:hidden relative bg-black mt-30 h-[90vh] pt-10'>
      <h2 className='text-3xl text-white flex font-bold pl-9'>
        Become Majestic
      </h2>

      <video
        className='w-full   h-full object-cover'
        playsInline
        preload='auto'
        muted
        autoPlay
        loop
        src={blackVid}
      />
    </section>
  )
}
