export default function NoItem () {
  return (
    <>
      <main className='grid h-[10%] place-items-center bg-inherit w-[60%] px-6 py-24 sm:py-32 lg:px-8  max-[800px]:w-[90%]'>
        <div className='text-center'>
          <h1 className=' text-2xl font-semibold tracking-tight text-balance text-black'>
            OOPS!!
          </h1>
          <p className='mt-6 text-lg font-medium text-pretty text-gray-600 max-[800px]:mt-2  max-[800px]:text-sm'>
            No Items available at the moment!
          </p>
        </div>
      </main>
    </>
  )
}
