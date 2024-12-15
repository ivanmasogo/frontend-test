import Vue from 'vue';
import VueRouter from 'vue-router';
import ProductsList from '../views/ProductsList.vue';
import { tokenStorageName } from '../helpers/constants';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: ProductsList,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
    meta: { requiresAuth: false },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// ELIMINAR
// Route guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem(tokenStorageName);

  // Si la ruta requiere autenticación
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else if (to.matched.some((record) => !record.meta.requiresAuth)) {
    // Si la ruta NO requiere autenticación (login en este caso)
    if (token) {
      // Si el token existe, redirige al home (usuario ya está logueado)
      next({ name: 'home' });
    } else {
      // Si no hay token, deja que acceda al login
      next();
    }
  } else {
    // En cualquier otro caso, sigue la navegación
    next();
  }
});

export default router;
