import Vue from 'vue';
import Router from 'vue-router';
import CreateDelivery from '../components/CreateDelivery'
import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
import Register from '../components/Register'
import RegisterDetails from '../components/RegisterDetails'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/registerDetails',
        name: 'registerDetails',
        component: RegisterDetails
    },
    {
        path: '/createDelivery',
        name: 'createDelivery',
        component: CreateDelivery
    }
]
});

export default router