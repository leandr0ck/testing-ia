/**
 * Static tenant data
 * Relationship: tenant → owner user (1:1 via ownerId)
 */

export interface Tenant {
  id: string
  name: string
  slug: string
  plan: 'free' | 'pro' | 'enterprise'
  ownerId: string // 1:1 with User.id
  maxMembers: number
  createdAt: string
}

export const tenants: Tenant[] = [
  {
    id: 'tnt_001',
    name: 'TechCorp',
    slug: 'techcorp',
    plan: 'enterprise',
    ownerId: 'usr_001',
    maxMembers: 500,
    createdAt: '2024-01-15T09:00:00Z',
  },
  {
    id: 'tnt_002',
    name: 'StartupXYZ',
    slug: 'startupxyz',
    plan: 'pro',
    ownerId: 'usr_002',
    maxMembers: 50,
    createdAt: '2024-02-20T14:30:00Z',
  },
  {
    id: 'tnt_003',
    name: 'DesignStudio',
    slug: 'designstudio',
    plan: 'pro',
    ownerId: 'usr_003',
    maxMembers: 25,
    createdAt: '2024-03-05T11:15:00Z',
  },
  {
    id: 'tnt_004',
    name: 'CloudNine',
    slug: 'cloudnine',
    plan: 'free',
    ownerId: 'usr_004',
    maxMembers: 5,
    createdAt: '2024-04-12T08:45:00Z',
  },
  {
    id: 'tnt_005',
    name: 'DataFlow Inc',
    slug: 'dataflow',
    plan: 'enterprise',
    ownerId: 'usr_006',
    maxMembers: 1000,
    createdAt: '2024-06-18T10:20:00Z',
  },
]
