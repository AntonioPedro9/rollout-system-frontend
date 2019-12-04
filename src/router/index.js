import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import SignUp from '@/components/SignUp.vue'
import Home from '@/components/Home.vue'
import Sites from '@/components/Sites.vue'
import Project from '@/components/Project.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Login', component: Login },
    { path: '/SignUp', name: 'SignUp', component: SignUp },
    { path: '/Home', name: 'Home', component: Home },
    { path: '/Sites', name: 'Sites', component: Sites },
    { path: '/Project', name: 'Project', component: Project },
  ]
})
