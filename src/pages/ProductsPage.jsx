import Header from '../PrimaryComp/header'
import { useState, useEffect } from 'react'
import Filtering from '../reuse/filteringUi'
import Items from '../SecondaryComp/ProductItems'
import { LuArrowUpDown } from 'react-icons/lu'

export default function Products () {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(2)
  const [gen, setGen] = useState(2)
  const [currentCat, setCurrentCat] = useState('all')

  useEffect(() => {
    ;(async function GetProducts () {
      const res = await fetch(
        `http://localhost:3000/api/AllProducts?page=${page}&gender=${gen}&category=${currentCat}`,
        { method: 'GET' }
      )
      const products = await res.json()

      if (products) {
        const use = products.products
        setItems(use)
      }
    })()
  }, [gen])
  return (
    <section>
      <Header fixed={true}></Header>
      <Sorting
        setGen={setGen}
        array={[
          { id: 1, value: 'For Men' },
          { id: 2, value: 'For  Women' },
          { id: 3, value: 'For Children' },
          { id: 4, value: 'Unisex' }
        ]}
      />
      <section className='w-full relative  mt-10 min-h-screen flex'>
        <Filtering setCurrentCat={setCurrentCat} currentCat={currentCat} />
        <Items items={items} />
      </section>
    </section>
  )
}

function Sorting ({ array = [], setGen }) {
  const [current, setCurrent] = useState(2)
  return (
    <section className='flex fixed left-0 right-0 top-0 z-10 bg-white  flex-row justify-around gap-40 mt-13 pt-5'>
      <div></div>
      <section  className='flex gap-14 text-[14px] border-[#96969124] border-b-2'>
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
            className='pb-3 cursor-pointer px-5'
          >
            {item.value}
          </div>
        ))}
      </section>

      <section className='flex items-center gap-3'>
        Sort by <LuArrowUpDown />
      </section>
    </section>
  )
}
