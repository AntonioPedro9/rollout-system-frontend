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
          <th>Cidade</th>
          <th>Progresso</th>
          <th></th>
        </tr>
        <tr class="site" v-for="(site, index) in sites" :key="index">
          <td v-on:click="$router.push('/sites/atividade')">{{ site.Nome }}</td>
          <td v-on:click="$router.push('/sites/atividade')">{{ site.Escopo }}</td>
          <td v-on:click="$router.push('/sites/atividade')">{{ site.cidadeId }}</td>
          <td v-on:click="$router.push('/sites/atividade')">
            <div class="bar">
              <div class="bar-fill"></div>
            </div>
          </td>
          <td><i class="material-icons icon-button" style="font-size: 18px" v-on:click="deleteSite(site.id)">delete</i></td>
          <td><i class="material-icons icon-button" style="font-size: 18px" v-on:click="showRenameSiteWindow = true, getStatus()">edit</i></td>
        </tr>
      </table>
    </div>
    <button class="fab theme-blue" v-on:click="showCreateSiteWindow = true">
      <i class="material-icons">add</i>
    </button>
    <!-- Create site window: -->
    <div class="blur-div" v-if="showCreateSiteWindow">
      <div class="card creation-window">
        <h5>Novo site</h5>
        <input type="text" placeholder="Estação..." v-model="nomeEstacao" autofocus><br>
        <input type="text" placeholder="Escopo..." v-model="escopo"><br>
        <input type="text" placeholder="Cidade..." v-model="cidade"><br>
        <input type="text" placeholder="Projeto ID..." v-model="projetoId"><br>
        <input type="text" placeholder="Status ID..." v-model="statusId"><br>
        <button class="theme-blue" v-on:click="createSite()">Criar</button>
        <button class="theme-red" v-on:click="showCreateSiteWindow = false">Cancelar</button>
      </div>
    </div>
    <div class="blur-div" v-if="showRenameSiteWindow">
      <div class="card creation-window">
        <h5>Novo site</h5>
        <input type="text" placeholder="Estação..." v-model="nomeEstacaoRename" autofocus><br>
        <input type="text" placeholder="Escopo..." v-model="escopoRename"><br>
        <input type="text" placeholder="Cidade..." v-model="cidadeRename"><br>
        <input type="text" placeholder="Projeto ID..." v-model="projetoIdRename"><br>
        <select class="selectBox" style="width: 192px;" v-model="selectRename">
          <option value="" disabled>Status</option>
          <option v-for="(status, index) in statuses" :key="index">{{status.Descricao}}</option>
        </select><br>
        <button class="theme-blue" v-on:click="renameSite()">Criar</button>
        <button class="theme-red" v-on:click="showRenameSiteWindow = false">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
  let baseUrl = 'http://localhost:3000/';
  import axios from 'axios';
  export default {
    name: 'Sites',
    data: () => {
      return {
        search: '',
        showCreateSiteWindow: false,
        showRenameSiteWindow: false,
        nomeEstacao: 'Estacao 1',
        escopo: 'Escopo 1',
        cidade: '1',
        projetoId: '7',
        statusId: '1',
        sites: '',
        nomeEstacaoRename: 'Estacao 1',
        escopoRename: 'Escopo 1',
        cidadeRename: '1',
        projetoIdRename: '7',
        statusIdRename: '',
        selectRename: '',
        statuses: '',
        
        // sites: [
        //   { nomeEstacao: 'estação 1', escopo: 'escopo 1', cidade: 'lugar 1' },
        //   { nomeEstacao: 'estação 2', escopo: 'escopo 2', cidade: 'lugar 2' },
        //   { nomeEstacao: 'estação 3', escopo: 'escopo 3', cidade: 'lugar 3' },
        // ],
      }
    },
    computed: {
      filteredSites() {
        return this.sites.filter( (site) => {
          return site.Nome.match(this.search) || site.Escopo.match(this.search) || site.cidadeId.match(this.search);
        });
      }
    },
    mounted(){
      // let projetoId = this.$route.query.id;
      // console.log(projetoId)
      this.getEstacoes();
    },
    methods: {
      createSite() {
        let thisInside = this;
        if (this.nomeEstacao.replace(/\s/g, "") !== "" && this.escopo.replace(/\s/g, "") !== "" && this.cidade.replace(/\s/g, "") !== "" && this.projetoId.replace(/\s/g, "") !== "" && this.statusId.replace(/\s/g, "") !== "") {
          axios.post(baseUrl + 'estacao/create', {Nome: this.nomeEstacao, Escopo: this.escopo, cidadeId: this.cidade, projetoId: this.projetoId, statusId: this.statusId})
          .then(function(response){
            if(response.data.estacaoCriada){
              thisInside.getEstacoes()
            }
            // console.log(response.data.estacaoCriada);
          })
          this.showCreateSiteWindow = false;
          // this.nomeEstacao = ''
          // this.escopo = ''
          // this.Cidade = ''
        }
        else {
          alert("Informações inválidas")
          this.showCreateSiteWindow = false;
        }
      },
      deleteSite(siteId) {
        let thisInside = this;
        if(confirm("A estacao será excluida.\nContinuar?")){
          axios.delete(baseUrl + 'estacao/' + siteId + '/delete')
          .then(function(response){
            if(response.data.estacaoDeleted){
              thisInside.getEstacoes();
            }else{
              console.log("Erro no delete da estacao")
            }
          })
        }else{
          alert("Estacao nao apagada!")
          this.getEstacoes()
        }
      },
      renameSite(siteId){
        let thisInside = this;
        let statusID = 1;
        console.log(this.nomeEstacaoRename+this.escopoRename+this.cidadeRename+this.projetoIdRename+this.selectRename)
        if (this.nomeEstacaoRename.replace(/\s/g, "") !== "" && this.escopoRename.replace(/\s/g, "") !== "" && this.cidadeRename.replace(/\s/g, "") !== "" && this.projetoIdRename.replace(/\s/g, "") !== "" && this.selectRename !== "") {
          if(this.selectRename.toLowerCase() == 'aprovado'){
            statusID = 1;
          }else if(this.selectRename.toLowerCase() == 'reprovado'){
            statusID = 2;
          }else if(this.selectRename.toLowerCase() == 'em analise'){
            statusID = 3;
            console.log("em analise")
          }
          axios.put(baseUrl + 'estacao/' + siteId + '/update', {Nome: this.nomeEstacaoRename, Escopo: this.escopoRename, cidadeId: this.cidadeRename, projetoId: this.projetoIdRename, statusId: statusID})
          .then(function(response){
            console.log(response.data)
            if(response.data.updatedEstacao){
              thisInside.getEstacoes()
            }else{
              console.log(response.data.updatedEstacao)
            }
            thisInside.getEstacoes()
          })
        }else{
          alert("Preencha todos os campos")
        }
        // console.log(siteId)
      },
      getEstacoes(){
        let thisInside = this;
        // console.log(estacaoId);
        axios.get(baseUrl + 'estacoes/1')
        .then(function(response){
          if(response.data.length == 0){
            thisInside.sites = '';
            thisInside.projectEmpty = true;
            // console.log("teste")
          }else{
            // console.log(response.data)
            thisInside.sites = response.data;
            thisInside.projectEmpty = false;
          }
        })
      },
      getStatus(){
        let thisInside = this;
        let count = 0;
        axios.get(baseUrl + 'statuses/1')
        .then(function(response){
          thisInside.statuses = response.data;
        })
      }
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
  .fab {
    position: fixed;
    bottom: 15px;
    right: 4%;
  }
</style>
