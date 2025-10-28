import { useRef, useState } from 'react'
import { lazy } from 'react'
const Categories = lazy(() => import('../SecondaryComp/categories'))
const Hero = lazy(() => import('../SecondaryComp/heroSection'))
const Footer = lazy(() => import('../PrimaryComp/footer'))
const BestSellers = lazy(() => import('../SecondaryComp/bestSellers'))
const Header = lazy(() => import('../PrimaryComp/header'))
const MoreInfo = lazy(() => import('../SecondaryComp/moreInfo'))
const BuildOutfits = lazy(() => import('../SecondaryComp/buildOutfits'))

export default function Homepage () {
  const heroLeft = useRef(null)
  const heroRight = useRef(null)
  const sellersRef = useRef(null)
  const buildRef = useRef(null)

  return (
    <section className='flex flex-col h-max bg-white overflow-x-hidden  px-5 w-screen overflow-y-auto'>
      <Header />
      <Hero heroLeft={heroLeft} heroRight={heroRight} />
      <Categories heroLeft={heroLeft} heroRight={heroRight} />
      <BestSellers sellersRef={sellersRef} />
      <BuildOutfits buildRef={buildRef} sellersRef={sellersRef} />
      <MoreInfo buildRef={buildRef} />
      <Footer />
    </section>
  )
}
