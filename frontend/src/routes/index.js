import Vue from 'vue';
import Router from 'vue-router';
//import HelloWorld from '../components/HelloWord'
import Login from '../components/Login'
import Dashboard from '../components/Dashboard'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    }
]
});

export default router