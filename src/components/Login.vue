<template>
  <div class="cards" oncontextmenu="return false">
    <div class="card">
      <h5>Login</h5>
      <div onpaste="return false" onselectstart="return false;">
        <input name="Matricula" type="text" placeholder="Matrícula..." v-model="mat" autocomplete="off" required autofocus/>
        <input id="password" name="Senha" type="password" placeholder="Senha..." v-model="password" autocomplete="off" required/>
        <i class="material-icons icon-button" style="font-size: 18px" @click="showPassword()">remove_red_eye</i>
        <input name="LembrarUsuario" type="checkbox" value="LembrarUsuario" id="remindUser" v-model="remindUser">
        <label for="remindUser">Lembrar Usuário</label><br>
        <input class="theme-blue" type="submit" @click="login()" value="Conectar"/>
        <transition :name="computedTransition">
          <div class="errorAlert" v-if="!errorHandling">{{ messageError }}</div>
        </transition>
      </div>
      <h6>Não tem uma conta? <a v-on:click="$router.push('/signup')">Cadastre-se</a></h6>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import jwt from 'jwt-simple';
  const key = 'key';
  export default {
    name: 'Login',
    data: () => {
      return {
        mat: '',
        password: '',
        errorHandling: true, 
        transitionError: true,
        messageError: '',
        remindUser: false
      }
    },
    mounted() {
      // console.log(localStorage.userData)
      if(localStorage.userData){
        let token = localStorage.userData;
        let userDataDecoded = jwt.decode(token, key);
        if (new Date(userDataDecoded.expire) > new Date()) {          // Se data do token for maior que a data atual, token ainda e valido
            this.mat = userDataDecoded.matriculaToken;
            this.password = userDataDecoded.senhaToken;
            this.login();
        } else {
          this.messageError = "Login expirado. Conecte novamente.";
          thisInside.errorHandling = false;
        }
      }
    },
    computed: {
      computedTransition () {
        return this.transitionError && 'fade'
      }
    },
    methods: {
      login() {
        let thisInside = this;          // Usar "this" logo apos a declaracao da funcao
        if(!this.mat){
          this.messageError = "O campo Matrícula precisa ser preenchido";
          thisInside.errorHandling = false;
        }else if(!this.password){
          this.messageError = "O campo Senha precisa ser preenchido";
          thisInside.errorHandling = false;
        }else{
          axios.post('http://localhost:3000/usuario/login/', {Matricula: this.mat, Senha: this.password})
          .then(function(response){
            if(response.data.authorizedLogin){
              thisInside.errorHandling = true;
              console.log("loginResponse:" + response.data.authorizedLogin);
              if(thisInside.remindUser){
                const loginToken = jwt.encode({
                  matriculaToken: thisInside.mat,
                  senhaToken: thisInside.password,
                  expire: Date.now() + (60 * 60 * 1000 * 24 * 7)                // Token configurado para expirar em 1 semana
                }, key);
                localStorage.userData = loginToken;
              }else{
                localStorage.loggedin = true;
                localStorage.username = thisInside.mat;
              }
              window.location.href = "/home";
            }else{
              console.log("loginResponse: " + response.data.authorizedLogin);
              thisInside.errorHandling = false;
              thisInside.messageError = "Usuário ou senha incorretos"
            }
          })
        }
      },
      showPassword(){
        var val = document.getElementById("password");
        if(val.type === "password"){
          val.type = "text";
          return false;
        }else{
          val.type = "password";
          return true;
        }
      }
    }
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
  .fade-enter-active, .fade-leave-active {
    transition: .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .errorAlert {
    background-color: #f99;
    padding: 10px;
    border-radius: 4px;
  }
</style>
