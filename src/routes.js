import { createRouter, createWebHistory } from "vue-router";
import CoachesList from "./pages/coaches/CoachesList.vue";
import CoachDetails from "./pages/coaches/CoachDetails.vue";
import CoachRegistration from "./pages/coaches/CoachRegistration.vue";
import RequestsList from "./pages/requests/RequestsList.vue";
import ContactCoach from "./pages/requests/ContactCoach.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";
import UserAuth from "./pages/auth/UserAuth.vue";
import store from "./store/index.js"

const routes = createRouter({
    history: createWebHistory(),
    routes: [
        { name: 'home', path: '/', redirect: '/coaches' },
        { name: 'coaches', path: '/coaches', component: CoachesList },
        {
            name: 'coach', path: '/coaches/:id', component: CoachDetails, props: true, children: [
                { name: 'contact-coach', path: 'contact', component: ContactCoach }
            ]
        },
        { name: 'register-coach', path: '/register', component: CoachRegistration, meta: { requireAuth: true } },
        { name: 'requests', path: '/requests', component: RequestsList, meta: { requireAuth: true } },
        { name: 'auth', path: '/auth', component: UserAuth, meta: { requireUnauth: true } },
        { name: 'not-found', path: '/:notFound(.*)', component: NotFoundPage }
    ]
})

routes.beforeEach(function (to, _, next) {
    if (to.meta.requireAuth && !store.getters.isAuthenticate) {
        next('/auth')
    } else if (to.meta.requireUnauth && store.getters.isAuthenticate) {
        next('/')
    } else {
        next()
    }
})

export default routes