import { useState } from 'react'
import { Check } from 'lucide-react'
export default function FeaturesComp ({
  feature = 'Number',
  icon,
  chlidren = [],
  colour = false,
  w = 4,
  h = 4,
  gap = 4,
  className,
  setSize,
  setColor,
}) {
  const [Children, setChildren] = useState(chlidren)
  function selector (item) {
    setChildren(prev =>
      prev.map(i =>
        i.name === item ? { ...i, selected: true } : { ...i, selected: false }
      )
    )
  }

  return (
    <section className={className}>
      <div style={{ gap: gap, display: 'flex' }}>
        {feature}
        {icon && <span>{icon}</span>}
      </div>
      <section className={`flex gap-${gap}`}>
        {colour ? (
          <>
            {Children.map(item => (
              <div
                onClick={() => {
                  setColor(item.name), selector(item.name)
                }}
                key={item.name}
                className=' flex place-content-center relative justify-center align-middle border'
                style={{
                  backgroundColor: item.name,
                  width: w,
                  height: h,
                  cursor: 'pointer'
                }}
              >
                {item.selected ? (
                  <Check
                    className='absolute text-black'
                    color='white'
                    size={10}
                  />
                ) : null}
              </div>
            ))}
          </>
        ) : (
          <>
            {Children.map(item => (
              <div
                onClick={() => {
                  setSize(item.name)
                  selector(item.name)
                }}
                key={item.name}
                style={
                  item.selected
                    ? { backgroundColor: 'black', color: 'white' }
                    : { backgroundColor: 'white', color: 'black' }
                }
                className='cursor-pointer border px-2 rounded'
              >
                {item.name}
              </div>
            ))}
          </>
        )}
      </section>
    </section>
  )
}
