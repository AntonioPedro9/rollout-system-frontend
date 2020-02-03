<template>
  <div class="container">
    <header class="theme-light">
      <router-link to="/home">
        <h5><strong>ROLLOUT</strong>SYSTEM</h5>
      </router-link>
      <button class="theme-red" v-on:click="logout" v-if="isAuthenticated">Logout</button>

    </header>
                  
    <main>
      <router-view></router-view>
    </main>
                  
    <footer class="theme-dark">
      <p>© 2020 - Algar Telecom</p>
    </footer>
  </div>
</template>

<script>
  import Login from './components/Login.vue'
  import SignUp from './components/SignUp.vue'
  import Home from './components/Home.vue'
  import Sites from './components/Sites.vue'
  import Project from './components/Project.vue'
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
    },
    data: function() {
      return {
        isAuthenticated: false
      }
    },
    mounted () {
      var currentPath = window.location.pathname;
      if(localStorage.userData || localStorage.loggedin){
        if(currentPath == '/'){
          window.location.href = "/home";
        }else if(currentPath == '/login' || currentPath == '/signup'){
          window.location.href = "/home";
        }
        this.isAuthenticated = true;
      }else if(currentPath == '/login' || currentPath == "/signup"){
        // console.log("ta aqui");
      }else{
        window.location.href = "/login";
      }
    },
    methods: {
      logout: function () {
        if(localStorage.userData){
          let token = localStorage.userData;
          let userDataDecoded = jwt.decode(token, key);
          axios.post('http://localhost:3000/usuario/logout', {Matricula: userDataDecoded.matriculaToken})    //substituir no back-end por algo como express-session para conseguir a infomação de matricula do usuario
          .then(function(response){
            if(!response.data.loggedin){
              localStorage.clear();
              window.location.href = "/login";
            }
          })
        }else{
          axios.post('http://localhost:3000/usuario/logout', {Matricula: localStorage.username})    //substituir no back-end por algo como express-session para conseguir a infomação de matricula do usuario
          .then(function(response){
            if(!response.data.loggedin){
              localStorage.clear();
              window.location.href = "/login";
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