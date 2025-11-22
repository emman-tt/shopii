import Header from '../PrimaryComp/header'
import { useState, useEffect } from 'react'
import Filtering from '../reuse/filteringUi'
import Items from '../SecondaryComp/ProductItems'
import { LuArrowUpDown } from 'react-icons/lu'
import Loader from '../reuse/loadingAnime'
import { CiFilter } from 'react-icons/ci'
import { Categories } from '../utils/filtering'

export default function Products () {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(2)
  const [gen, setGen] = useState(2)
  const [currentCat, setCurrentCat] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)
  const isMobiles = innerWidth <= 500
  const [isActive, setIsActive] = useState(false)
  const [categories, setCategories] = useState(Categories)
  useEffect(() => {
    ;(async function GetProducts () {
      const res = await fetch(
        `http://localhost:3000/api/AllProducts?page=${page}&gender=${gen}&category=${currentCat}`,
        { method: 'GET' }
      )
      const products = await res.json()

      const use = products.products
      if (!use || use.length < 1) {
        setIsNotFound(true)
        setIsLoaded(true)
        setItems(use)
        return
      }

      setIsLoaded(true)
      setItems(use)
    })()

    return () => {
      setIsLoaded(false)
      setIsNotFound(false)
    }
  }, [gen, currentCat])

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

      <section className='w-full relative  mt-10 min-h-screen flex flex-col'>
        {isMobiles ? (
          <section
            onClick={() => {
              setIsActive(!isActive)
            }}
            className=' w-full mt-12 pt-5 pb-2 pl-[13%] mb-4 flex fixed z-10 bg-white  '
          >
            <div className='flex gap-2 items-center text-[18px] font-bold'>
              Filters <CiFilter />
            </div>
          </section>
        ) : (
          <Filtering
            categories={categories}
            setCategories={setCategories}
            setCurrentCat={setCurrentCat}
            currentCat={currentCat}
          />
        )}

        {isActive && isMobiles && (
          <Filtering
            categories={categories}
            setCategories={setCategories}
            isActive={isActive}
            setIsActive={setIsActive}
            setCurrentCat={setCurrentCat}
            currentCat={currentCat}
          />
        )}

        {isLoaded ? (
          <Items items={items} />
        ) : (
          <section className='w-screen flex justify-center items-center align-middle h-screen   max-[800px]:pl-20 max-[500px]:pl-0 max-[500px]:w-full z-10 overflow-hidden '>
            <Loader />
          </section>
        )}
      </section>
    </section>
  )
}

function Sorting ({ array = [], setGen }) {
  const [current, setCurrent] = useState(2)
  return (
    <section className='flex fixed left-0 right-0 top-0 z-11   flex-row justify-around gap-40 mt-13 pt-5 max-[1000px]:gap-0 max-[1000px]:mt-13 max-[1000px]:pt-7 max-[1000px]:w-[90%]  max-[1000px]:left-[12%] bg-white max-[500px]:w-full max-[800px]:left-[5%] max-[800px]:mt-8 max-[500px]:left-0 max-[500px]:mt-10 max-[500px]:overflow-x-scroll [scrollbar-width:none] '>
      {/* <div></div> */}
      <section className='flex gap-14 max-[500px]:gap-0 text-[14px] border-[#96969124] border-b-2 max-[1040px]:pl-[10%] max-[800px]:text-[12px] max-[500px]:pl-[5%]'>
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
