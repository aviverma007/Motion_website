'use client'
import { ArrowDown } from 'lucide-react'
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero'
import { profile, stats } from '@/data'

// Night-sky mountains (Unsplash) fades out as the media expands
const BG = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80'

export function ExpandHero() {
  return (
    <div id="top">
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/showcase/pastel-scene.jpg"
        bgImageSrc={BG}
        title={profile.name}
        date={profile.role}
        scrollToExpand="Scroll to expand"
        textBlend
      >
        <div className="mx-auto max-w-4xl">
          <p className="label mb-6">(00) Hello</p>
          <p className="text-2xl md:text-4xl leading-[1.25] tracking-tight max-w-3xl">
            {profile.intro}
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="font-serif text-4xl md:text-5xl leading-none">{s.value}</div>
                <p className="mt-3 text-sm text-muted-foreground leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
          <a
            href="#build"
            className="mt-12 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            See what I can build <ArrowDown size={14} />
          </a>
        </div>
      </ScrollExpandMedia>
    </div>
  )
}
