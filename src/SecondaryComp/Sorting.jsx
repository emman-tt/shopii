import { useState } from "react"
export  default function Sorting ({ array = [], setGen }) {
  const [current, setCurrent] = useState(2)
  return (
    <section className='flex fixed left-0 right-0 top-0 z-11   flex-row justify-around gap-40 mt-13 pt-5 max-[1000px]:gap-0 max-[1000px]:mt-13 max-[1000px]:pt-7 max-[1000px]:w-[90%]  max-[1000px]:left-[12%] bg-white max-[500px]:w-full max-[800px]:left-[5%] max-[800px]:mt-8 max-[500px]:left-0 max-[500px]:mt-10 max-[500px]:overflow-x-scroll [scrollbar-width:none] max-[380px]:mt-9 '>
      {/* <div></div> */}
      <section className='flex gap-14 max-[500px]:gap-0 text-[14px] border-[#96969124] border-b-2 max-[1040px]:pl-[10%] max-[800px]:text-[12px] max-[500px]:pl-[5%] '>
        {array.map(item => (
          <div
            key={item.id}
            onClick={e => {
              setCurrent(item.id), setGen(item.id)
            }}
            style={
              current === item.id
                ? { borderBottom: '3px solid black', borderColor: 'black' }
                : {}
            }
            className='pb-3 max-[500px]:w-max cursor-pointer px-5 max-[800px]:pb-1'
          >
            {item.value}
          </div>
        ))}
      </section>
    </section>
  )
}
