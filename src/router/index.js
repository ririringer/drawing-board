import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App
  },
  // その他のルートをここに追加
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
