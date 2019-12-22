<template>
  <div class="cards" oncontextmenu="return false">
    <div class="card">
      <h5>Login</h5>
      <form onpaste="return false">
        <input name="Matricula" type="text" placeholder="Matrícula..." autocomplete="off"/>
        <input name="Senha" type="password" placeholder="Senha..." autocomplete="off"/>

        <input class="theme-blue" type="submit" v-on:click="$router.push('/home')"/>
      </form>
      <h6>Não tem uma conta? <a v-on:click="$router.push('/signUp')">Cadastrar-se</a></h6>
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
