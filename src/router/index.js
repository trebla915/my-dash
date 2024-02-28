import { createRouter, createWebHistory } from 'vue-router';

// Removed unused imports: store, SignIn, and SignUp

const routes = [
  {
    path: '/',
    name: 'Home',
    // Fixed by using dynamic import for DashboardView
    component: () => import('../views/DashboardView.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue'),
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: () => import('../views/sessions/SignIn.vue'),
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: () => import('../views/sessions/SignUp.vue'),
  },
  // Add other routes as needed
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router; // Make sure to export router
