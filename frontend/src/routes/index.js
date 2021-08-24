import Vue from 'vue';
import Router from 'vue-router';
import BookDelivery from '../components/BookDelivery'
import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
import Register from '../components/Register'
import RegisterDetails from '../components/RegisterDetails'
import Map from '../components/Map'

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
        path: '/bookDelivery',
        name: 'bookDelivery',
        component: BookDelivery
    },
    {
        path: '/map',
        name: 'map',
        component: Map
    }
]
});

export default router