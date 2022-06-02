import Error from './components/404'
import Home from './components/Home'
import AuthPage from './components/Auth'

export const routes = [
  { 
    path: '/home/:id', 
    name: 'home', 
    component: Home,
    meta: {
      requiresAuth: true
    } 
  },
  { 
    path: '/home/:id/:idUserShare', 
    name: 'home', 
    component: Home,
  },
  { 
    path: '/auth', 
    name: 'auth', 
    component: AuthPage 
  },
  { path: '/404', name: 'errorpage', component: Error },
  { path: '*', redirect: '/404' }
]
