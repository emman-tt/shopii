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
import { useFetching } from '../hooks/useFetching'
import { lazy } from 'react'
import Overlay from '../reuse/overlay'
const CartUi = lazy(() => import('../SecondaryComp/Cart'))
const MobileMenu = lazy(() => import('../reuse/mobileMenu'))
export default function Products ({
  menu,
  showMenu,
  cart,
  showCart,
  recur,
  setRecur, checkout,
  showCheckout
}) {
  const [page, setPage] = useState(2)
  const [gen, setGen] = useState(2)
  const [currentCat, setCurrentCat] = useState(1)
  const isMobiles = innerWidth <= 500
  const [isActive, setIsActive] = useState(false)
  const [categories, setCategories] = useState(Categories)
  const [currentColor, setCurrentColor] = useState('all')
  const [colours, setColours] = useState(Colours)
  const [current, setCurrent] = useState(2)

  const { isLoaded, items } = useFetching(page, gen, currentCat, currentColor)

  return (
    <section>
      <Header
        showCart={showCart}
        showMenu={showMenu}
        menu={menu}
        fixed={true}
        recur={recur}
              showCheckout={showCheckout}
      ></Header>

      <Sorting
        current={current}
        setCurrent={setCurrent}
        setGen={setGen}
        array={[
          { id: 1, value: 'For Men' },
          { id: 2, value: 'For  Women' },
          { id: 3, value: 'For Children' },
          { id: 4, value: 'Unisex' }
        ]}
      />
      {menu && <MobileMenu showCart={showCart} showCheckout={showCheckout} showMenu={showMenu} />}
      {cart && <Overlay showCart={showCart} />}
      {cart && <CartUi checkout={checkout} showCheckout={showCheckout} setRecur={setRecur} showCart={showCart} />}
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
          <section className='w-full flex justify-center items-center align-middle h-screen   max-[800px]:pl-20 max-[500px]:pl-0 max-[500px]:w-full z-0 overflow-x-hidden '>
            <Loader />
          </section>
        )}
      </section>
    </section>
  )
}
