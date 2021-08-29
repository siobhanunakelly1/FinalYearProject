import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
import Register from '../components/Register'
import RegisterDetails from '../components/RegisterDetails'
import Map from '../components/Map'
import firebase from 'firebase';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login,
            meta: {
                title: 'Login'
              }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                title: 'Sign Up'
              }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta:{
                title: 'Login'
              }
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
                auth: true,
                title: 'Dashboard'
              }
        },
        {
            path: '/registerDetails',
            name: 'registerDetails',
            component: RegisterDetails,
            meta: {
                auth: true,
                title: 'Your Details'
              }
        },
        {
            path: '/map',
            name: 'map',
            component: Map,
            meta: {
                auth: true,
                title: 'Map'
              }
        }
    ]
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.auth);
    const isAuthenticated = firebase.auth().currentUser;
    if (requiresAuth && !isAuthenticated) {
      next("/login");
    } else {
      next();
    }
  });

export default router