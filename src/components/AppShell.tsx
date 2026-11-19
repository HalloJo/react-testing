import {
  BarChart3,
  ChevronDown,
  CircleHelp,
  LayoutDashboard,
  MessageSquareText,
  Moon,
  Plus,
  Search,
  Sun,
} from 'lucide-react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from './Button'

const navigation = [
  { label: 'Overview', to: '/', icon: LayoutDashboard },
  { label: 'Feedback', to: '/feedback', icon: MessageSquareText },
]

function getInitialTheme() {
  return localStorage.getItem('theme') === 'dark'
}

export function AppShell() {
  const [isDark, setIsDark] = useState(getInitialTheme)
  const location = useLocation()
  const navigate = useNavigate()
  const isNewFeedback = location.pathname === '/feedback/new'

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const pageTitle =
    location.pathname === '/'
      ? 'Overview'
      : location.pathname === '/feedback/new'
        ? 'Add feedback'
        : location.pathname.startsWith('/feedback/')
          ? 'Feedback details'
          : 'Feedback inbox'

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 lg:flex">
        <div className="flex h-[76px] items-center gap-3 border-b border-slate-100 px-6 dark:border-slate-800">
          <div className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-300/50">
            <BarChart3 aria-hidden="true" className="size-5" />
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
              feedback
              <span className="text-indigo-600 dark:text-indigo-400">
                pulse
              </span>
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
              Product intelligence
            </p>
          </div>
        </div>

        <div className="px-4 pt-7">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
            Workspace
          </p>
          <nav aria-label="Main navigation" className="space-y-1">
            {navigation.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-300' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'}`
                }
              >
                <Icon aria-hidden="true" className="size-[18px]" />
                {label}
                {label === 'Feedback' && (
                  <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    Inbox
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
            <div className="mb-2 flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <CircleHelp aria-hidden="true" className="size-4" />
              <span className="text-xs font-semibold">Need a hand?</span>
            </div>
            <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
              Your customer voice, organized in one place.
            </p>
            <a
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
              href="mailto:hello@feedbackpulse.example"
            >
              Talk to our team{' '}
              <ChevronDown aria-hidden="true" className="size-3 -rotate-90" />
            </a>
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-xl px-2 py-2">
            <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-xs font-bold text-white">
              JM
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-slate-800 dark:text-slate-100">
                Jorik van Ruiswijk
              </p>
              <p className="truncate text-[11px] text-slate-400">
                Product team
              </p>
            </div>
            <ChevronDown aria-hidden="true" className="size-4 text-slate-400" />
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-200/80 bg-white/90 px-5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90 sm:px-8">
          <div>
            <p className="text-xs text-slate-400">Workspace / Product team</p>
            <h1 className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-slate-100">
              {pageTitle}
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label={
                isDark ? 'Switch to light mode' : 'Switch to dark mode'
              }
              onClick={() => setIsDark((value) => !value)}
              className="flex size-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              {isDark ? (
                <Sun aria-hidden="true" className="size-[18px]" />
              ) : (
                <Moon aria-hidden="true" className="size-[18px]" />
              )}
            </button>
            <Button
              onClick={() => navigate('/feedback/new')}
              icon={<Plus aria-hidden="true" className="size-4" />}
              size="sm"
              className="hidden sm:inline-flex"
            >
              Add feedback
            </Button>
            <Button
              onClick={() => navigate('/feedback/new')}
              aria-label="Add feedback"
              icon={<Plus aria-hidden="true" className="size-4" />}
              size="sm"
              className="sm:hidden"
            />
          </div>
        </header>

        <main className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 sm:py-9">
          <nav
            aria-label="Mobile navigation"
            className="mb-6 flex gap-2 lg:hidden"
          >
            {navigation.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-xs font-semibold ${isActive ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-300' : 'bg-white text-slate-500 dark:bg-slate-900 dark:text-slate-400'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <Outlet />
        </main>
        <footer className="mx-auto flex max-w-[1440px] items-center justify-between px-5 pb-8 text-[11px] text-slate-400 sm:px-8">
          <span>Feedback Pulse · Built for better product decisions</span>
          {isNewFeedback && (
            <span className="hidden items-center gap-1 sm:flex">
              <Search aria-hidden="true" className="size-3" />
              Your feedback stays in your workspace
            </span>
          )}
        </footer>
      </div>
    </div>
  )
}
