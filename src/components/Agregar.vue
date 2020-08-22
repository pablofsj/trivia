<template>
  <b-container>
    <h2>Agregar pregunta a la Trivia</h2>
    <h2 class="post_header"></h2>
    <br>
    <br>
    <br>
      <b-form @submit.prevent="agregarTrivia">
        <b-row>
          <br>
          <br>
          <br>
          <b-col md="12" sm="12">
            <b-form-group>
              <b-form-textarea
                id="textarea"
                maxlength="60"
                v-model="pregunta"
                required=""
                placeholder="Ingresa tu pregunta ..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
            <br>
            <b-form-group id="input-group-2" label="Respuesta Correcta" >
              <b-form-input
                id="input-2"
                v-model="respuesta_correcta"
                required
                maxlength="30"
              ></b-form-input>
            </b-form-group>
            <br>
            <b-form-group id="input-group-2" label="Respuesta Incorrecta 1" >
              <b-form-input
                id="input-2"
                v-model="respuesta_incorrecta_1"
                required
                maxlength="30"
              ></b-form-input>
            </b-form-group>
            <br>
            <b-form-group id="input-group-2" label="Respuesta Incorrecta 2" >
              <b-form-input
                id="input-2"
                v-model="respuesta_incorrecta_2"
                required
                maxlength="30"
              ></b-form-input>
            </b-form-group>
            <br>
            <b-form-group id="input-group-2" label="Respuesta Incorrecta 3" >
              <b-form-input
                id="input-2"
                v-model="respuesta_incorrecta_3"
                required
                maxlength="30"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <br>
        <b-row>
          <b-col offset-md="4" md="3">
            <b-button size="md" @click.prevent="$router.push('/')" type="button" class="btn btn-danger">Volver a los Puntajes</b-button>
          </b-col>
          <b-col md="2">
            <b-button size="md" type="submit" class="btn btn-success">Agregar Pregunta</b-button>  
          </b-col>
        </b-row>
        <br>
        <br>
      </b-form>
  </b-container>
</template>

<script>
import { db } from '../firebase'; 

 


export default {
  data() {
    return {
      pregunta:"",
      respuesta_correcta:"",
      respuesta_incorrecta_1:"",
      respuesta_incorrecta_2:"",
      respuesta_incorrecta_3:"",
    }
  },
  firestore() { 
    return {
      trivia: db.collection('trivia').limit(3)
    }
  },
  computed: {
    user(){
      return this.$store.state.user;
    }
  },
  methods: {
    agregarTrivia(){
      let respuestas = [
        {correcta: true, texto: this.respuesta_correcta},
        {correcta: false, texto: this.respuesta_incorrecta_1},
        {correcta: false, texto: this.respuesta_incorrecta_2},
        {correcta: false, texto: this.respuesta_incorrecta_3},
      ]
      db.collection("trivia").add({
        pregunta: this.pregunta,
        respuestas: respuestas
      });
      this.$router.push('/');
 
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

span{
  font-weight: bold;
}

h2{
  text-align: center;
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