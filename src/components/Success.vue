<template>
  <b-container>
    <b-card bg-variant="dark" text-variant="white" >
      <b-card-text>
      Bienvenido <span>{{user.name}} !</span> 
      <br>
      <br>
      <p>Para iniciar una Trivia, simplemente pulsa el botón Jugar</p>
      <p>Si deseas agregar una pregunta personalizada a la Trivia pulsa el botón Agregar</p> 
      </b-card-text>
      <br>
      <b-row>
        <b-col offset-md="4" md="2">
            <b-button pill size="lg" id="jugar" @click.prevent="$router.push('jugar')" type="button" variant="outline-success">Jugar</b-button>
          </b-col>
          <b-col md="2">
            <b-button pill size="lg" @click.prevent="$router.push('agregar')" type="button" variant="outline-success">Agregar</b-button>
          </b-col>
      </b-row>
    </b-card>
    <br>
    <br>
    <h2>Puntajes</h2>
    <h2 class="post_header"></h2>
    <br>
    <br>
    <b-row>
      <b-col md="12" class="my-1">
        <b-form-group
          label="Buscar :"
          label-cols-md="1"
          label-align-md="left"
          label-size="md"
          label-for="filterInput"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Limpiar</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>  
      <b-col md="12" sm="12">
        <b-table :filter="filter" head-variant="dark" striped hover :items="puntajes_trivia" :fields="titulos_tabla"></b-table>
      </b-col>
    </b-row>
    
  </b-container>
</template>

<script>
import { db } from '../firebase'; 


export default {
  data() {
    return {
      titulos_tabla: [
        { key: 'jugador', sortable: true},
        { key: 'puntos', sortable: true},
        { key: 'porcentaje', sortable: true},
        { key: 'fecha', sortable: true}
      ],
      filter: null
    }
  },
  firestore() { 
    return {
      puntajes_trivia: db.collection('puntajes_trivia')
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    },
    user(){
      return this.$store.state.user;
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.post_header{
position: relative;
content: "";
width: 100px;
margin: 0 auto;
margin-top: 10px;
border: 2px solid #151e2d;
display: block;
}

span{
  font-weight: bold;
  font-size: 1.5rem;
}

h2 {
  text-align: center;
  
}

</style>