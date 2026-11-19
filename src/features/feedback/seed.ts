import type { Feedback } from './types'

const daysAgo = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  date.setHours(12, 0, 0, 0)
  return date.toISOString()
}

export const seedFeedback: Feedback[] = [
  {
    id: 'fb-1001',
    title: 'Export crashes on larger reports',
    description:
      'The application crashes when exporting reports with more than 500 rows. I have to refresh the page and start again, so I lose all my filters.',
    sentiment: 'negative',
    priority: 'high',
    tags: ['bug', 'reporting', 'reliability'],
    createdDate: daysAgo(0),
  },
  {
    id: 'fb-1002',
    title: 'Dark mode looks amazing',
    description:
      'The new dark mode is easy on the eyes and feels really polished. I have been waiting for this since we moved our whole team over.',
    sentiment: 'positive',
    priority: 'low',
    tags: ['design', 'dark mode', 'delight'],
    createdDate: daysAgo(1),
  },
  {
    id: 'fb-1003',
    title: 'Search slows down with large datasets',
    description:
      'Search is too slow for large datasets. It can take 8–10 seconds before I see any results when there are a few thousand records.',
    sentiment: 'negative',
    priority: 'high',
    tags: ['performance', 'search', 'data'],
    createdDate: daysAgo(2),
  },
  {
    id: 'fb-1004',
    title: 'Would love saved report views',
    description:
      'I run the same report every Monday with the same filters. Being able to save a view and share it with my team would be a huge time saver.',
    sentiment: 'neutral',
    priority: 'medium',
    tags: ['feature request', 'reporting', 'collaboration'],
    createdDate: daysAgo(3),
  },
  {
    id: 'fb-1005',
    title: 'Onboarding made our first week easy',
    description:
      'The guided setup got our whole team up and running in one afternoon. The examples were actually relevant to how we work.',
    sentiment: 'positive',
    priority: 'low',
    tags: ['onboarding', 'ease of use', 'team'],
    createdDate: daysAgo(4),
  },
  {
    id: 'fb-1006',
    title: 'Notifications arrive hours late',
    description:
      'A few important alerts did not come through until the next morning. This has happened three times this month and we rely on these for handoffs.',
    sentiment: 'negative',
    priority: 'high',
    tags: ['bug', 'notifications', 'reliability'],
    createdDate: daysAgo(5),
  },
  {
    id: 'fb-1007',
    title: 'Could use keyboard shortcuts',
    description:
      'I spend most of my day triaging feedback. Keyboard shortcuts for moving between items would make the workflow feel much faster.',
    sentiment: 'neutral',
    priority: 'medium',
    tags: ['feature request', 'productivity', 'accessibility'],
    createdDate: daysAgo(6),
  },
  {
    id: 'fb-1008',
    title: 'Mobile dashboard is a big improvement',
    description:
      'The dashboard is finally readable on my phone. I can check our weekly numbers between meetings without opening my laptop.',
    sentiment: 'positive',
    priority: 'low',
    tags: ['mobile', 'design', 'analytics'],
    createdDate: daysAgo(7),
  },
  {
    id: 'fb-1009',
    title: 'Team invite link has expired',
    description:
      'The invite link expired before my colleague could join. I had to remove them and send a new one, and the message was not very clear.',
    sentiment: 'negative',
    priority: 'medium',
    tags: ['bug', 'team management', 'onboarding'],
    createdDate: daysAgo(8),
  },
  {
    id: 'fb-1010',
    title: 'Weekly digest has the right detail',
    description:
      'The weekly email strikes a nice balance: enough context to spot trends but short enough that I actually read the whole thing.',
    sentiment: 'positive',
    priority: 'low',
    tags: ['email', 'analytics', 'delight'],
    createdDate: daysAgo(9),
  },
  {
    id: 'fb-1011',
    title: 'CSV headers do not match selected fields',
    description:
      'When I export only a few columns, the CSV headers still include hidden fields. It makes the file difficult to use in our finance workflow.',
    sentiment: 'negative',
    priority: 'medium',
    tags: ['bug', 'export', 'reporting'],
    createdDate: daysAgo(10),
  },
  {
    id: 'fb-1012',
    title: 'API documentation is clear and practical',
    description:
      'The examples in the API docs worked on the first try. It was straightforward to connect our internal dashboard.',
    sentiment: 'positive',
    priority: 'low',
    tags: ['documentation', 'developer experience', 'integrations'],
    createdDate: daysAgo(12),
  },
]
