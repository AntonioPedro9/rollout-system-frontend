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
      <table id="siteTable">
        <tr>
          <th>Index</th>
          <th>Estação</th>
          <th>Escopo</th>
          <th>Cidade</th>
          <th>Progresso</th>
          <th></th>
        </tr>
        <tr class="site" v-for="(site, index) in sites" :key="index">
          <td>{{index+1}}</td>
          <td v-on:click="$router.push('/sites/atividade/q?estacaoId=' + site.id)">{{ site.Nome }}</td>
          <td v-on:click="$router.push('/sites/atividade/q?estacaoId=' + site.id)">{{ site.Escopo }}</td>
          <td v-on:click="$router.push('/sites/atividade/q?estacaoId=' + site.id)">{{ site.cidadeId }}</td>
          <td v-on:click="$router.push('/sites/atividade/q?estacaoId=' + site.id)">
            <div class="bar">
              <div class="bar-fill"></div>
            </div>
          </td>
          <td><i class="material-icons icon-button" style="font-size: 18px" v-on:click="deleteSite(site.id)">delete</i></td>
          <td><i class="material-icons icon-button" style="font-size: 18px" v-on:click="showRenameSiteWindow = true, getStatus(), getCidade(), siteIdRename = site.id">edit</i></td>
        </tr>
      </table>
      <!-- <div class="paginate">
        <a href="#">&laquo;</a>
        <a href="#">1</a>
        <a class="active" href="#">1</a>
        <a href="#">&raquo;</a>
      </div> -->
    </div>
    <button class="fab theme-blue" v-on:click="showCreateSiteWindow = true,  getStatus(), getCidade()">
      <i class="material-icons">add</i>
    </button>
    <!-- Create site window: -->
    <div class="blur-div" v-if="showCreateSiteWindow">
      <div class="card creation-window">
        <h5>Novo site</h5>
        <input type="text" placeholder="Estação..." v-model="nomeEstacao" autofocus><br>
        <input type="text" placeholder="Escopo..." v-model="escopo"><br>
        <select class="selectBox" style="width: 192px;" v-model="selectBoxCidade">
          <option value="" disabled>Cidade</option>
          <option v-for="(cidade, index) in cidades" :key="index" @click="indexCidadeCreate = index+1">{{cidade.Nome}}</option>
        </select><br>
        <input type="text" class="disabled" placeholder="Projeto ID..." v-model="projetoId" disabled><br>
        <select class="selectBox" style="width: 192px;" v-model="selectCreate">
          <option value="" disabled>Status</option>
          <option v-for="(status, index) in statuses" :key="index" @click="indexStatusCreate = index+1">{{status.Descricao}}</option>
        </select><br>
        <button class="theme-blue" v-on:click="createSite()">Criar</button>
        <button class="theme-red" v-on:click="showCreateSiteWindow = false">Cancelar</button>
      </div>
    </div>
    <div class="blur-div" v-if="showRenameSiteWindow">
      <div class="card creation-window">
        <h5>Atualizar Site</h5>
        <input type="text" placeholder="Estação..." v-model="nomeEstacaoRename" autofocus><br>
        <input type="text" placeholder="Escopo..." v-model="escopoRename"><br>
        <select class="selectBox" style="width: 192px;" v-model="selectBoxCidadeRename">
          <option value="" disabled>Cidade</option>
          <option v-for="(cidade, index) in cidades" :key="index" @click="indexCidadeRename = index+1">{{cidade.Nome}}</option>
        </select><br>
        <input type="text" class="disabled" placeholder="Projeto ID..." v-model="projetoIdRename" disabled title="Este parâmetro não pode ser alterado"><br>
        <select class="selectBox" style="width: 192px;" v-model="selectRename">
          <option value="" disabled>Status</option>
          <option v-for="(status, index) in statuses" :key="index" @click="indexStatusRename = index+1">{{status.Descricao}}</option>
        </select><br>
        <button class="theme-blue" v-on:click="renameSite()">Atualizar</button>
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
        nomeEstacao: '',
        escopo: '',
        cidade: 'a',
        projetoId: '',
        statusId: '',
        sites: '',
        nomeEstacaoRename: '',
        escopoRename: '',
        cidadeRename: '',
        projetoIdRename: '',
        statusIdRename: '',
        selectCreate: '',
        selectRename: '',
        statuses: '',
        cidades: '',
        selectBoxCidade: '',
        selectBoxCidadeRename: '',
        indexCidadeCreate: '',
        indexStatusCreate: '',
        indexCidadeRename: '',
        indexStatusRename: '',
        siteIdRename: '',
        
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
      },
      rows() {
        return this.sites.length;
      }
    },
    mounted(){
      // let projetoId = this.$route.query.id;
      // console.log(projetoId)
      this.projetoIdInsert();
      this.getEstacoes();
    },
    methods: {
      createSite() {
        let thisInside = this;
        if (this.nomeEstacao.replace(/\s/g, "") !== "" && this.escopo.replace(/\s/g, "") !== "") {
          // if(this.selectCreate.toLowerCase() == 'aprovado'){
          //   statusID = 1;
          // }else if(this.selectCreate.toLowerCase() == 'reprovado'){
          //   statusID = 2;
          // }else if(this.selectCreate.toLowerCase() == 'em analise'){
          //   statusID = 3;
          // }
          axios.post(baseUrl + 'estacao/create', {Nome: this.nomeEstacao, Escopo: this.escopo, cidadeId: this.indexCidadeCreate, projetoId: this.projetoId, statusId: this.indexStatusCreate})
          .then(function(response){
            if(response.data.estacaoCriada){
              thisInside.getEstacoes();
            }else{
              console.log(response);
            }
            // console.log(response)
            // console.log(response.data.estacaoCriada);
          })
          this.showCreateSiteWindow = false;
          // this.nomeEstacao = ''
          // this.escopo = ''
          // this.Cidade = ''
          // console.log(this.indexStatusCreate)
          // console.log(this.cidades[index].id)
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
      renameSite(){
        let thisInside = this;
        let statusID = 1;
        // console.log(this.siteIdRename)
        // console.log(this.nomeEstacaoRename+this.escopoRename+this.cidadeRename+this.projetoIdRename+this.selectRename)
        if (this.nomeEstacaoRename.replace(/\s/g, "") !== "" && this.escopoRename.replace(/\s/g, "") !== "" && this.projetoIdRename.replace(/\s/g, "") !== "") {
          // if(this.selectRename.toLowerCase() == 'aprovado'){
          //   statusID = 1;
          // }else if(this.selectRename.toLowerCase() == 'reprovado'){
          //   statusID = 2;
          // }else if(this.selectRename.toLowerCase() == 'em analise'){
          //   statusID = 3;
          // }
          axios.put(baseUrl + 'estacao/' + this.siteIdRename + '/update', {Nome: this.nomeEstacaoRename, Escopo: this.escopoRename, cidadeId: this.indexCidadeRename, projetoId: this.projetoIdRename, statusId: this.indexStatusRename})
          .then(function(response){
            // console.log(response.data)
            if(response.data.updatedEstacao){
              thisInside.getEstacoes()
            }else{
              // console.log(response.data.updatedEstacao)
              thisInside.getEstacoes()
            }
          })
          this.showRenameSiteWindow = false;
        }else{
          alert("Preencha todos os campos")
        }
        // console.log(siteId)
      },
      getEstacoes(){
        let thisInside = this;
        // console.log(estacaoId);
        axios.get(baseUrl + 'estacoes/1/' + this.projetoId)
        .then(function(response){
          if(response.data.length == 0){
            thisInside.sites = '';
            thisInside.projectEmpty = true;
            // console.log("teste")
          }else{
            // console.log(response.data)
            thisInside.sites = response.data;
            thisInside.projectEmpty = false;
            for(var i = 0; i < response.data.length; i++){
              // console.log(response.data[i].cidadeId)
              thisInside.getEstacaoCidade(response.data[i].cidadeId, i);
            }
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
      },
      getCidade(){
        let thisInside = this;
        axios.get(baseUrl + 'cidades/1')
        .then(function(response){
          if(response.data.length == 0){
            thisInside.cidades = '';
          }else{
            thisInside.cidades = response.data;
          }
        })
      },
      getEstacaoCidade(cidadeId, indexCidade){
        let thisInside = this;
        axios.get(baseUrl + 'cidade/'+cidadeId)
        .then(function(response){
          if(response.data != null){
            thisInside.sites[indexCidade].cidadeId = response.data.Nome
          }
        })
      },
      projetoIdInsert(){
        this.projetoId = this.$route.query.projetoId;
        this.projetoIdRename = this.$route.query.projetoId;
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
  .paginate{
    padding: 10px;
  }
  .paginate a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    transition: background-color .3s;
  }
  .paginate a.active {
    background-color: dodgerblue;
    color: white;
  }
  .paginate a:hover:not(.active) {
    background-color: #ddd;
  }
  .disabled{
    cursor: not-allowed;
    transition: .2s ease;
  }
  .disabled:hover{
    opacity: .75;
    background-color: #f99;
  }
</style>
