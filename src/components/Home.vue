<template>
  <div>
    <div class="cards">
      <div class="card nonLink" style="text-align: center; font-size: 4vh;" v-if="projectEmpty">
        <a>Não há projetos</a>
      </div>
      <div class="card cardHome" v-for="(projeto, index) in projetos" v-bind:key="index">
        <div class="card-header">
          <h5>{{ projeto.Nome }}</h5>
          <div>
            <i class="material-icons icon-button options-button">more_vert</i>
            <div class="card card-options">
              <ul>
                <li v-on:click="showRenameProjectWindow = true; idProjectRename = projeto.id; getStatus()">Renomear</li>
                <li v-on:click="deleteProject(projeto.id)">Deletar</li>
              </ul>
            </div>
          </div>
        </div>
        <p>{{ projeto.Escopo }}</p>
        <p>Id do projeto: {{ projeto.id }}</p>
        <p>Status do projeto: {{transformStatusId(projeto.statusId)}}</p>
        <!-- <p>{{ projeto.concluidas }} concluidas</p> -->
        <!-- <button class="theme-blue" v-on:click="$router.push('/sites/q?id=' + projeto.id)">Abrir</button> -->
        <button class="theme-blue" v-on:click="$router.push('/sites/q?projetoId=' + projeto.id)">Abrir</button>
      </div>
      <button class="fab theme-blue" v-on:click="showCreateProjectWindow = true, getStatus()">
        <i class="material-icons">add</i>
      </button><br>
      
      <!-- Create project window: -->
      
      <div class="blur-div" v-if="showCreateProjectWindow">
        <div class="card creation-window">
          <h5>Novo projeto</h5>
          <input type="text" placeholder="Nome do projeto..." v-model="nome"><br>
          <input type="text" placeholder="Escopo do projeto..." v-model="escopo"><br>
          <!-- <input type="text" placeholder="Status do projeto..." v-model="statusId"><br> -->
          <select class="selectBox" style="width: 192px;" v-model="selectCreation">
            <option value="" disabled>Status</option>
            <option v-for="(status, index) in statuses" :key="index">{{status.Descricao}}</option>
          </select><br>
          <button class="theme-blue" v-on:click="createProject()">Criar</button>
          <button class="theme-red" v-on:click="showCreateProjectWindow = false">Cancelar</button>
        </div>
      </div>
      <div class="blur-div" v-if="showRenameProjectWindow">
        <div class="card creation-window">
          <h5>Atualizar projeto</h5>
          <input type="text" placeholder="Nome do projeto..." v-model="nomeRename" autofocus><br>
          <input type="text" placeholder="Escopo do projeto..." v-model="escopoRename"><br>
          <!-- <input type="text" placeholder="Status do projeto..." v-model="statusIdRename"><br> -->
          <select class="selectBox" style="width: 192px;" v-model="selectRename">
            <option value="" disabled>Status</option>
            <option v-for="(status, index) in statuses" :key="index">{{status.Descricao}}</option>
          </select><br>
          <button class="theme-blue" v-on:click="renameProject()">Atualizar</button>
          <button class="theme-red" v-on:click="showRenameProjectWindow = false">Cancelar</button>
        </div>
      </div>
    </div>

    <div class="containerPaginate" v-if="showPaginate">
      <paginate
        v-model="pagePaginate"
        :page-count="qtdPagePaginate"
        :page-range="3"
        :margin-pages="2"
        :click-handler="paginateFunction"
        :container-class="'paginate'"
        :first-last-button="true"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :first-button-text="'First'"
        :last-button-text="'Last'"
        :no-li-surround="true"
        :page-link-class="'otherPaginateItem'"
        :prev-link-class="'otherPaginateItem'"
        :next-link-class="'otherPaginateItem'"
        :disabled-class="'disabledPaginateItem'"
        :active-class="'activePaginateItem'"
        >
      </paginate>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  let baseUrl = 'http://localhost:3000/'
  export default {
    name: 'Home',
    data: () => {
      return {
        showCreateProjectWindow: false,
        showRenameProjectWindow: false,
        nome: '',
        escopo: '',
        statusId: '',
        projetos: '',
        projectEmpty: false,
        nomeRename: '',
        escopoRename: '',
        statusIdRename: '',
        idProjectRename: '',
        statuses: '',
        selectCreation: '',
        selectRename: '',
        pagePaginate: 1,
        qtdPagePaginate: 1,
        showPaginate: true,
        showProject: false,
        // projetos: [
        //   { nome: '2,5GHz TDD', estacoes: 0, concluidas: 0 },
        //   { nome: 'EILD Satélite', estacoes: 27, concluidas: 0 },
        //   { nome: 'Minas 2018', estacoes: 6, concluidas: 0 },
        // ]
      }
    },
    mounted(){
      this.getProjetos();
    },
    methods: {
      createProject() {
        let thisInside = this;
        var statusID = '';
        if (this.nome.replace(/\s/g, "") !== "" && this.escopo.replace(/\s/g, "") !== "" && this.selectCreation.replace(/\s/g, "") !== "" && this.selectCreation != '') {
          if(this.selectCreation.toLowerCase() == 'aprovado'){
            statusID = 1;
          }else if(this.selectCreation.toLowerCase() == 'reprovado'){
            statusID = 2;
          }else if(this.selectCreation.toLowerCase() == 'em analise'){
            statusID = 3;
          }
          axios.post(baseUrl+'projeto/create', {Nome: this.nome, Escopo: this.escopo, statusId: statusID})
          .then(function(response){
            if(response.data.createdProject){
              thisInside.getProjetos();
            }else{
              thisInside.getProjetos();
            }
          })
          this.showCreateProjectWindow = false
        }else{
          alert("Preencha todos os campos")
        }
        // else {
        //   alert("Nome inválido")
        //   this.showCreateProjectWindow = false;
        // }
      },
      deleteProject(projectId) {
        let thisInside = this;
        if (confirm("Deseja excluir esse projeto?")) {
          axios.delete(baseUrl + 'projeto/'+projectId+'/delete')
          .then(function(response){
            if(response.data.delectedProject){
              thisInside.getProjetos();
            }else{
              console.log("Erro no delete do projeto")
            }
          })
          // this.projetos.splice(projectId, 1)
        }
      },
      renameProject() {
        let thisInside = this;
        let statusID = '';
        if (this.nomeRename.replace(/\s/g, "") !== "" && this.escopoRename.replace(/\s/g, "") !== "" && this.selectRename != '') {
          if(this.selectRename.toLowerCase() == 'aprovado'){
            statusID = 1;
          }else if(this.selectRename.toLowerCase() == 'reprovado'){
            statusID = 2;
          }else if(this.selectRename.toLowerCase() == 'em analise'){
            statusID = 3;
          }else{
            statusID = 0;
          }
          axios.put(baseUrl + 'projeto/' +this.idProjectRename+ '/update', {Nome: this.nomeRename, Escopo: this.escopoRename, statusId: statusID})
          .then(function(response){
            if(response.data.updatedProject){
              thisInside.getProjetos()
              thisInside.nomeRename = '';
              thisInside.escopoRename = '';
              thisInside.selectRename = '';
              statusID = '';
            }else{
              console.log(response.data.updatedProject)
            }
            thisInside.showRenameProjectWindow = false;
          })
          // this.showRenameProjectWindow = false;
        }else{
          alert("Preencha todos os campos");
        }
      },
      getProjetos(){
        let thisInside = this;
        axios.get(baseUrl+'projetos/' + this.pagePaginate)
        .then(function(response){
          // if(response.data.length == 0){
          //   thisInside.projetos = '';
          //   thisInside.projectEmpty = true;
          // }else{
          //   thisInside.projetos = response.data;
          //   thisInside.projectEmpty = false;
          // }
          
          if(response.data.totalPage == 0){
            thisInside.projetos = '';
            thisInside.projectEmpty = false;
          }else{
            thisInside.showProject = true;
            if(response.data.totalPage > 1){
              thisInside.showPaginate = true;
              thisInside.qtdPagePaginate = response.data.totalPage;
              thisInside.projetos = response.data;
              thisInside.projectEmpty = false;
            }
            delete response.data.totalPage
            thisInside.sites = response.data;
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
      transformStatusId(statusId){
        if(statusId == 1){
          return "Aprovado";
        }else if(statusId == 2){
          return "Reprovado";
        }else if(statusId == 3){
          return "Em análise";
        }else{
          return;
        }
      },
      paginateFunction(){
        this.getProjetos();
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cardHome:hover{
    transform: scale(1.05);
  }
  .card .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .card-options {
    position: absolute;
    margin-top: -44px;
    margin-left: -59px; 
    display: none; 
  }
  .card-options ul li {
    cursor: pointer;
  }
  .card-options ul li:hover {
    background-color: #F1F1F1
  }
  .card-options:hover { 
    display: block;
    transform: none;
  }
  .fab {
    position: fixed;
    bottom: 15px;
    right: 4%;
  }
</style>
