import { useState } from 'react'
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
  setColor
}) {
  const [Children, setChildren] = useState(chlidren)
  function selector (item) {
    console.log(item)
const use = chlidren.find(i => i.name === item)
console.log(use)

    setChildren(prev =>
      prev.map(i =>
        i.name === item.name
          ? {...i,selected:true}
          : { ...i, selected: false }
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
                onClick={() => selector(item)}
                key={item.name}
                className='hover:border'
                style={{
                  backgroundColor: item.name,
                  width: w,
                  height: h,
                  cursor: 'pointer'
                }}
              ></div>
            ))}
          </>
        ) : (
          <>
            {Children.map(item => (
              <div
                onClick={() => {
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
