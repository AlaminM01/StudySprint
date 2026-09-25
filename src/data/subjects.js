export const SUBJECTS = [
  {
    id: 'cs',
    name: 'Computer Science',
    shortCode: 'CS',
    color: '#6366F1', // indigo
    bgLight: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    dotColor: 'bg-indigo-500',
    icon: 'Laptop',
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    shortCode: 'DSA',
    color: '#06B6D4', // cyan
    bgLight: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
    dotColor: 'bg-cyan-500',
    icon: 'Binary',
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence & ML',
    shortCode: 'AI/ML',
    color: '#A855F7', // purple
    bgLight: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    dotColor: 'bg-purple-500',
    icon: 'Brain',
  },
  {
    id: 'math',
    name: 'Discrete Math & Stats',
    shortCode: 'MATH',
    color: '#F59E0B', // amber
    bgLight: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    dotColor: 'bg-amber-500',
    icon: 'Sigma',
  },
  {
    id: 'web',
    name: 'Full-Stack Web Dev',
    shortCode: 'WEB',
    color: '#10B981', // emerald
    bgLight: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    dotColor: 'bg-emerald-500',
    icon: 'Globe',
  },
  {
    id: 'os',
    name: 'Operating Systems & Networks',
    shortCode: 'OS/NET',
    color: '#EC4899', // pink
    bgLight: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
    dotColor: 'bg-pink-500',
    icon: 'Cpu',
  },
];

export const PRIORITIES = [
  { id: 'low', label: 'Low', color: 'text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 border-slate-300 dark:border-slate-700', rank: 1 },
  { id: 'medium', label: 'Medium', color: 'text-blue-500 bg-blue-500/10 border-blue-500/30', rank: 2 },
  { id: 'high', label: 'High', color: 'text-amber-500 bg-amber-500/10 border-amber-500/30', rank: 3 },
  { id: 'urgent', label: 'Urgent', color: 'text-rose-500 bg-rose-500/10 border-rose-500/30', rank: 4 },
];
