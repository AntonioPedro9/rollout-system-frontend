<template>
  <div class="container">
    <header class="theme-light">
      <router-link to="/Home">
        <h5><strong>ROLLOUT</strong>SYSTEM</h5>
      </router-link>
    </header>
                  
    <main>
      <router-view></router-view>
    </main>
                  
    <footer class="theme-dark">
      <p>© 2019 - Algar Telecom</p>
    </footer>
  </div>
</template>

<script>
  import Login from './components/Login.vue'
  import SignUp from './components/SignUp.vue'
  import Home from './components/Home.vue'
  import Sites from './components/Sites.vue'
  import Project from './components/Project.vue'

  export default {
    name: 'App',
    components: {
      Login,
      SignUp,
      Home,
      Sites,
      Project,
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
  }
</style>
