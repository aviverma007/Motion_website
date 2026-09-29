import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'motion/react'
import { projects } from '../data'

/** Soft clay object that differs per project. */
function ClayObject({ tone, index }) {
  const shapes = ['orb', 'arch', 'stack', 'ring', 'pill', 'cube']
  return (
    <div className={`clay-object clay-object--${shapes[index % shapes.length]} tone-${tone}`} aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
  )
}

function ProjectCard({ project, index, total, progress }) {
  const reduced = useReducedMotion()
  const targetScale = 1 - (total - index) * 0.035
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 150, damping: 18 })
  const sry = useSpring(ry, { stiffness: 150, damping: 18 })

  function onMove(e) {
    if (reduced) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * 8)
    rx.set(-py * 8)
  }
  function onLeave() {
    rx.set(0)
    ry.set(0)
  }

  return (
    <div className="card-slot" style={{ top: `calc(11vh + ${index * 26}px)` }}>
      <motion.article
        className={`project-card tone-${project.tone}`}
        style={{ scale: reduced ? 1 : scale, rotateX: srx, rotateY: sry }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <div className="project-text">
          <div className="project-meta">
            <span className="project-id">{project.id}</span>
            <span className="project-kind">{project.kind}</span>
          </div>
          <h3>{project.title}</h3>
          <p>{project.blurb}</p>
          <ul className="tags">
            {project.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="project-visual">
          <ClayObject tone={project.tone} index={index} />
        </div>
      </motion.article>
    </div>
  )
}

export default function Work() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <section className="section work" id="work">
      <div className="section-head">
        <div className="section-label">
          <span>(02)</span> Selected work
        </div>
        <motion.h2
          className="display"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <em>Things</em> I’ve shipped
        </motion.h2>
        <p className="section-note">
          Internal tools built for real teams — finance, sales, HR and procurement. Screens are private,
          so these are the stories behind them.
        </p>
      </div>

      <div className="card-stack" ref={ref}>
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} total={projects.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}
