/**
 * Static user data
 */

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'member' | 'viewer'
  tenantId: string | null
  createdAt: string
}

export interface Profile {
  id: string
  userId: string
  bio: string
  avatar: string
  location: string
}

export const users: User[] = [
  {
    id: 'usr_001',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'admin',
    tenantId: 'tnt_001',
    createdAt: '2024-01-15T09:00:00Z',
  },
  {
    id: 'usr_002',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'member',
    tenantId: 'tnt_002',
    createdAt: '2024-02-20T14:30:00Z',
  },
  {
    id: 'usr_003',
    name: 'Carol Davis',
    email: 'carol@example.com',
    role: 'admin',
    tenantId: 'tnt_003',
    createdAt: '2024-03-05T11:15:00Z',
  },
  {
    id: 'usr_004',
    name: 'David Lee',
    email: 'david@example.com',
    role: 'member',
    tenantId: 'tnt_004',
    createdAt: '2024-04-12T08:45:00Z',
  },
  {
    id: 'usr_005',
    name: 'Eva Martinez',
    email: 'eva@example.com',
    role: 'viewer',
    tenantId: 'tnt_001',
    createdAt: '2024-05-01T16:00:00Z',
  },
  {
    id: 'usr_006',
    name: 'Frank Wilson',
    email: 'frank@example.com',
    role: 'member',
    tenantId: 'tnt_005',
    createdAt: '2024-06-18T10:20:00Z',
  },
]

export const profiles: Profile[] = [
  {
    id: 'prf_001',
    userId: 'usr_001',
    bio: 'CTO at TechCorp. Passionate about scalable systems.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
    location: 'San Francisco, CA',
  },
  {
    id: 'prf_002',
    userId: 'usr_002',
    bio: 'Full-stack developer and open-source contributor.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
    location: 'Austin, TX',
  },
  {
    id: 'prf_002b',
    userId: 'usr_002',
    bio: 'Full-stack developer and open-source contributor.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob-alt',
    location: 'Austin, TX',
  },
  {
    id: 'prf_003',
    userId: 'usr_003',
    bio: 'Product lead focused on user-centric design.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carol',
    location: 'New York, NY',
  },
  {
    id: 'prf_004',
    userId: 'usr_004',
    bio: 'DevOps engineer automating everything.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
    location: 'Seattle, WA',
  },
  {
    id: 'prf_006',
    userId: 'usr_006',
    bio: 'Backend engineer with a love for distributed systems.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=frank',
    location: 'Denver, CO',
  },
]
