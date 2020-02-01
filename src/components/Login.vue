<template>
  <div class="cards" oncontextmenu="return false">
    <div class="card">
      <h5>Login</h5>
      <div onpaste="return false" onselectstart="return false;">
        <input name="Matricula" type="text" placeholder="Matrícula..." v-model="mat" v-on:keyup.enter="login()" autocomplete="off" required autofocus/>
        <input id="password" name="Senha" type="password" placeholder="Senha..." v-model="password" v-on:keyup.enter="login()" autocomplete="off" required/>
        <i class="material-icons icon-button" style="font-size: 18px" @click="showPassword()">remove_red_eye</i>
        <input name="LembrarUsuario" type="checkbox" value="LembrarUsuario" id="remindUser" v-model="remindUser">
        <label for="remindUser">Mantenha-me Conectado</label><br>
        <input class="theme-blue" type="submit" @click="login()" value="Conectar"/>
        <transition :name="computedTransition">
          <div class="errorAlert" v-if="!errorHandling">{{ messageError }}</div>
        </transition>
        <h6 v-if="sendToken" @click="resendToken()"><a>Reenviar token</a></h6>
      </div>
      <h6>Não tem uma conta? <a v-on:click="$router.push('/signup')">Cadastre-se</a></h6>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import jwt from 'jwt-simple';
  const key = 'key';
  const rootPath = "http://localhost:3000/";

  export default {
    name: 'Login',
    data: () => {
      return {
        mat: '11821',
        password: 'senhateste',
        errorHandling: true, 
        transitionError: true,
        messageError: '',
        remindUser: false,
        sendToken: false
      }
    },
    mounted() {
      // console.log(localStorage.userData)
      if(localStorage.userData){
        let token = localStorage.userData;
        let userDataDecoded = jwt.decode(token, key);
        // if(Date(userDataDecoded.expire) < Date.now()){
        if (userDataDecoded.expire > Date.now()) {          // Se data do token for maior que a data atual, token ainda e valido
            // this.mat = userDataDecoded.matriculaToken;
            // this.password = userDataDecoded.senhaToken;
            // this.login();
        } else {
          localStorage.clear();
          this.loggedin = false;
          this.messageError = "Login expirado. Conecte novamente.";
          this.errorHandling = false;
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
          axios.post(rootPath + 'usuario/login/', {Matricula: this.mat, Senha: this.password})
          .then(function(response){
            if(response.data.authorizedLogin){
              thisInside.errorHandling = true;
              console.log("loginResponse:" + response.data.authorizedLogin);
              if(thisInside.remindUser){
                // var expireDate = (new Date().getTime()) + (60000 * 60 * 24 * 7);                // Token configurado para expirar em 1 semana
                var expireDate = (new Date().getTime()) + (60000 * 1 / 2 / 2);                  // Token configurado para expirar em 15 segundos
                const loginToken = jwt.encode({
                  matriculaToken: thisInside.mat,
                  senhaToken: thisInside.password,
                  // expire: Date(Date(Date.now()) + (60 * 60 * 1000 * 24 * 7))                // Token configurado para expirar em 1 semana
                  expire: expireDate
                }, key);
                localStorage.userData = loginToken;
              }else{
                localStorage.loggedin = true;
                localStorage.username = thisInside.mat;
              }
              thisInside.$router.push('/home')
              // window.location.href = "/home";
            }else{
              console.log("loginResponse: " + response.data.authorizedLogin);
              if(response.data.loginError != null){
                if(response.data.loginError == "Conta não verificada"){
                  thisInside.sendToken = true;
                }
                thisInside.errorHandling = false;
                thisInside.messageError = response.data.loginError;  
              }else{
                thisInside.errorHandling = false;
                thisInside.messageError = "Usuário ou senha incorretos";
              }
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
      },
      resendToken(){
        console.log(this.mat)
        console.log(this.password)
        axios.post(rootPath + 'usuario/sendTokenAgain', {Matricula: this.mat, Senha: this.password})
        .then(function(response){
          console.log(response);
        })
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
