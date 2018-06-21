/**
 * Main Application Config
 */
export const APP_CONFIG = {
  url: {
    users: '/assets/api/users.json',
    examples: '/assets/api/examples.json',
  },
  db: {
    name: 'FINAL',
    version: 1,
    tables: {
      examples: 'examples',
      users: 'users',
    }
  },
  localStorage: {
    token: 'FINAL.token'
  },
};
