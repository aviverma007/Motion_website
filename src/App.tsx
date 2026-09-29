import { MotionConfig } from 'motion/react'
import { Nav } from '@/components/sections/nav'
import { ExpandHero } from '@/components/sections/expand-hero'
import { Build } from '@/components/sections/build'
import { Skills } from '@/components/sections/skills'
import { Work } from '@/components/sections/work'
import { About, Contact } from '@/components/sections/about'

export default function App() {
  return (
    // reducedMotion="user" disables transform animations for people who ask the OS for less motion
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <ExpandHero />
        <Build />
        <Skills />
        <Work />
        <About />
        <Contact />
      </main>
    </MotionConfig>
  )
}
