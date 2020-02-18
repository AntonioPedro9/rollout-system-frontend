<template>
  <div class="cards">
    <div style="display: flex; flex-direction: column;">
      <!-- <div class="card">
        <h5>Nome da Demanda</h5>
        <label class="input-label">Estação</label><input type="text" v-model="estacaoResumo"/>
        <label class="input-label">Escopo</label><input type="text" v-model="escopoResumo"/>
        <label class="input-label">Localidade</label><input type="text" v-model="localidadeResumo"/>
      </div> -->
      <!-- <div class="card">
        <div class="pie-chart" :style="chartStyle"></div>
      </div> -->
    </div>
    <div>
      <div class="card">
        <div class="card-header">
          <h5>Demandas</h5>
          <div v-if="renameSubmit"><i class="material-icons icon-button" style="font-size: 18px" v-on:click="updateAtividade()">done_outline</i></div>
          <div v-if="!renameSubmit" class="search-box">
            <i class="material-icons">search</i>
            <input type="text" v-model="search" placeholder="Buscar..."/>
          </div>
        </div>
        <table>
          <tr>
            <th>Nome</th>
            <th>Escopo</th>
            <th>Tipo</th>
            <th>Status</th>
            <th></th>
          </tr>
          <tr class="site" v-for="(demanda, index) in demandas" :key="index">
            <td><input class="editable" style="width: 140px;" type="text" v-model="demanda.Nome" v-on:keyup.enter="updateAtividade()" @click="updateArray = demanda, enableEdit(demanda.id)"></td>
            <td><input class="editable" style="width: 140px;" type="text" v-model="demanda.Escopo" v-on:keyup.enter="updateAtividade()" @click="updateArray = demanda, enableEdit(demanda.id)"></td>
            <td><input class="editable" style="width: 140px;" type="text" v-model="demanda.Tipo" v-on:keyup.enter="updateAtividade()" @click="updateArray = demanda, enableEdit(demanda.id)"></td>
            <!-- <td v-if="true"><input class="editable" type="text" v-model="demanda.estacaoId"></td> -->
            <td><div class="status theme-red" @click="updateStatus(index, demanda.statusId)"> {{ demanda.statusId }} </div></td>
            <td><i class="material-icons icon-button" style="font-size: 18px" v-on:click="deleteTask(demanda.id)">delete</i></td>
          </tr>
        </table>
      </div>
    </div>
    <button class="fab theme-blue" @click="showCreateTaskWindow = true">
      <i class="material-icons">add</i>
    </button>
    <!-- Create task window: -->
    <div class="blur-div" v-if="showCreateTaskWindow">
      <div class="card creation-window">
        <h5>Nova demanda</h5>
        <input type="text" placeholder="Nome..." v-model="nome" autofocus><br>
        <input type="text" placeholder="Escopo..." v-model="escopo"><br>
        <input type="text" placeholder="Tipo..." v-model="tipo"><br>
        <input type="text" placeholder="Status..." v-model="statusId"><br>
        <button class="theme-blue" v-on:click="createTask()">Criar</button>
        <button class="theme-red" v-on:click="showCreateTaskWindow = false">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  let baseUrl = 'http://localhost:3000/';
  export default {
    name: 'Atividade',
    data: () => {
      return {
        estacaoResumo: 'Estação X',
        escopoResumo: 'Escopo X',
        localidadeResumo: 'Localidade X',
        search: '',
        showCreateTaskWindow: false,
        demandas: '',
        nome: '',
        escopo: '',
        tipo: '',
        statusId: '',
        renameSubmit: '',
        demandaIdUpdate: '',
        demandaIdUpdateOld: '',
        demandaIdUpdateNovo: '',
        updateArray: [],
      
        // demandas: [
        //   { descricao: 'Massa 1', comentario: 'Massa massa 1', status: 'Não iniciado' },
        //   { descricao: 'Massa 2', comentario: 'Massa massa 2', status: 'Não iniciado' },
        //   { descricao: 'Massa 3', comentario: 'Massa massa 3', status: 'Não iniciado' },
        // ],
        chartStyle: {
          background: `conic-gradient(
            rgb(76, 175, 80) 0 33%, 
            rgb(244, 67, 54) 0 66%, 
            rgb(33, 150, 243) 0 100%`
        }
      }
    },
    mounted(){
      this.getAtividade();
    },
    computed: {
      filteredTasks() {
        return this.demandas.filter( (demanda) => {
          return demanda.descricao.match(this.search) || demanda.comentario.match(this.search);
        });
      }
    },
    methods: {
      createTask() {
        let thisInside = this;
        if (this.nome.replace(/\s/g, "") !== "" && this.escopo.replace(/\s/g, "") !== "" && this.tipo.replace(/\s/g, "") !== "" && this.statusId.replace(/\s/g, "") !== "") {
          let estacaoId = this.$route.query.estacaoId;
          console.log(this.nome+this.escopo+this.tipo+estacaoId+this.statusId);
          axios.post(baseUrl + 'atividade/create', {Nome: this.nome, Escopo: this.escopo, Tipo: this.tipo, estacaoId: estacaoId, statusId: this.statusId})
          .then(function(response){
            if(response.data.atividadeCriada){
              thisInside.getAtividade();
            }else{
              console.log("erro na criacao da atividade");
            }
          })
          this.showCreateTaskWindow = false
        }
        else {
          alert("Informações inválidas")
        }
      },
      deleteTask(demandaId) {
        let thisInside = this;
        if (confirm("Deseja excluir essa demanda?")) {
          axios.delete(baseUrl + 'atividade/' + demandaId + '/delete')
          .then(function(response){
            if(response.data.atividadeDeletada){
              thisInside.getAtividade();
            }else{
              console.log("Erro na exclusao da atividade");
            }
          })
        }
      },
      updateStatus(index, demandaStatusId) {
        let status = document.getElementsByClassName("status")
        // console.log(demandaStatusId);
        if(demandaStatusId == 1){
          status[index].classList.replace("theme-red", "theme-green")
          status[index].innerHTML = "Concluído"
        }else if(demandaStatusId == 2){
          status[index].classList.replace("theme-red", "theme-red")
          status[index].innerHTML = "Não iniciado"
        }else if(demandaStatusId == 3){
          status[index].classList.replace("theme-red", "theme-blue")
          status[index].innerHTML = "Em andamento"
        }
      },
      getAtividade(){
        let thisInside = this;
        axios.get(baseUrl + 'atividades/1')
        .then(function(response){
          thisInside.demandas = response.data;
          // console.log(response)
        })
      },
      checkStatus(){
        var status = document.getElementById("status");
        // console.log(status)
      },
      enableEdit(demandaId){
        this.demandaIdUpdateNovo = demandaId;
        if(this.demandaIdUpdateOld == ''){
          this.demandaIdUpdateOld = demandaId;
          this.demandaIdUpdate = demandaId;
        }else if(this.demandaIdUpdateNovo != this.demandaIdUpdateOld){
          alert("Erro!\nSalve as alterações antes de continuar")
        }
        this.renameSubmit = true;
        // this.demandaIdUpdate = demandaId;
        // this.demandaIdUpdateOld = demandaId;
      },
      updateAtividade(){
        let thisInside = this;
        let demandaId = this.demandaIdUpdate;
        let dadosUpdate = this.updateArray;
        // console.log(this.updateArray)
        axios.put(baseUrl + 'atividade/' + this.demandaIdUpdate + '/update', {Nome: dadosUpdate.Nome, Escopo: dadosUpdate.Escopo, Tipo: dadosUpdate.Tipo, estacaoId: dadosUpdate.estacaoId, statusId: dadosUpdate.statusId})
        .then(function(response){
          if(response.data.atividateUpdate){
            thisInside.demandaIdUpdate = '';
            thisInside.demandaIdUpdateOld = '';
            thisInside.demandaIdUpdateNovo = '';
            thisInside.getAtividade();
          }else{
            console.log("Erro na atualizacao da atividade");
          }
        })
        this.renameSubmit = false;
        // this.demandaIdUpdate = '';
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cards .card {
    flex: 0 0 auto;
  }
  .input-label {
    margin: 16px 0px -10px 0px;
    padding: 0px 8px;
    display: block;
    color: #888;
    font-size: 12px;
    font-weight: 600;
  }
  .pie-chart {
    margin: 8px;
    width: 194px;
    height: 194px;
    border-radius: 50%;
  }
  .card .card-header, .search-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .editable {
    border-bottom: none;
    cursor: text;
    text-align: center;
  }
  .editable:hover {
    border-bottom: 1px solid currentColor;
  }
  .editable:focus {
    border-bottom: 2px solid rgb(33, 150, 243);
  }
  .status {
    width: 124px;
    padding: 4px 8px;
    border-radius: 2px;
    cursor: pointer;
    -webkit-user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
  .fab {
    position: fixed;
    bottom: 15px;
    right: 4%;
  }
</style>