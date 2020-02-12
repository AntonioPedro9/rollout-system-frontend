<template>
  <div class="cards">
    <div style="display: flex; flex-direction: column;">
      <div class="card">
        <h5>Nome do projeto</h5>
        <label class="input-label">Estação</label><input type="text" v-model="estacaoResumo"/>
        <label class="input-label">Escopo</label><input type="text" v-model="escopoResumo"/>
        <label class="input-label">Localidade</label><input type="text" v-model="localidadeResumo"/>
      </div>
      <div class="card">
        <div class="pie-chart" :style="chartStyle"></div>
      </div>
    </div>
    <div>
      <div class="card">
        <div class="card-header">
          <h5>Demandas</h5>
          <div class="search-box">
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
            <tr ><i class="material-icons icon-button" style="font-size: 18px" v-if="renameSubmit" v-on:click="updateAtividade()">done_outline</i></tr>
          <tr class="site" v-for="(demanda, index) in demandas" :key="index" @click="enableEdit()">
            <td><input class="editable" type="text" v-model="demanda.Nome"></td>
            <td><input class="editable" type="text" v-model="demanda.Escopo"></td>
            <td><input class="editable" type="text" v-model="demanda.Tipo"></td>
            <td><div class="status theme-red" v-on:click="updateStatus(index, demanda.statusId)"> {{ demanda.statusId }} </div></td>
            <td><i class="material-icons icon-button" style="font-size: 18px" v-on:click="deleteTask(index)">delete</i></td>
          </tr>
        </table>
      </div>
    </div>
    <button class="fab theme-blue" v-on:click="showCreateTaskWindow = true">
      <i class="material-icons">add</i>
    </button>
    <!-- Create task window: -->
    <div class="blur-div" v-if="showCreateTaskWindow">
      <div class="card creation-window">
        <h5>Nova demanda</h5>
        <input type="text" placeholder="Nome..." v-model="nome"><br>
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
        if (this.descricao.replace(/\s/g, "") !== "" && this.comentario.replace(/\s/g, "") !== "") {
          console.log("teste")
          this.showCreateTaskWindow = false
          this.descricao = ''
          this.comentario = ''
          this.status = ''
        }
        else {
          alert("Informações inválidas")
        }
      },
      deleteTask(index) {
        if (confirm("Deseja excluir essa demanda?")) {
          this.demandas.splice(index, 1);
        }
      },
      updateStatus(index, demandaStatusId) {
        let status = document.getElementsByClassName("status")
        // console.log(demandaStatusId);
        if(demandaStatusId == 1){
          status[index].classList.replace("theme-red", "theme-green")
          status[index].innerHTML = "Concluído"
        }else if(demandaStatusId == 2){
          status[index].classList.replace("theme-green", "theme-blue")
          status[index].innerHTML = "Não iniciado"
        }else if(demandaStatusId == 3){
          status[index].classList.replace("theme-blue", "theme-red")
          status[index].innerHTML = "Em andamento"
        }
        // if (status[index].classList == "status theme-red") {
        // }
        // else if (status[index].classList == "status theme-blue") {
        // }
        // else {
        // }
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
        console.log(status)
      },
      enableEdit(){
        this.renameSubmit = true;
      },
      updateAtividade(){
        this.renameSubmit = false;
        // console.log("teste")
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