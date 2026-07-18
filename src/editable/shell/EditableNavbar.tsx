'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile').map((task) => ({ label: task.label, href: task.route })), [])
  const featured = navItems.slice(0, 5)

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)]/95 text-[var(--editable-nav-text)] backdrop-blur-xl">
      <nav className="mx-auto flex h-[86px] w-full max-w-[var(--editable-container)] items-center px-5 sm:px-8 lg:px-12">
        <Link href="/" className="mr-auto flex items-center gap-3">
          <img src="/favicon.png" alt="" className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14" />
          <span className="editable-display text-xl font-medium leading-none tracking-[-0.04em] sm:text-2xl">
            {SITE_CONFIG.name}<span className="text-[var(--slot4-accent-fill)]">.</span>
          </span>
        </Link>

        <div className="hidden h-full items-stretch lg:flex">
          {featured.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return <Link key={item.href} href={item.href} className={`relative flex items-center border-l border-[var(--editable-border)] px-7 text-sm transition hover:bg-white/[0.035] ${active ? 'text-[var(--slot4-accent-fill)]' : 'text-[var(--slot4-muted-text)]'}`}>{item.label}{active ? <span className="absolute inset-x-7 bottom-0 h-[2px] bg-[var(--slot4-accent-fill)]" /> : null}</Link>
          })}
        </div>

        <div className="ml-4 hidden items-center gap-3 border-l border-[var(--editable-border)] pl-6 sm:flex">
          <Link href="/search" aria-label="Search" className="flex h-10 w-10 items-center justify-center border border-[var(--editable-border-strong)] transition hover:border-[var(--slot4-accent-fill)]"><Search className="h-4 w-4" /></Link>
          <Link href="/contact" className="border border-[var(--editable-border-strong)] px-5 py-2.5 text-sm transition hover:bg-[var(--slot4-accent-fill)] hover:text-[#111]">Contact</Link>
          <Link href={session ? '/create' : '/login'} className="bg-[var(--slot4-accent-fill)] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#111]">{session ? 'Create' : 'Sign in'}</Link>
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="ml-4 flex h-11 w-11 items-center justify-center border border-[var(--editable-border-strong)] lg:hidden" aria-label="Toggle navigation">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-5 py-6 lg:hidden">
          <div className="grid">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'Contact', href: '/contact' }, { label: session ? 'Create' : 'Sign in', href: session ? '/create' : '/login' }].map((item, index) => (
              <Link key={`${item.href}-${index}`} href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-[var(--editable-border)] py-4 text-xl"><span>{item.label}</span><ArrowUpRight className="h-4 w-4 text-[var(--slot4-accent-fill)]" /></Link>
            ))}
            {session ? <button type="button" onClick={() => { logout(); setOpen(false) }} className="py-4 text-left text-sm text-[var(--slot4-muted-text)]">Log out</button> : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
