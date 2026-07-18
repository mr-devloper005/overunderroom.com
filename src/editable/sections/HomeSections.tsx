import Link from 'next/link'
import { ArrowDown, ArrowRight, Search } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const frame = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-8 lg:px-12'

function dedupe(posts: SitePost[]) {
  const seen = new Set<string>()
  return posts.filter((post) => {
    const key = String(post.slug || post.id || post.title)
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function poolOf(posts: SitePost[], sections: HomeTimeSection[]) {
  return dedupe([...posts, ...sections.flatMap((section) => section.posts)])
}

function safeTitle(post?: SitePost) {
  return post?.title?.trim() || 'A fresh perspective worth exploring'
}

function Media({ post, className = '' }: { post?: SitePost; className?: string }) {
  return post ? <img src={getEditablePostImage(post)} alt={safeTitle(post)} className={`h-full w-full object-cover grayscale transition duration-700 group-hover:scale-[1.04] group-hover:grayscale-0 ${className}`} /> : <div className="h-full w-full bg-[linear-gradient(135deg,#A1CB35,#FFDE4E_55%,#FF9D4D)]" />
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = poolOf(posts, timeSections)
  const lead = pool[0]
  const side = pool.slice(1, 4)
  const categories = SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile').slice(0, 5)

  return (
    <section className="editorial-grid relative min-h-[calc(100vh-86px)] overflow-hidden border-b border-[var(--editable-border)]">
      <div className={`${frame} relative flex min-h-[calc(100vh-86px)] flex-col py-12 lg:py-16`}>
        <div className="grid flex-1 gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
          <div className="relative z-10 flex flex-col justify-between">
            <div>
              <p className="editorial-kicker">Independent discoveries · Curated daily</p>
              <h1 className="mt-8 max-w-[760px] text-[clamp(4.2rem,9vw,9.7rem)] font-normal leading-[0.76] tracking-[-0.075em] text-[var(--slot4-page-text)]">
                Ideas <em className="font-normal text-[var(--slot4-accent-fill)]">worth</em><br />keeping.
              </h1>
              <p className="mt-8 max-w-md text-base leading-7 text-[var(--slot4-muted-text)] sm:text-lg">
                A considered collection of useful resources, thoughtful stories and timely perspectives for curious people.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              {categories.map((task) => (
                <Link key={task.key} href={task.route} className="editorial-chip">{task.label}</Link>
              ))}
            </div>
          </div>

          <div className="relative min-h-[500px] lg:min-h-0">
            <div className="absolute left-[7%] top-[4%] h-[72%] w-[64%] rotate-[-2deg] overflow-hidden border border-[var(--editable-border-strong)] bg-[var(--slot4-dark-bg)] shadow-2xl group">
              <Media post={lead} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="editorial-kicker text-white/60">01 · Featured note</p>
                <Link href={lead ? postHref(primaryTask, lead, primaryRoute) : primaryRoute} className="mt-3 block max-w-xl text-3xl leading-[0.98] text-white sm:text-5xl">{safeTitle(lead)}</Link>
              </div>
            </div>
            <div className="absolute right-[1%] top-[16%] h-[34%] w-[31%] rotate-[3deg] overflow-hidden border border-[var(--editable-border-strong)] bg-[#181a1d] group">
              <Media post={side[0]} />
              <span className="absolute left-3 top-3 bg-[var(--slot4-accent-fill)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#111]">In focus</span>
            </div>
            <div className="absolute bottom-[4%] right-[9%] h-[31%] w-[48%] rotate-[1deg] overflow-hidden border border-[var(--editable-border-strong)] bg-[#181a1d] group">
              <Media post={side[1]} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-transparent" />
              <p className="absolute bottom-4 left-5 max-w-[75%] text-xl leading-tight text-white">{safeTitle(side[1])}</p>
            </div>
            <div className="absolute bottom-[7%] left-0 hidden h-[23%] w-[25%] -rotate-[4deg] overflow-hidden border border-[var(--editable-border-strong)] bg-[#181a1d] group sm:block"><Media post={side[2]} /></div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-[var(--editable-border)] pt-5">
          <form action="/search" className="flex w-full max-w-xl items-center border border-[var(--editable-border-strong)] bg-[var(--slot4-surface-bg)]">
            <Search className="ml-4 h-4 w-4 text-[var(--slot4-accent-fill)]" />
            <input name="q" aria-label="Search" placeholder="Search the collection" className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-sm outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
            <button className="border-l border-[var(--editable-border)] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.15em] transition hover:bg-[var(--slot4-accent-fill)] hover:text-[#111]">Find</button>
          </form>
          <a href="#latest" className="ml-6 hidden items-center gap-3 text-sm text-[var(--slot4-muted-text)] sm:flex">Scroll <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--editable-border-strong)]"><ArrowDown className="h-4 w-4" /></span></a>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = poolOf(posts, timeSections).slice(0, 5)
  if (!pool.length) return null
  return (
    <section id="latest" className="border-b border-[var(--editable-border)]">
      <div className={`${frame} py-16 lg:py-24`}>
        <div className="mb-10 flex items-end justify-between gap-6">
          <div><p className="editorial-kicker">( The edit )</p><h2 className="mt-4 text-4xl font-normal sm:text-6xl">Selected this week</h2></div>
          <Link href={primaryRoute} className="editorial-link">View the index <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid border-l border-t border-[var(--editable-border)] md:grid-cols-2 xl:grid-cols-4">
          {pool.map((post, index) => (
            <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className={`group flex min-h-[420px] flex-col border-b border-r border-[var(--editable-border)] ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
              {index === 0 ? <div className="relative min-h-[330px] flex-1 overflow-hidden"><Media post={post} /><span className="absolute left-5 top-5 bg-[var(--slot4-accent-fill)] px-3 py-1 text-xs font-bold text-[#111]">FEATURED</span></div> : null}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]"><span>{getEditableCategory(post)}</span><span>{String(index + 1).padStart(2, '0')}</span></div>
                <h3 className={`${index === 0 ? 'text-4xl sm:text-5xl' : 'text-2xl'} mt-6 leading-[1.03]`}>{safeTitle(post)}</h3>
                <p className="mt-5 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 150) || 'Open this entry for the full story, context and useful details.'}</p>
                <ArrowRight className="mt-auto h-5 w-5 self-end transition group-hover:translate-x-2 group-hover:text-[var(--slot4-accent-fill)]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = poolOf(posts, timeSections).slice(5, 9)
  if (!pool.length) return null
  return (
    <section className="editorial-grid border-b border-[var(--editable-border)] bg-[var(--slot4-panel-bg)]">
      <div className={`${frame} py-16 lg:py-24`}>
        <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
          <div className="lg:sticky lg:top-28 lg:self-start"><p className="editorial-kicker">( Perspectives )</p><h2 className="mt-5 text-5xl font-normal leading-[0.9] sm:text-7xl">People,<br /><em className="text-[var(--slot4-accent-fill)]">places</em> &<br />good ideas.</h2><p className="mt-7 max-w-sm leading-7 text-[var(--slot4-muted-text)]">Meet the voices and resources shaping useful conversations.</p></div>
          <div className="divide-y divide-[var(--editable-border)] border-y border-[var(--editable-border)]">
            {pool.map((post, index) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group grid gap-5 py-6 sm:grid-cols-[80px_1fr_150px_40px] sm:items-center">
                <span className="text-4xl italic text-[var(--slot4-soft-muted-text)]">0{index + 1}</span>
                <div><p className="editorial-kicker">{getEditableCategory(post)}</p><h3 className="mt-3 text-2xl leading-tight sm:text-3xl">{safeTitle(post)}</h3></div>
                <div className="hidden aspect-[4/3] overflow-hidden sm:block"><Media post={post} /></div>
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-2 group-hover:text-[var(--slot4-accent-fill)]" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const fallback = [{ key: 'archive', href: primaryRoute, posts: posts.slice(9, 17) }]
  const sections = (timeSections.length ? timeSections : fallback).filter((section) => section.posts.length).slice(0, 3)
  if (!sections.length) return null
  return (
    <section className="border-b border-[var(--editable-border)]">
      <div className={`${frame} py-16 lg:py-24`}>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6"><div><p className="editorial-kicker">( Knowledge )</p><h2 className="mt-4 text-4xl font-normal sm:text-6xl">More to discover</h2></div><p className="max-w-sm text-sm leading-7 text-[var(--slot4-muted-text)]">Browse recent additions, saved resources and stories from across the collection.</p></div>
        <div className="space-y-16">
          {sections.map((section, sectionIndex) => (
            <div key={section.key}>
              <div className="mb-6 flex items-center justify-between border-b border-[var(--editable-border-strong)] pb-4"><h3 className="text-xl">{sectionIndex === 0 ? 'Recently published' : sectionIndex === 1 ? 'In focus' : 'From the archive'}</h3><Link href={section.href || primaryRoute} className="editorial-link">Explore all <ArrowRight className="h-4 w-4" /></Link></div>
              <div className="grid gap-0 border-l border-t border-[var(--editable-border)] sm:grid-cols-2 lg:grid-cols-4">
                {section.posts.slice(0, 8).map((post, index) => (
                  <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group border-b border-r border-[var(--editable-border)]">
                    {index % 3 !== 1 ? <div className="aspect-[4/3] overflow-hidden"><Media post={post} /></div> : null}
                    <div className="p-5"><p className="editorial-kicker">{getEditableCategory(post)}</p><h4 className="mt-4 text-xl leading-tight">{safeTitle(post)}</h4><p className="mt-4 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 95)}</p></div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="relative overflow-hidden bg-[var(--slot4-accent-fill)] text-[#111]">
      <div className={`${frame} relative py-20 lg:py-28`}>
        <span className="pointer-events-none absolute -right-12 -top-28 text-[23rem] leading-none text-black/[0.06]">&</span>
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em]">Have something to add?</p><h2 className="mt-5 max-w-4xl text-5xl font-normal leading-[0.88] tracking-[-0.055em] sm:text-7xl lg:text-8xl">Bring your next<br />idea into view.</h2></div>
          <div className="flex flex-wrap gap-3"><Link href="/create" className="inline-flex items-center gap-2 bg-[#111] px-6 py-4 text-sm font-bold text-white">Create a post <ArrowRight className="h-4 w-4" /></Link><Link href="/contact" className="border border-[#111] px-6 py-4 text-sm font-bold">Contact</Link></div>
        </div>
      </div>
    </section>
  )
}
