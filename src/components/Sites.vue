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
          <th></th>
        </tr>
        <tr class="site" v-for="(site, index) in filteredSites" :key="site.station">
          <td v-on:click="$router.push('/sites/project')">{{ site.estacao }}</td>
          <td v-on:click="$router.push('/sites/project')">{{ site.escopo }}</td>
          <td v-on:click="$router.push('/sites/project')">{{ site.localidade }}</td>
          <td v-on:click="$router.push('/sites/project')">
            <div class="bar">
              <div class="bar-fill"></div>
            </div>
          </td>
          <td><i class="material-icons icon-button" style="font-size: 18px" v-on:click="deleteSite(index)">delete</i></td>
        </tr>
      </table>
    </div>
    <div id="blur-div" v-show="showCreateSiteWindow">
      <div class="card create-site">
        <h5>Novo site</h5>
        <input type="text" placeholder="Estação..." v-model="estacao"><br>
        <input type="text" placeholder="Escopo..." v-model="escopo"><br>
        <input type="text" placeholder="Localidade..." v-model="localidade"><br>
        <button class="theme-blue" v-on:click="createSite()">Criar</button>
        <button class="theme-red" v-on:click="showCreateSiteWindow = false">Cancelar</button>
      </div>
    </div>
    <button class="fab theme-blue" v-on:click="showCreateSiteWindow = true">
      <i class="material-icons">add</i>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'Sites',
    data: () => {
      return {
        search: '',
        showCreateSiteWindow: false,
        estacao: '',
        escopo: '',
        localidade: '',

        sites: [
          { estacao: 'estação 1', escopo: 'escopo 1', localidade: 'lugar 1' },
          { estacao: 'estação 2', escopo: 'escopo 2', localidade: 'lugar 2' },
          { estacao: 'estação 3', escopo: 'escopo 3', localidade: 'lugar 3' },
        ],
      }
    },
    computed: {
      filteredSites() {
        return this.sites.filter( (site) => {
          return site.estacao.match(this.search) || site.escopo.match(this.search) || site.localidade.match(this.search);
        });
      }
    },
    methods: {
      createSite() {
        if (this.estacao.replace(/\s/g, "") !== "" && this.escopo.replace(/\s/g, "") !== "" && this.localidade.replace(/\s/g, "") !== "") {
          this.sites.push({
            estacao: this.estacao,
            escopo: this.escopo,
            localidade: this.localidade,
          });
          this.showCreateSiteWindow = false
          this.estacao = ''
          this.escopo = ''
          this.localidade = ''
        }
        else {
          alert("Informações inválidas")
        }
      },
      deleteSite(index) {
        if (confirm("Deseja excluir esse site?")) {
          this.sites.splice(index, 1);
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cards .card {
    flex: 0 0 auto;
  }
  .card .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .card .card-header, .search-box {
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
  #blur-div {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.64);
    backdrop-filter: blur(2px);
  }
  .create-site {
    position: fixed;
    top: 30vh;
    left: calc(50vw - 120px);
    z-index: 1;
  }
  .fab {
    position: fixed;
    bottom: 15px;
    right: 4%;
  }
</style>
