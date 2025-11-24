import Header from '../PrimaryComp/header'
import { useState, useEffect } from 'react'
import Filtering from '../reuse/filteringUi'
import Items from '../SecondaryComp/ProductItems'
import { LuArrowUpDown } from 'react-icons/lu'
import Loader from '../reuse/loadingAnime'
import { CiFilter } from 'react-icons/ci'
import { Categories } from '../utils/filtering'
import Sorting from '../SecondaryComp/Sorting'
import { Colours } from '../utils/filtering'
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
  const [currentColor, setCurrentColor] = useState('all')
  const [colours, setColours] = useState(Colours)
 const PORT = 'https://shopii-backend.onrender.com/'
// const PORT = 'http://localhost:3000/'
  useEffect(() => {
    ;(async function GetProducts () {
      const res = await fetch(
        `${PORT}api/AllProducts?page=${page}&gender=${gen}&category=${currentCat}&color=${currentColor}`,
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
  }, [gen, currentCat,currentColor])

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
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
            Colours={colours}
            setColours={setColours}
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
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
            Colours={colours}
            setColours={setColours}
          />
        )}

        {isLoaded ? (
          <Items items={items} />
        ) : (
          <section className='w-screen flex justify-center items-center align-middle h-screen   max-[800px]:pl-20 max-[500px]:pl-0 max-[500px]:w-full z-0 overflow-hidden '>
            <Loader />
          </section>
        )}
      </section>
    </section>
  )
}
