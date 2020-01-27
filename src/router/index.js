import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import SignUp from '@/components/SignUp.vue'
import Home from '@/components/Home.vue'
import Sites from '@/components/Sites.vue'
import Project from '@/components/Project.vue'

Vue.use(Router)
Vue.config.devtools = false;        //Desativando mensagem de devTools no console do client

export default new Router({
  mode: 'history',
  routes: [
    { path: '/login', name: 'Login', component: Login },
    { path: '/signup', name: 'SignUp', component: SignUp },
    { path: '/home', name: 'Home', component: Home },
    { path: '/sites', name: 'Sites', component: Sites },
    { path: '/sites/project', name: 'Project', component: Project },
  ]
})
