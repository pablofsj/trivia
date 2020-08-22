import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase/app';
import 'firebase/auth';
import VueFirestore from 'vue-firestore'; 
import './firebase.js'


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


// import 'materialize-css';
// import 'materialize-css/dist/css/materialize.min.css';
import App from './App.vue'
import router from './router';





Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueFirestore, {key: 'id'});    


const store = new Vuex.Store({
  state: {
    user: null,
    error: null
  },

  mutations: {

    set_user(state, new_user) {
      state.user = new_user;
    },

    set_error(state, new_error) {
      state.error = new_error;
    }
  },
  actions: {
    register(context, datos) {
      firebase.auth().createUserWithEmailAndPassword(datos.email, datos.password)
      .then(function (response) {
        console.log(response);
        // registro exitoso, agrego nombre e imagen perfil
        firebase.auth().currentUser.updateProfile({
          displayName: datos.name,
          photoURL: datos.imageurl
        })
      })
      .then((response) =>{
        //guardamos nuestros datos en almacen
        console.log(response);
        // Llamamos a la mutacion
        context.commit('set_error', null);
        context.commit('set_user', {email: datos.email, name: datos.name, imageurl: datos.imageurl});
        router.push('/');
  
      })
      .catch(function (error) {
        // Llamamos a la mutacion
        context.commit('set_error', error.message);
        context.commit('set_user', null);
      });
    },

    login(context, datos) {
      firebase.auth().signInWithEmailAndPassword(datos.email, datos.password)
      .then(function (response) {
        console.log(response.user);
        // Llamamos a la mutacion
        context.commit('set_error', null);
        //context.commit('set_user', datos.email);
        context.commit('set_user', {email: response.user.email, name: response.user.displayName, imageurl: response.user.photoURL});
        
        router.push('/');
       
      })
      .catch(function (error) {
        console.log(error);
        // Llamamos a la mutacion
        context.commit('set_error', error.message);
        context.commit('set_user', null);
      });
    },

    logout(context){
      firebase.auth().signOut()
      .then(()=>{
        context.commit('set_error', null);
        context.commit('set_user', null);
        router.push('/auth');


      })
    }
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
