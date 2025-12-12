import { BiCheckCircle } from 'react-icons/bi'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
export default function ({ message = 'Added To Cart' }) {
  const box = useRef(null)
  useEffect(() => {
    gsap.from(box.current, {
      y: 50,
      ease: 'elastic',
      duration: 1
    })
  }, [])
  return (
    <section
      ref={box}
      className={`absolute max-sm:fixed w-80 border  align-middle  justify-self-center items-center backdrop-blur-2xl bg-[#17092e] text-white py-5 rounded-2xl gap-8 flex place-content-center top-0 z-120 self-center text-xl`}
    >
      <BiCheckCircle color='green' size={30} /> {message}
    </section>
  )
}
