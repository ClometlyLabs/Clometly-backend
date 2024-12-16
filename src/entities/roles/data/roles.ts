export const roles = [
  {
    name: 'ADMIN',
    context: 'enterprise',
    description: 'Enterprise admin',
  },
  {
    name: 'COMMUNITY_MANAGER',
    context: 'enterprise',
    description: 'Enterprise content manager',
  },
  {
    name: 'EMPLOYER',
    context: 'enterprise',
    description: 'Enterprise guest',
  },
  { name: 'EMPLOYEE', context: 'enterprise', description: 'Enterprise guest' },

  { name: 'ADMIN', context: 'platform', description: 'Platform admin' },
  { name: 'USER', context: 'platform', description: 'Platform user' },
  { name: 'MOD', context: 'platform', description: 'Platform mod' },

  { name: 'ADMIN', context: 'forum', description: 'Forum admin' },
  { name: 'MOD', context: 'forum', description: 'Forum mod' },
  { name: 'MEMBER', context: 'forum', description: 'Forum MEMBER' },
];
