import { MotionConfig } from 'motion/react'
import { Preloader } from '@/components/ui/preloader'
import { useLenis } from '@/lib/use-lenis'
import { Nav } from '@/components/sections/nav'
import { Hero } from '@/components/sections/hero'
import { Build } from '@/components/sections/build'
import { Marquee } from '@/components/sections/marquee'
import { Process } from '@/components/sections/process'
import { Skills } from '@/components/sections/skills'
import { Work } from '@/components/sections/work'
import { About, Contact } from '@/components/sections/about'

export default function App() {
  useLenis()
  return (
    // reducedMotion="user" disables transform animations for people who ask the OS for less motion
    <MotionConfig reducedMotion="user">
      <Preloader label="Anirudh Verma — loading" accent="#e9c46a" />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Build />
        <Skills />
        <Process />
        <Work />
        <About />
        <Contact />
      </main>
    </MotionConfig>
  )
}
