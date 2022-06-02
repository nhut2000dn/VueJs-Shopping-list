import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import { store } from './store/store'
import { routes } from './routes'
import { auth } from './firebase'
import VueSweetalert2 from 'vue-sweetalert2';
// import VueFire from 'vuefire'

Vue.config.productionTip = false

Vue.use(VueRouter);

Vue.use(VueSweetalert2);

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});


let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/auth')
  } else {
    next()
  }
})

// categories: [
//   {
//     id: 1,
//     name: "hello"
//   },
//   {
//     id: 2,
//     name: "hello 2"
//   },
//   {
//     id: 3,
//     name: "hello 3"
//   },
// ],
// listCurrent: [
//    {
//     id: 0,
//     idCategorie: 1,
//     name: "Go to school 1",
//     description: "hello 1",
//     image: "/src/assets/logo.png",
//     check: true,
//     show: true,
//   },
//   {
//     id: 1,
//     idCategorie: 1,
//     name: "Go to school 2",
//     description: "hello 2",
//     image: "",
//     check: false,
//     show: false,
//   },
//   {
//     id: 2,
//     idCategorie: 2,
//     name: "Go to hEKO 1",
//     description: "hEKO 1",
//     image: "",
//     check: true,
//     show: true,
//   },
//   {
//     id: 3,
//     idCategorie: 2,
//     name: "Go to hEKO 2",
//     description: "hEKO 2",
//     image: "",
//     check: false,
//     show: false,
//   },
// ],