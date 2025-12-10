import { useEffect, useState } from 'react'
import Sorting from './Sorting'
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaGooglePay,
  FaApplePay
} from 'react-icons/fa'
export default function InformationBox ({ z = 40 }) {
  const [data, setData] = useState([
    { id: 1, value: 'Information' },
    { id: 2, value: 'Shopping' },
    { id: 3, value: 'Payment' },
    { id: 4, value: 'Confirmation' }
  ])
  const [active, setActive] = useState(1)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState(0)
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [postal, setPostal] = useState(0)
  const [shippingFee, setShippingFee] = useState('unspecified')
  const [payment, setPayment] = useState('Credit card')
  const [paymentSelected, setPaymentSelected] = useState(1)
  const [shippingSelected, setShippingSelected] = useState(1)

  return (
    <section
      style={{ zIndex: z }}
      className=' bg-white w-[55%]  h-full  px-15  pt-0  fixed left-0 top-10 '
    >
      <Sorting
        setActive={setActive}
        fixed={false}
        bgColor='inherit'
        specific={false}
        currentPos={active}
        px={45}
        array={data}
      />
      {active === 1 && (
        <section className='flex flex-col justify-between mt-10  h-100'>
          <InFoBoxUi
            setFirstName={setFirstName}
            setLastName={setLastName}
            setEmail={setEmail}
            setPhone={setPhone}
            className=' '
            boxes={['First name', 'Last name', 'Email', 'Phone']}
          />

          <InFoBoxUi
            setCountry={setCountry}
            setCity={setCity}
            setAddress={setAddress}
            setPostal={setPostal}
            className=''
            boxes={['Country', 'City', 'Street Address', 'Postal code']}
            head='Shipping Address *'
          />
        </section>
      )}

      {active === 2 && (
        <section className='flex flex-col mt-7  h-full'>
          <ShoppingUi
            shippingFee={shippingFee}
            setShippingFee={setShippingFee}
            shippingSelected={shippingSelected}
            setShippingSelected={setShippingSelected}
            children1={['Standard shipping', '5-7 days', 'Free']}
            children2={['Fast Shipping', '3-5 days', '25$']}
          />
        </section>
      )}
      {active === 3 && (
        <section className='flex flex-col mt-7  h-full'>
          <PaymentUi
            setPayment={setPayment}
            paymentSelected={paymentSelected}
            setPaymentSelected={setPaymentSelected}
            children1={['Credit card', <VisaAndMaster />]}
            children2={[
              'Apple Pay',
              <FaApplePay className=' text-4xl px-1' size={38} />
            ]}
            children3={[
              'Google Pay',
              <FaGooglePay
                size={30}
                className=' w-15 border-black  '
                color='green'
              />
            ]}
          />
        </section>
      )}
      {active === 4 && (
        <section className='flex flex-col mt-7  h-full'>
          <ConfirmationUi
            firstName={firstName}
            lastName={lastName}
            address={address}
            postal={postal}
            city={city}
            phone={phone}
            payment={payment}
            email={email}
            country={country}
            shippingFee={shippingFee}
          />
        </section>
      )}
    </section>
  )
}

function ConfirmationUi ({
  firstName,
  lastName,
  address,
  postal,
  city,
  phone,
  payment,
  email,
  country,
  shippingFee
}) {
  return (
    <section className='flex flex-col w-full h-150   px-9 gap-8'>
      <section className='flex justify-between items-center border-b pb-4'>
        <div className='flex flex-col gap-3'>
          <header className='text-2xl font-semibold'>
            Contact Information
          </header>
          <ul className='flex text-[15px] text-gray-700 gap-2'>
            <li>{firstName} </li>
            <li>{lastName}</li>,<li>{email}</li>,<li>{phone}</li>
          </ul>
        </div>

        <div className='underline text-[13px] cursor-pointer'>Edit</div>
      </section>
      <section className='flex justify-between items-center pb-4 border-b'>
        <div className='flex flex-col gap-3'>
          <header className='text-2xl font-semibold'>Shipping Address</header>
          <ul className='flex text-[15px] text-gray-700 gap-2'>
            <li>{country}</li>,<li>{city}</li>,<li>{address}</li>,
            <li>{postal}</li>
          </ul>
        </div>

        <div className='underline text-[13px] cursor-pointer'>Edit</div>
      </section>
      <section className='flex justify-between items-center border-b pb-4'>
        <div className='flex flex-col gap-3'>
          <header className='text-2xl font-semibold'>Shipping Method</header>
          <ul className='flex text-[15px] text-gray-700'>
            <li>{shippingFee} </li>
          </ul>
        </div>

        <div className='underline text-[13px] cursor-pointer'>Edit</div>
      </section>
      <section className='flex justify-between items-center border-b pb-4'>
        <div className='flex flex-col gap-3'>
          <header className='text-2xl font-semibold'>Payment Method</header>
          <ul className='flex text-[15px] text-gray-700'>
            <li>{payment}</li>
          </ul>
        </div>

        <div className='underline text-[13px] cursor-pointer'>Edit</div>
      </section>
    </section>
  )
}

