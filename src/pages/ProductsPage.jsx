import { lazy } from 'react'
import Header from '../PrimaryComp/header'
import { useState, useEffect, useContext } from 'react'
import Filtering from '../reuse/filteringUi'
const Items = lazy(() => import('../SecondaryComp/ProductItems'))
import Loader from '../reuse/loadingAnime'
import { Filter, X } from 'lucide-react'
import Sorting from '../SecondaryComp/Sorting'
import { useFetching } from '../hooks-and-reducers/useFetching.jsx'
const Overlay = lazy(() => import('../reuse/overlay'))
const CartUi = lazy(() => import('../SecondaryComp/Cart'))
const MobileMenu = lazy(() => import('../reuse/mobileMenu'))
import { FilterContext } from '../App.jsx'
const PageNavigation = lazy(() => import('../SecondaryComp/pageNavigation.jsx'))

const PageFooter = lazy(() => import('../reuse/pageFooter.jsx'))
export default function Products ({
  menu,
  showMenu,
  cart,
  showCart,
  checkout,
  showCheckout
}) {
  const isMobiles = innerWidth <= 500
  const [isActive, setIsActive] = useState(false)
  const { state, dispatch } = useContext(FilterContext)
  const { genderId, categoryId, colourId, pageId, colours, categories } = state

  const { isLoaded, items } = useFetching(
    pageId,
    genderId,
    categoryId,
    colourId
  )
  const [current, setCurrent] = useState(genderId)

  function changeCategory (id) {
    dispatch({ type: 'changeFilterCategory', payload: id })
  }

  function changeColor (item) {
    dispatch({ type: 'changeFilterColor', payload: item })
  }

  return (
    <section>
      <Header
        showCart={showCart}
        showMenu={showMenu}
        menu={menu}
        fixed={true}
        showCheckout={showCheckout}
      ></Header>

      <Sorting
        current={current}
        setCurrent={setCurrent}
        dispatch={dispatch}
        px={innerWidth < 450 ? 15 : 5}
        array={[
          { id: 1, value: 'For Men' },
          { id: 2, value: 'For  Women' },
          { id: 3, value: 'For Children' },
          { id: 4, value: 'Unisex' }
        ]}
      />
      <PageNavigation product={true} />
      {menu && (
        <MobileMenu
          showCart={showCart}
          showCheckout={showCheckout}
          showMenu={showMenu}
        />
      )}
      {cart && <Overlay showCart={showCart} />}
      {cart && (
        <CartUi
          checkout={checkout}
          showCheckout={showCheckout}
          showCart={showCart}
        />
      )}
      <section className='w-full relative  mt-10 min-h-screen flex flex-col'>
        {isMobiles ? (
          <section className=' w-full mt-12 pt-5 pb-2 pl-[7%] mb-4 flex fixed z-10 bg-white   gap-14'>
            <div
              onClick={() => {
                setIsActive(!isActive)
              }}
              className='flex gap-2 items-center text-[18px] font-bold'
            >
              Filters
              <span>{isActive ? <X size={20} /> : <Filter size={20} />}</span>
            </div>
            <section className='flex  gap-5 text-sm'>
              <div
                onClick={() => {
                  setIsActive(!isActive)
                }}
                className=' rounded-4xl p-1 px-4  bg-blue-100 text-blue-700 text-nowrap overflow-hidden max-w-25'
              >
                {categories[categoryId - 1].cat}
              </div>

              {colours.map(
                item =>
                  item.selected && (
                    <div
                      onClick={() => {
                        setIsActive(!isActive)
                      }}
                      style={{ backgroundColor: item.bg, color: item.col }}
                      className={` rounded-4xl p-1 px-4 `}
                    >
                      {item.col}
                    </div>
                  )
              )}
            </section>
          </section>
        ) : (
          <Filtering
            categories={categories}
            Colours={colours}
            dispatch={dispatch}
            changeCategory={changeCategory}
            changeColor={changeColor}
          />
        )}

        {isActive && isMobiles && (
          <Filtering
            categories={categories}
            isActive={isActive}
            setIsActive={setIsActive}
            dispatch={dispatch}
            Colours={colours}
            changeCategory={changeCategory}
            changeColor={changeColor}
          />
        )}

        {isLoaded ? (
          <>
            <Items items={items} />
            <PageFooter />
          </>
        ) : (
          <section className='w-full flex justify-center items-center align-middle h-screen   max-[800px]:pl-20 max-[500px]:pl-0 max-[500px]:w-full z-0 overflow-x-hidden '>
            <Loader />
          </section>
        )}
      </section>
    </section>
  )
}
