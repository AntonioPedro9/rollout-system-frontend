<template>
  <div class="cards">
    <div class="card">
      <h5>Login</h5>
      <form>
        <input type="email" placeholder="Email..."/>
        <input type="password" placeholder="Senha..."/>
        <input class="theme-blue" type="submit" @click="$router.push('/Home')"/>
      </form>
      <h6>Não tem uma conta? <a @click="$router.push('/SignUp')">Cadastrar-se</a></h6>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h6 {
    font-size: 14px;
  }
  a {
    color: rgb(33, 150, 243);
    font-weight: 600;
  }
</style>