function VisaAndMaster () {
  return (
    <section className='flex gap-2'>
      <FaCcMastercard className='text-red-600' size={40} />
      <FaCcVisa color='blue' size={40} />
    </section>
  )
}

function PaymentUi ({
  head = 'Shopping',
  setPayment,
  paymentSelected = 1,
  setPaymentSelected = () => {},
  children1 = [],
  children2 = [],
  children3 = [],
  boxes = [
    { id: 1, value: children1 },
    { id: 2, value: children2 },
    { id: 3, value: children3 }
  ],
  className = '',
  gap = 35
}) {
  const handleSelect = value => {
    switch (value) {
      case 1:
        setPayment('Credit Card')
        break

      case 2:
        setPayment('Apple Pay')
        break

      case 3:
        setPayment('Google Pay')
        break
      default:
        break
    }

    setPaymentSelected(value)
  }

  return (
    <section className={`${className} px-5 `}>
      <header className='text-3xl font-semibold mb-7 '>{head}</header>

      <section style={{ gap: gap }} className='flex-col flex w-full '>
        {boxes.map(item => (
          <div
            onClick={() => handleSelect(item.id)}
            key={item.id}
            className='flex gap-6 items-center cursor-pointer border-black border-b'
          >
            <span
              style={
                item.id === paymentSelected
                  ? { backgroundColor: 'black' }
                  : { backgroundColor: 'white' }
              }
              className='w-4 h-4 rounded-3xl border '
            ></span>
            <div></div>
            <div className='flex w-full justify-between'>
              {item.value.map((each, idx) => (
                <div key={idx}>{each} </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </section>
  )
}
function ShoppingUi ({
  head = 'Shopping',
  shippingFee,
  setShippingFee,
  shippingSelected = 1,
  setShippingSelected = () => {},
  children1 = [],
  children2 = [],
  boxes = [
    { id: 1, value: children1 },
    { id: 2, value: children2 }
  ],
  className = '',
  gap = 35
}) {
  const handleSelect = (value, input) => {
    const res = input.value.join(' ')

    setShippingFee(res)
    setShippingSelected(value)
  }

  useEffect(() => {
    if (shippingFee === 'unspecified') {
      setShippingFee('Standard shipping 5-7 days Free')
    }
  }, [shippingFee, setShippingFee])

  return (
    <section className={`${className} px-5 `}>
      <header className='text-3xl font-semibold mb-7 '>{head}</header>

      <section style={{ gap: gap }} className='flex-col flex w-full '>
        {boxes.map(item => (
          <div
            onClick={() => {
              handleSelect(item.id, item)
            }}
            key={item.id}
            className='flex gap-6 items-center cursor-pointer border-black border-b'
          >
            <span
              style={
                item.id === shippingSelected
                  ? { backgroundColor: 'black' }
                  : { backgroundColor: 'white' }
              }
              className='w-4 h-4 rounded-3xl border '
            ></span>
            <div className='flex w-full justify-between'>
              {item.value.map((each, i) => (
                <div key={i}>{each}</div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </section>
  )
}

function InFoBoxUi ({
  head = 'Contact *',
  boxes = [1, 2, 3, 4],
  height = 50,
  className = '',
  setFirstName,
  setLastName,
  setCountry,
  setCity,
  setAddress,
  setEmail,
  setPhone,
  setPostal
}) {
  function setter (item, input) {
    const use = item.toLowerCase()
    // console.log(use)
    // console.log(input)

    if (use.includes('first')) {
      console.log(input)
    }
    use.includes('first')
      ? setFirstName(input)
      : use.includes('last')
      ? setLastName(input)
      : use.includes('email')
      ? setEmail(input)
      : use.includes('phone')
      ? setPhone(input)
      : use.includes('country')
      ? setCountry(input)
      : use.includes('city')
      ? setCity(input)
      : use.includes('address')
      ? setAddress(input)
      : use.includes('code')
      ? setPostal(input)
      : null
  }
  return (
    <section
      style={{ minheight: height }}
      className={`${className}  flex flex-col`}
    >
      <header className='text-2xl pb-5 font-semibold'>{head}</header>
      <section className='flex gap-5 flex-wrap'>
        {boxes.map(item => (
          <input
            type={
              item.includes('Phone') || item.includes('code')
                ? 'number'
                : 'text'
            }
            onChange={e => {
              setter(item, e.target.value)
            }}
            placeholder={item}
            className='border shrink-0 w-[40%] p-3 text-sm text-gray-500'
          />
        ))}
      </section>
    </section>
  )
}
