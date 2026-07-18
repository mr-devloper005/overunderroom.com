'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile')
  const year = new Date().getFullYear()
  return (
    <footer className="editorial-grid border-t border-[var(--editable-border)] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto max-w-[var(--editable-container)] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 border-b border-[var(--editable-border)] pb-14 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div><Link href="/" className="inline-flex items-center gap-4"><img src="/favicon.png" alt="" className="h-16 w-16 shrink-0 object-contain sm:h-20 sm:w-20" /><span className="editable-display text-4xl tracking-[-0.055em] sm:text-6xl">{SITE_CONFIG.name}<span className="text-[var(--slot4-accent-fill)]">.</span></span></Link><p className="mt-6 max-w-lg text-sm leading-7 text-[var(--slot4-muted-text)]">{globalContent.footer?.description || 'A thoughtful index of resources, people and perspectives worth returning to.'}</p></div>
          <div><p className="editorial-kicker">Explore</p><div className="mt-5 grid gap-3">{taskLinks.map((task) => <Link key={task.key} href={task.route} className="group flex items-center justify-between border-b border-[var(--editable-border)] pb-3 text-sm text-[var(--slot4-muted-text)] hover:text-[var(--slot4-page-text)]">{task.label}<ArrowUpRight className="h-3.5 w-3.5 transition group-hover:text-[var(--slot4-accent-fill)]" /></Link>)}</div></div>
          <div><p className="editorial-kicker">Information</p><div className="mt-5 grid gap-3">{[['About', '/about'], ['Contact', '/contact'], ['Search', '/search'], ['Share something', '/create']].map(([label, href]) => <Link key={href} href={href} className="border-b border-[var(--editable-border)] pb-3 text-sm text-[var(--slot4-muted-text)] hover:text-[var(--slot4-page-text)]">{label}</Link>)}</div></div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-[10px] uppercase tracking-[0.18em] text-[var(--slot4-soft-muted-text)] sm:flex-row sm:items-center sm:justify-between"><p>© {year} {SITE_CONFIG.name}. All rights reserved.</p><p>Observe · Collect · Share</p></div>
      </div>
    </footer>
  )
}
