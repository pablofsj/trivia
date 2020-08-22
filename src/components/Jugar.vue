<template>
  <b-container>
    <h2>Nueva Trivia de <span>{{user.name}}</span></h2>
    <h2 class="post_header"></h2>
    <br>
    <h5>Elije una respuesta para cada una de las siguientes preguntas generadas al azar, una vez termines pulsa el botón 
    "Enviar Trivia". Buena Suerte!</h5>
    <br>
    <br>
      <b-form @submit.prevent="enviarTrivia">
        <b-row>
          <br>
          <br>
          <br>
          <b-col md="12" sm="12">
            <b-form-group v-for="pregunta in triviaDesordenada.slice(0,3)" v-bind:key="pregunta.id">
              <h4>{{pregunta.pregunta}}</h4>
              <b-form-radio required v-for="respuesta in pregunta.respuestas" v-bind:key="respuesta.texto"  
              @change="cambio($event,pregunta.id)"   :name="pregunta.id" :value="respuesta.correcta">{{respuesta.texto}} 
              </b-form-radio>
            </b-form-group>
          </b-col>
        </b-row>
        <br>
        <b-row>
          <b-col offset-md="4" md="3">
            <b-button size="md" @click.prevent="$router.push('/')" type="button" class="btn btn-danger">Volver a los Puntajes</b-button>
          </b-col>
          <b-col md="2">
            <b-button size="md" type="submit" class="btn btn-success">Enviar Trivia</b-button>  
          </b-col>
        </b-row>
        <br>
        <br>
      </b-form>
    <b-modal no-close-on-esc no-close-on-backdrop hide-header-close ref="my-modal" hide-footer title="Resultado">
      <p class="my-4">Gracias por jugar {{user.name}}, obtuviste {{puntos}} acierto(s) </p>
      <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Ok, ir al inicio</b-button> 
    </b-modal>
  </b-container>
</template>

<script>
import { db } from '../firebase'; 
import firebase from 'firebase/app'; 

export default {
  data() {
    return {
      valor: [],
      elegido:{},
      puntos:0,
      porcentaje:0
    }
  },
  firestore() { 
    return {
      trivia: db.collection('trivia')
    }
  },
  computed: {
    user(){
      return this.$store.state.user;
    },
    triviaDesordenada(){
      //desordena preguntas
      let preguntas = [...this.trivia]
      preguntas.sort(() => 0.5 - Math.random());
      //desordena alternativas
      preguntas.forEach(p => {
        p.respuestas.sort(() => 0.5 - Math.random());
      });
      return preguntas;
    }
  },
  

  methods: {
    
    cambio(respuesta, id_pregunta){
      this.elegido[id_pregunta] = respuesta;
      
    },

    enviarTrivia(){
      for (let propiedad in this.elegido){
        if( this.elegido[propiedad] == true){
          this.puntos=this.puntos + 1;
        }
      }
      if(this.puntos == 0){
        this.porcentaje = '0 %'
      }
      else if(this.puntos == 1){
        this.porcentaje = '33 %'
      }
      else if(this.puntos == 2){
        this.porcentaje = '66.7 %'
      }
      else if(this.puntos == 3){
        this.porcentaje = '100 %'
      }
      let fecha = new Date(); 
      let fecha_larga = fecha.toLocaleDateString();
      let hora_exacta = (fecha.getHours() + ":" + fecha.getMinutes());
      const user = firebase.auth().currentUser
      db.collection("puntajes_trivia").add({
        jugador: user.displayName,
        porcentaje: this.porcentaje,
        puntos: this.puntos,  
        fecha: `${fecha_larga}  (${hora_exacta} hrs )`
      });
      console.log(this.puntos);
      console.log(this.porcentaje);
      this.$refs['my-modal'].show(); 
    },

    toggleModal(){
      this.$router.push('/');
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h4{
  text-align: left;
}

.b-form-radio{
  text-align: right;

}

h2 {
  text-align: center;
  
}

span{
  font-weight: bold;
}

.post_header{
position: relative;
content: "";
width: 100px;
margin: 0 auto;
margin-top: 10px;
border: 2px solid #151e2d;
display: block;
}
</style>