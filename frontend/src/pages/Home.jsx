import HomeHero from '../components/home/HomeHero'
import HomeStats from '../components/home/HomeStats'
import HomeServices from '../components/home/HomeServices'
import HomePackages from '../components/home/HomePackages'
import HomeTemplates from '../components/home/HomeTemplates'
import HomeTools from '../components/home/HomeTools'
import HomeTestimonials from '../components/home/HomeTestimonials'
import HomeFaq from '../components/home/HomeFaq'
import HomeCta from '../components/home/HomeCta'

export default function Home() {
  return (
    <div className="bg-white">
      <HomeHero />
      <HomeStats />
      <HomeServices />
      <HomePackages />
      <HomeTemplates />
      <HomeTools />
      <HomeTestimonials />
      <HomeFaq />
      <HomeCta />
    </div>
  )
}
