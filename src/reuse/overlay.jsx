export default function Overlay ({ z = 30, showCart }) {
  return (
    <section
      style={{ zIndex: z }}
      onClick={() => {
        showCart(false)
      }}
      className='h-screen w-screen overflow-hidden fixed bg-[#000000c6] '
    ></section>
  )
}
