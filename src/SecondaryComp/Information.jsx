import { useState } from 'react'
import Sorting from './Sorting'
export default function InformationBox ({ z = 40 }) {
  const [data, setData] = useState([
    { id: 1, value: 'Information' },
    { id: 2, value: 'Shopping' },
    { id: 3, value: 'Payment' },
    { id: 4, value: 'Confirmation' }
  ])
  const [active, setActive] = useState(2)
  return (
    <section
      style={{ zIndex: z }}
      className=' bg-white w-[55%]  h-full  px-15  pt-0  fixed left-0 top-10 '
    >
      <Sorting
        setActive={setActive}
        fixed={false}
        bgColor='inherit'
        specific={false}
        currentPos={1}
        px={45}
        array={data}
      />
      {active === 1 && (
        <section className='flex flex-col justify-between mt-10  h-100'>
          <InFoBoxUi
            className=' '
            boxes={['First name', 'Last name', 'Email', 'Phone']}
          />

          <InFoBoxUi
            className=''
            boxes={['Country', 'City', 'Street Address', 'Postal code']}
            head='Shipping Address *'
          />
        </section>
      )}

      {active === 2 && (
        <section className='flex flex-col mt-7  h-full'>
          <MethodsUi />
        </section>
      )}
    </section>
  )
}

function MethodsUi ({
  head = 'Shopping',
  boxes = [
    { value: 1, selected: true },
    { value: 2, selected: false },
    { value: 3, selected: false }
  ],
  className = '',
  gap = 35
}) {
  const [data, setData] = useState(boxes)
  return (
    <section className={`${className} px-5 `}>
      <header className='text-3xl font-semibold mb-7 '>{head}</header>

      <section style={{ gap: gap }} className='flex-col flex w-full '>
        {boxes.map(item => (
          <div
            onClick={() => {
              setData(prev =>
                prev.map(i =>
                  item.value === i.value
                    ? { ...i, selected: true }
                    : { ...i, selected: false }
                )
              )
            }}
            key={item.value}
            className='flex gap-6 items-center border-black border-b'
          >
            <span
              style={{ backgroundColor: item.selected ? 'black' : 'white' }}
              className='w-4 h-4 rounded-3xl border '
            ></span>
            <ul className='flex   py-2 w-full justify-between'>
              {Array.from({ length: boxes.length }, (_, index) => (
                <li key={index}>{boxes[index].value}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </section>
  )
}

function InFoBoxUi ({
  head = 'Contact *',
  boxes = [1, 2, 3, 4],
  height = 50,
  className = ''
}) {
  return (
    <section
      style={{ minheight: height }}
      className={`${className}  flex flex-col`}
    >
      <header className='text-2xl pb-5 font-semibold'>{head}</header>
      <section className='flex gap-5 flex-wrap'>
        {boxes.map(item => (
          <input
            placeholder={item}
            className='border shrink-0 w-[40%] p-3 text-sm text-gray-500'
          />
        ))}
      </section>
    </section>
  )
}
