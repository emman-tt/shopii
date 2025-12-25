import { useNavigate, useLocation } from 'react-router-dom'
import { FilterContext } from '../App'
import { useContext, useEffect } from 'react'
export default function PageNavigation ({
  z = 10,
  height = 6,
  top = 27,
  className,
  style,
  pt = 3,
  product = false
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const { state, dispatch } = useContext(FilterContext)

  const { currentSPP } = state
  const productPath = location?.pathname === '/products'
  return (
    <section
      className={`bg-white h-${height}  max-xl:pl-[15%] max-md:pl-[6%] w-full fixed z-${z} ${className} ${style} top-${top} flex gap-1 text-[15px] pl-[30%] pb-10 pt-${pt} ${
        product === true
          ? ' max-[800px]:top-19 max-sm:top-32 max-sm:z-3 max-sm:pl-[13%] '
          : ''
      }`}
    >
      <div
        onClick={() => navigate('/')}
        className='text-[#696969c0] cursor-pointer hover:underline'
      >
        home
      </div>
      <div>/</div>
      <div
        onClick={() => (!productPath ? navigate('/products') : null)}
        className={`cursor-pointer ${
          !productPath ? 'text-[#696969c0] hover:underline' : ''
        }`}
      >
        products
      </div>
      {!productPath && (
        <>
          <div>/</div>
          <div className='cursor-pointer'>{currentSPP}</div>
        </>
      )}
    </section>
  )
}
