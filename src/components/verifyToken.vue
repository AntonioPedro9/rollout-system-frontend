<template>
    <div onpaste="return true" onselectstart="return false;">
        <input name="Matricula" type="text" placeholder="Token..." v-model="token" autocomplete="off" required autofocus/>
        <input class="theme-blue" type="submit" @click="check()" value="Verificar"/><br>
        <input class="theme-blue" type="submit" @click="user()" value="Get Users"/>
        <div class="cards">
            <div class="card" v-for="(item, index) in items" :key="index">
                <a>
                    {{ item.Nome }} - {{ item.Matricula }} - {{ item.isVerified }}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data: () => {
            return{
                token: '',
                items: ''
            }
        },
        methods: {
            check(){
                axios.post('http://localhost:3000/usuario/verifyToken', {Token: this.token})
                .then(function(response){
                    if(response.data.contaVerificada){
                        window.location.href = "/login";
                    }else{
                        console.log("ERRO");
                    }
                })
            },
            user(){
                let thisInside = this;
                axios.get('http://localhost:3000/usuario/')
                .then(function(response){
                    console.log(response.data)
                    thisInside.items = response.data
                })
            }
        }
    }
</script>

<style scoped>


</style>