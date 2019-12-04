<template>
  <div class="cards">
    <div class="card" v-for="projeto in projetos" :key="projeto.id">
      <h5>{{ projeto.nome }}</h5>
      <p>{{ projeto.estacoes }} estações</p>
      <p>{{ projeto.concluidas }} concluidas</p>
      <button class="theme-blue" @click="$router.push('/Sites')">Abrir</button>
    </div>
    <button class="fab theme-blue">
      <i class="material-icons">add</i>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'Home',
      data: () => {
        return {
        projetos: [
          { id: 0, nome: '2,5GHz TDD', estacoes: 0, concluidas: 0 },
          { id: 1, nome: 'EILD Satélite', estacoes: 27, concluidas: 0 },
          { id: 2, nome: 'Minas 2018', estacoes: 6, concluidas: 0 },
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .fab {
    position: fixed;
    bottom: 15px;
    right: 4%;
  }
</style>
