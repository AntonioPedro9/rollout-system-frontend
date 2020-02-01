<template>
  <div class="container">
    <header class="theme-light">
      <router-link to="/home" v-if="isAuthenticated">
        <h5><strong>ROLLOUT</strong>SYSTEM</h5>
      </router-link>
      
      <router-link to="/login" v-else>
        <h5><strong>ROLLOUT</strong>SYSTEM</h5>
      </router-link>

    

      <!-- <a href="/home">
        <h5><strong>ROLLOUT</strong>SYSTEM</h5>
      </a> -->
      <button class="theme-green" v-on:click="$router.push('/verifyToken')">Token Verify</button>
      <button class="theme-red" v-on:click="logout" v-if="isAuthenticated">Logout</button>
    </header>
                  
    <main>
      <router-view></router-view>
    </main>
                  
    <footer class="theme-dark">
      <p>&copy; 2020 - Algar Telecom</p>
    </footer>
  </div>
</template>

<script>
  import Login from './components/Login.vue'
  import SignUp from './components/SignUp.vue'
  import Home from './components/Home.vue'
  import Sites from './components/Sites.vue'
  import Project from './components/Project.vue'
  import VerifyToken from './components/verifyToken.vue'

  import axios from 'axios';
  import jwt from 'jwt-simple';
  const key = 'key';
  let defaultHost = "http://localhost:3000";
  export default {
    name: 'App',
    components: {
      Login,
      SignUp,
      Home,
      Sites,
      Project,
      VerifyToken,
    },

    data: function() {
      return {
        isAuthenticated: false
      }
    },
    beforeUpdate () {
      this.checkLogin();
    },
    mounted(){
      this.checkLogin();
    },
    methods: {
      checkLogin: function (){
        const thisInside = this;
        var currentPath = (window.location.pathname).toLowerCase();
        
        if(localStorage.loggedin){      //usuario fez login sem manter-se conectado
          if(currentPath == '/' || currentPath == '/login' || currentPath == '/signup'){
            // window.location.href = '/home';
            thisInside.$router.push('/home')
          }else{

          }
          this.isAuthenticated = true;
        }
        // else if(currentPath == '/login' || currentPath == '/signup'){
          
        // }else{
        //   window.location.href = '/login';
        // }

        if(localStorage.userData){
          let token = localStorage.userData
          let userDataDecoded = jwt.decode(token, key);
          let dataToken = userDataDecoded.expire;
          // if(dataToken < Date.now()){
          //   console.log(true);
          // }else{
          //   console.log(false);
          //   console.log(new Date(dataToken))
          //   console.log(new Date(Date.now()))
          // }
          // this.isAuthenticated = true;
          if(dataToken < Date.now()){
            this.isAuthenticated = false;
            if(currentPath == '/login' || currentPath == '/signup'){
              
            }else{
              this.logout();
            }
          }else if(currentPath == '/login' || currentPath == '/signup' || currentPath == '/'){
            // window.location.href = '/home';
            thisInside.$router.push('/home');
          }else if(currentPath == '/home'){
            
          }
          this.isAuthenticated = true;
        }
        if(localStorage.loggedin == null && localStorage.userData == null){
          if(currentPath != '/login' && currentPath != '/signup' && currentPath != '/verifytoken'){
            // window.location.href = '/login';
            thisInside.$router.push('/login')
          }
        }
      },
      logout: function () {
        const thisInside = this;
        if(localStorage.userData){
          let token = localStorage.userData;
          let userDataDecoded = jwt.decode(token, key);
          axios.post('http://localhost:3000/usuario/logout', {Matricula: userDataDecoded.matriculaToken})
          .then(function(response){
            if(!response.data.loggedin){
              localStorage.clear();
              thisInside.$router.push('/login')
              window.location.reload()
              // window.location.href = "/login";
            }
          })
        }else{
          axios.post('http://localhost:3000/usuario/logout', {Matricula: localStorage.username})
          .then(function(response){
            if(!response.data.loggedin){
              localStorage.clear();
              thisInside.$router.push('/login')
              window.location.reload()
              // window.location.href = "/login";
            }
          })
        }
      }
    }
  }
</script>

<style>
  /* Importing Aperial Design css library */
  @import '/aperial.css';
  .container {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
  }
  main {
    flex-grow: 1;
  }
  main .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  main .cards .card {
    flex: 0 0 240px;
  }
  header, main, footer {
    flex-shrink: 0;
    justify-content: space-between;
  }
  /* this will be used to blur the background of some components */
  .blur-div {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.64);
    backdrop-filter: blur(2px);
  }
  /* this will be used in other components as a creation window */
  .creation-window {
    position: fixed;
    top: 30vh;
    left: calc(50vw - 120px);
    z-index: 1;
  }
</style>