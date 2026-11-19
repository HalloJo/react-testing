import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './api/queryClient'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { DashboardPage } from './features/dashboard/DashboardPage'
import { FeedbackDetailPage } from './features/feedback/FeedbackDetailPage'
import { FeedbackListPage } from './features/feedback/FeedbackListPage'
import { NewFeedbackPage } from './features/feedback/NewFeedbackPage'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<DashboardPage />} />
            <Route path="feedback" element={<FeedbackListPage />} />
            <Route path="feedback/new" element={<NewFeedbackPage />} />
            <Route path="feedback/:id" element={<FeedbackDetailPage />} />
            <Route path="*" element={<DashboardPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
