import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      alias: '/home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/card_searcher',
      name: 'searcher',
      component: () => import('@/views/CardSearcherView.vue'),
    },
    {
      path: '/deck_builder',
      name: 'builder',
      component: () => import('@/views/DeckBuilderView.vue'),
    },
    {
      path: '/card/:id',
      name: 'card',
      component: () => import('@/views/CardView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not_found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
});

export default router;
