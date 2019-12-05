<template>
  <div class="cards">
    <div style="display: flex; flex-direction: column;">
      <div class="card">
        <h5>Nome do projeto</h5>
        <label class="input-label">Localidade</label><input type="text"/>
        <label class="input-label">Estação</label><input type="text"/>
        <label class="input-label">Escopo</label><input type="text"/>
      </div>
      <div class="card">
        <div class="pie-chart" :style="chartStyle"></div>
      </div>
    </div>
    <div>
      <div class="card">
        <h5>Demandas</h5>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Comentário</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
          <tr v-for="demanda in demandas" :key="demanda.descricao">
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
              <i class="material-icons icon-button" style="font-size: 18px">delete</i>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <button class="fab theme-blue">
      <i class="material-icons">edit</i>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'Project',
    data: () => {
      return {
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
  .status {
    padding: 4px 8px;
    border-radius: 2px;
  }
  .fab {
    position: fixed;
    bottom: 15px;
    right: 4%;
  }
</style>
