export const pageSizes = [10, 20, 30, 40, 50];

export const dashboardRoutes = {
  reports: '/reports',
  movements: '/movements',
  newMovement: '/movements/new',
  users: '/users',
  editUser: '/users/edit',
};

export const routes = {
  ...dashboardRoutes,
  signin: '/api/auth/signin',
  signUp: '/api/auth/signup',
  logout: '/api/auth/logout',
};
