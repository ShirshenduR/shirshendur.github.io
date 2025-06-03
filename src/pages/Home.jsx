import { ThemeToggle } from '../components/ThemeToggle'
import {Starsbackground} from '../components/Starsbackground'
import { Navbar } from '../components/Navbar'
import { HeroSection } from '../components/HeroSection'
import { Aboutme } from '../components/Aboutme'
import { Skills } from '../components/Skills'
import { Projects } from '../components/Projects'
import { Footer } from '../components/Footer'
import { Contactme } from '../components/Contactme'

function Home() {
  return (
    <div className='min-h-screen bg-background text-foreground overflow-x-hidden'>

      {/*THEME toggle*/}
      <ThemeToggle />
      {/*Background effects*/}
      <Starsbackground />
      {/*Navigation bar*/}
      <Navbar />
      
      {/*Main content*/}
      <main>
        <HeroSection />
        <Aboutme />
        <Projects />
        <Skills />
        <Contactme />

      </main>

      {/*Footer*/}
      <Footer />

    </div>
  )
}

export default Home