import { Filter, Check, Square } from 'lucide-react'
export default function Filtering ({
  width = '20%',
  isActive,
  setIsActive,
  categories,
  Colours,
  dispatch,
  changeColor,
  changeCategory
}) {
  return (
    <section
      className={`w-[${width}] fixed max-[500px]:mt-17  mt-13  max-[1040px]:mt-20 z-10 max-[500px]:w-full bg-white    max-[500px]:pl-[10%] max-[500px]:fixed max-[500px]:bottom-0 max-[500px]:z-1 max-[500px]:overflow-hidden max-[500px]:h-screen max-[500px]:top-0 max-[500px]:py-10 bottom-0 overflow-hidden min-h-150 left-0 top-[10%]  `}
    >
      <section className='max-[500px]:overflow-y-scroll  overflow-y-scroll  [scrollbar-width:none] h-full pb-10'>
        <section className=' w-full px-7 justify-between max-[800px]:text-[12px] flex max-[1040px]:px-2 max-[800px]:px-1 max-[500px]:h-max '>
          <div className='flex gap-2 items-center max-[500px]:text-[17px] '>
            Filters <Filter />
          </div>
          <div className='border-b pb-0.5 max-[800px]:pb-0.2 max-[500px]:text-[9px] flex  self-center max-[500px]:mr-[13%]'>
            Clear all
          </div>
        </section>

        <section className='flex flex-col pl-10 pt-9 max-[800px]:pt-1 max-[1040px]:pl-3 max-[500px]:pt-10'>
          <p className='text-[16px] font-bold pb-3 max-[800px]: max-[800px]:text-[14px]'>
            Categories
          </p>

          <section className=' w-full  flex flex-col max-[800px]:gap-0   gap-1.5 max-[500px]:gap-1.5'>
            {categories.map(item => (
              <section
                onClick={() => {
                  dispatch({ type: 'changeCategory', payload: item.id }),
                    changeCategory(item.id)
                }}
                className='flex gap-4 max-[800px]:gap-2 text-[13px] align-middle items-center cursor-pointer max-[800px]:text-[10px] max-[500px]:text-[14px]'
                key={item.id}
              >
                <div className='relative flex items-center justify-center w-6 h-6 '>
                  <Square className='absolute' size={15} />
                  {item.selected ? (
                    <Check className='absolute text-black' size={7} />
                  ) : null}
                </div>

                <div>{item.cat}</div>
              </section>
            ))}
          </section>
        </section>
        <section className='flex flex-col pl-10 pt-9 max-[1040px]:pl-5 max-[800px]:pt-1 max-[500px]:pt-10'>
          <p className='text-[16px] font-bold pb-3 max-[800px]:pb-1'>Colours</p>
          <section className=' w-full  flex flex-col  align-middle gap-0.5 max-[500px]:gap-2 '>
            {Colours.map(item => (
              <section
                onClick={() => {
                  changeColor(item.col)
                  dispatch({ type: 'changeColour', payload: item.col })
                }}
                key={item.col}
                className='flex gap-4 text-[13px] align-middle items-center max-[800px]:text-[10px] max-[800px]:gap-2 max-[500px]:text-[14px]'
              >
                <div className='relative flex items-center justify-center w-6 h-6 '>
                  <Square className='absolute' size={15} />
                  {item.selected ? (
                    <Check className='absolute text-black' size={7} />
                  ) : null}
                </div>

                <div
                  style={{ backgroundColor: item.col }}
                  className={`w-2.5 h-2.5 rounded-4xl`}
                ></div>
                {item.col}
              </section>
            ))}
          </section>
        </section>
        <button
          onClick={() => {
            setIsActive(false)
          }}
          className='w-[90%] mt-3 py-2 flex justify-center items-center align-bottom ml-6 max-[800px]:mt-1 max-[800px]:py-1 bg-black text-white max-[1040px]:ml-2 max-[500px]:mt-6 max-[500px]:mb-20 max-[500px]:py-5'
        >
          Save
        </button>
      </section>
    </section>
  )
}
