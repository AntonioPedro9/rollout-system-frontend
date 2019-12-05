<template>
  <div class="cards">
    <div id="blur-div" v-show="showCreateProjectWindow"></div>
    <div class="card" v-for="projeto in projetos" :key="projeto.id">
      <h5>{{ projeto.nome }}</h5>
      <p>{{ projeto.estacoes }} estações</p>
      <p>{{ projeto.concluidas }} concluidas</p>
      <button class="theme-blue" @click="$router.push('/Sites')">Abrir</button>
    </div>
    <div class="card create-project" v-show="showCreateProjectWindow">
      <h5>Novo projeto</h5>
      <input type="text" placeholder="Nome do projeto..." v-model="nome"><br>
      <button class="theme-blue" v-on:click="createProject()">Criar</button>
    </div>
    <button class="fab theme-blue" v-on:click="showCreateProjectWindow = true">
      <i class="material-icons">add</i>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data: () => {
      return {
        showCreateProjectWindow: false,
        nome: '',
        
        projetos: [
          { id: 0, nome: '2,5GHz TDD', estacoes: 0, concluidas: 0 },
          { id: 1, nome: 'EILD Satélite', estacoes: 27, concluidas: 0 },
          { id: 2, nome: 'Minas 2018', estacoes: 6, concluidas: 0 },
        ]
      }
    },
    methods: {
      createProject() {
        this.projetos.push({
          id: this.projetos.length + 1,
          nome: this.nome,
          estacoes: 0,
          concluidas: 0,
        });
        this.showCreateProjectWindow = false
        this.nome = ''
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #blur-div {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.64);
    backdrop-filter: blur(2px);
  }
  .create-project {
    position: absolute;
    top: 30vh;
    margin: auto;
    z-index: 1;
  }
  .fab {
    position: fixed;
    bottom: 15px;
    right: 4%;
  }
</style>
