import HomeCategory from './_components/HomeCategory'
import HomeFaq from './_components/HomeFaq'
import HomeHero from './_components/HomeHero'
import HomePartner from './_components/HomePartner'
import HomeTestimonials from './_components/HomeTestimonials'

export default function Page() {
  return (
    <>
      <HomeHero />
      <HomeCategory />
      <HomePartner />
      <HomeTestimonials />
      <HomeFaq />
    </>
  )
}
