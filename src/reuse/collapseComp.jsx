import { useEffect, useState } from 'react'

export default function Collapse ({
  buttonBgColor = 'white',
  buttonTextColor = 'black',
  numberOfCollapsedWords = 10,
  children,
  classname = '',
  buttonStyles = ''
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {}, [])
  return (
    <section style={{ display: 'flex' }}>
      <div className=''>
        {isCollapsed
          ? children
          : children.split(' ').slice(0, numberOfCollapsedWords).join(' ') +
            '      ' +
            '......'}
      </div>
      <button
        onClick={() => {
          setIsCollapsed(e => !e)
        }}
        style={
          isCollapsed
            ? {
                color: buttonTextColor,
                backgroundColor: buttonBgColor,
                borderRadius: 10,
                padding: 5,
                width: 'max-content'
              }
            : {
                color: buttonBgColor,
                backgroundColor: buttonTextColor,
                borderRadius: 10,
                padding: 5,
                width: 'max-content'
              }
        }
      >
        {isCollapsed ? 'Collapse Text' : 'See More'}
      </button>
    </section>
  )
}
