<template>
  <div class="container">
    <div class="row">
      <div id="error_panel" class="col-md-12 col-sm-12" v-if="error">
        <b-alert show variant="danger">{{error}}</b-alert>
      </div>
      <div class="col-md-6 col-sm-12">
        <b-form @submit.prevent="register">
          <h3>Registro</h3>
          <h3 class="post_header"></h3>
          <br>
          <br>
          <b-form-group id="input-group-1" label="Nombre" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="register_name"
              type='text'
              required class="validate"
              maxlength="30"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Correo" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="register_email"
              type="email"
              required class="validate"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-3" label="Password" label-for="input-2">
            <b-form-input
              id="input-3"
              v-model="register_password"
              type='password'
              required class="validate"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-4" label="Confirmar Password" label-for="input-2">
            <b-form-input
              id="confirm_pass"
              v-model="register_confirm_password"
              type='password'
              required class="validate"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-4" label="Imagen de perfil (URL)" label-for="input-2">
            <b-form-input
              placeholder="La URL debe finalizar en .jpeg, .jpg, .gif o .png"
              id="url_imagen"
              v-model="register_url_image"
              type='url'
              required class="validate"
            ></b-form-input>
          </b-form-group>
          <b-button class="boton" type="submit" variant="primary">Registrar</b-button> 
        </b-form>
      </div>
      <div class="col-md-6 col-sm-12">
        <b-form @submit.prevent="login">
          <h3>Login</h3>
          <h3 class="post_header"></h3>
          <br>
          <br>
          <b-form-group id="input-group-1" label="Email" label-for="input-1">
            <b-form-input
              v-model="login_email"
              type='email'
              required class="validate"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Password" label-for="input-2">
            <b-form-input
              v-model="login_password"
              type="password"
              required class="validate"
            ></b-form-input>
          </b-form-group>
          <b-button id="boton" type="submit" variant="primary">Entrar</b-button> 
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Auth',
  data(){
    return{
      register_name:'',
      register_email: '',
      register_password: '',
      register_confirm_password: '',
      register_url_image:'',
      login_email:'',
      login_password:''
    }
  },
  computed:{
    error(){
      return this.$store.state.error
    }

  },

  methods:{
    login(){
      console.log('llegue a login');
      this.$store.dispatch('login', {email: this.login_email, password: this.login_password})

    },

    register(){
      const confirm_pass = document.getElementById('confirm_pass');
      confirm_pass.setCustomValidity('') ;

      if ( this.register_password != this.register_confirm_password) {
        confirm_pass.setCustomValidity('Ambas contraseñas deben coincidir') ;
        return;
      }
      
      if (this.register_url_image.match(/\.(jpeg|jpg|gif|png)$/) == null) {
        this.register_url_image = 'https://frantchurch.org/images/content/2433/809193.png'

      }

      // Luego de validar, ahora se puede hacer registro del usuario mediante la accion que corresponde
      const datos = {
        name: this.register_name,
        email: this.register_email, 
        password: this.register_password,
        
        imageurl: this.register_url_image
      };
      
      this.$store.dispatch('register', datos)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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


ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#error_panel{
  font-weight: bold;
  font-size: 2rem;
}


</style>
