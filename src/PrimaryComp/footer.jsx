export default function Footer () {
  return (
    <section className='h-max w-full flex flex-row bg-[#98939332] mt-10 justify-between text-black pt-5 px-[5%] max-[800px]:flex-col'>
      <section className='w-[40%] flex flex-col max-[1026px]:w-[30%] max-[800px]:w-full'>
        <h2 className='text-4xl font-bold '>Get in Touch With Us</h2>
        <div className='mt-10'>
          Shop with confidence. Enjoy free shipping on orders over $50, easy
          30-day returns, and dedicated customer support ready to assist you
          every step of the way.
        </div>

        <div className='border-b mt-7 w-[40%]  mb-10 max-[1026px]:w-full '>
          <input
            type='text'
            placeholder='Email'
            className='not-focus-visible:'
          />
        </div>
      </section>

      <section className='flex w-[45%] max-[1026px]:w-[60%]  gap-15 max-[800px]:w-full max-[800px]:justify-between max-[800px]:px-[15%] max-[800px]:pb-10 max-[500px]:px-0 max-[380px]:flex-col'>
        <ul className='text-[15px] max-[800px]:text-[12px] text-center max-[380px]:text-left font-light flex flex-col max-[380px]:text-[16px] max-[380px]:font-normal'>
          <li className='mb-1 text-[19px] max-[800px]:text-[14px] font-medium max-[380px]:text-2xl max-[380px]:mb-3'>
            Shop Addresses
          </li>
          <li>Ghana</li>
          <li>China</li>
          <li>Russia</li>
          <li>Mali</li>
        </ul>

        <ul className='text-[14px] max-[800px]:text-[12px] text-center max-[380px]:text-left font-light flex flex-col max-[380px]:text-[16px] max-[380px]:font-normal'>
          <li className='mb-1 text-[19px] font-medium max-[800px]:text-[14px] max-[380px]:text-2xl max-[380px]:mb-3'>
            Customer Services
          </li>
          <li>FAQ</li>
          <li>Products</li>
          <li>Delivery</li>
          <li>User Agreement</li>
          <li>Promotions</li>
          <li>Loyalty Progress</li>
        </ul>

        <ul className='text-[14px] max-[800px]:text-[12px] text-center max-[380px]:text-left font-light flex flex-col max-[380px]:text-[16px] max-[380px]:font-normal'>
          <li className='mb-1 text-[19px] font-medium max-[800px]:text-[14px] max-[380px]:text-2xl max-[380px]:mb-3'>
            About Us
          </li>
          <li>Twitter</li>
          <li>Facebook</li>
          <li>Instagram</li>
          <li>Resources</li>
        </ul>
      </section>
    </section>
  )
}