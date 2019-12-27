<template>
  <div class="cards">
    <div style="display: flex; flex-direction: column;">
      <div class="card">
        <h5>Nome do projeto</h5>
        <label class="input-label">Estação</label><input type="text"/>
        <label class="input-label">Escopo</label><input type="text"/>
        <label class="input-label">Localidade</label><input type="text"/>
        <br>
        <button class="theme-red">Deletar site</button>
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
            <th>Descrição</th>
            <th>Comentário</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
          <tr v-for="(demanda, index) in filteredTasks" :key="index">
            <td>{{ demanda.descricao }}</td>
            <td>{{ demanda.comentario }}</td>
            <td>
              <span class="status" v-bind:class="{
                'theme-red': demanda.naoIniciado, 
                'theme-blue': demanda.emAndamento, 
                'theme-green': demanda.concluido}
              ">
                {{ demanda.status }}
              </span>
            </td>
            <td>
              <i class="material-icons icon-button" style="font-size: 18px">edit</i>
              <i class="material-icons icon-button" style="font-size: 18px" v-on:click="deleteTask(index)">delete</i>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <button class="fab theme-blue" v-on:click="showCreateTaskWindow = true">
      <i class="material-icons">add</i>
    </button>
    <div class="blur-div" v-show="showCreateTaskWindow">
      <div class="card create-task">
        <h5>Nova demanda</h5>
        <input type="text" placeholder="Descrição..." v-model="descricao"><br>
        <input type="text" placeholder="Comentário..." v-model="comentario"><br>
        <button class="theme-blue" v-on:click="createTask()">Criar</button>
        <button class="theme-red" v-on:click="showCreateTaskWindow = false">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Project',
    data: () => {
      return {
        search: '',
        showCreateTaskWindow: false,
        descricao: '',
        comentario: '',
        
        demandas: [
          { descricao: 'Massa 1', comentario: 'Massa massa 1', status: 'Concluído', concluido: true },
          { descricao: 'Massa 2', comentario: 'Massa massa 2', status: 'Não iniciado', naoIniciado: true },
          { descricao: 'Massa 3', comentario: 'Massa massa 3', status: 'Em andamento', emAndamento: true },
        ],
        chartStyle: {
          background: `conic-gradient(
            rgb(76, 175, 80) 0 33%, 
            rgb(244, 67, 54) 0 66%, 
            rgb(33, 150, 243) 0 100%`
        }
      }
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
          this.demandas.push({
            descricao: this.descricao,
            comentario: this.comentario,
            status: 'Não iniciado',
            naoIniciado: true,
          });
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
      }
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
  .status {
    padding: 4px 8px;
    border-radius: 2px;

    cursor: pointer;
  }
  .create-task {
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
