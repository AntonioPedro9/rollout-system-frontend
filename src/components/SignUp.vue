<template>
  <div class="cards" oncontextmenu="return false">
    <div class="card">
      <h5>Cadastrar-se</h5>
      <form onpaste="return false" onselectstart="return false;">
        <input name="Email" type="email" placeholder="Email..." autocomplete="off" required/>
        <select required>
          <option name="emailInstitucional" value="algarMail">@algartelecom.com.br</option>
          <option name="outro" value="other">Outro</option>
        </select>
        <input name="Matricula" type="text" placeholder="Matrícula..." autocomplete="off"/>
        <input name="Senha" type="password" placeholder="Senha..." autocomplete="off"/>
        <input name="ConfirmarSenha" type="password" placeholder="Confirmar senha..." autocomplete="off"/><br>
        <input name="LembrarUsuario" type="checkbox" value="LembrarUsuario" id="remindUser">
        <label for="remindUser">Lembrar Usuário</label><br>
        <input class="theme-blue" type="submit" v-on:click="$router.push('/home')"/>
      </form>
      <h6>Já tem uma conta? <a v-on:click="$router.push('/')">Conecte-se</a></h6>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SignUp',
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  select {
    margin: 8px;
  }
  h6 {
    font-size: 14px;
  }
  a {
    color: rgb(33, 150, 243);
    font-weight: 600;
  }
</style>
