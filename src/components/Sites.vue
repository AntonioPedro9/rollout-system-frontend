<template>
  <div class="cards">
    <div class="card">
      <div class="card-header">
        <h5>Projeto</h5>
        <div class="search-box">
          <i class="material-icons">search</i>
          <input type="text" v-model="search" placeholder="Buscar..."/>
        </div>
      </div>
      <table>
        
        <tr>
          <th>Estação</th>
          <th>Escopo</th>
          <th>Localidade</th>
          <th>Progresso</th>
        </tr>

        <tr class="site" v-for="site in filteredSites" :key="site.station" @click="$router.push('/Project')">
          <td>{{ site.estacao }}</td>
          <td>{{ site.escopo }}</td>
          <td>{{ site.localidade }}</td>
          <td>
            <div class="bar">
              <div class="bar-fill"></div>
            </div>
          </td>
        </tr>

      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Sites',
    data: () => {
      return {
        sites: [
          { estacao: 'estação 1', escopo: 'escopo 1', localidade: 'lugar 1' },
          { estacao: 'estação 2', escopo: 'escopo 2', localidade: 'lugar 2' },
          { estacao: 'estação 3', escopo: 'escopo 3', localidade: 'lugar 3' },
        ],
        search: '',
      }
    },
    computed: {
      filteredSites: function() {
        return this.sites.filter( (site) => {
          return site.estacao.match(this.search) || site.escopo.match(this.search) || site.localidade.match(this.search);
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  main .cards .card {
    display: block;
    flex: 0 0 auto;
  }
  .card .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .card .card-header .search-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .site {
    cursor: pointer;
  }
  .site:hover {
    background-color: #F1F1F1;
  }
  .bar {
    width: 100px;
    height: 4px;

    background-color: rgba(33, 150, 243, 0.4);
    border-radius: 2px;
  }
  .bar-fill {
    width: 64px;
    height: 4px;

    background-color: rgba(33, 150, 243, 1.0);
    border-radius: 2px;
  }
</style>
