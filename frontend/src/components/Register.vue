<template>
  <ValidationObserver v-slot="{ invalid }">
    <form @submit.prevent="register">
      <div>
        <b-card class="mt-5">
          <b-card-body>
            <b-card-title><h4>Créer un compte :</h4></b-card-title>
            <b-row>
              <b-col>
                <b-row class="my-2">
                  <b-col sm="3">
                    <label>Prénom :</label>
                  </b-col>
                  <b-col sm="7">
                    <ValidationProvider
                      rules="required|min:2|max:20"
                      name="prénom"
                      v-slot="{ errors }"
                    >
                      <b-form-input v-model="formData.firstname" type="text"></b-form-input>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </b-col>
                </b-row>

                <b-row class="my-2">
                  <b-col sm="3">
                    <label>Nom :</label>
                  </b-col>
                  <b-col sm="7">
                    <ValidationProvider
                      rules="required|min:2|max:20"
                      name="nom"
                      v-slot="{ errors }"
                    >
                      <b-form-input v-model="formData.lastname" type="text"></b-form-input>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </b-col>
                </b-row>

                <b-row class="my-2">
                  <b-col sm="3">
                    <label>Nom d'utilisateur :</label>
                  </b-col>
                  <b-col sm="7">
                    <ValidationProvider
                      rules="required|min:2|max:20"
                      name="nom d'utilisateur"
                      v-slot="{ errors }"
                    >
                      <b-form-input v-model="formData.username" type="text"></b-form-input>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </b-col>
                </b-row>

                <b-row class="my-2">
                  <b-col sm="3">
                    <label>Adresse email :</label>
                  </b-col>
                  <b-col sm="7">
                    <ValidationProvider
                      rules="required|email"
                      name="adresse email"
                      v-slot="{ errors }"
                    >
                      <b-form-input
                        v-model="formData.email"
                        type="email"
                      ></b-form-input>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </b-col>
                </b-row>

                <b-row class="my-2">
                  <b-col sm="3">
                    <label>Mot de passe :</label>
                  </b-col>
                  <b-col sm="7">
                    <ValidationProvider
                      rules="required|min:2|max:20"
                      name="mot de passe"
                      v-slot="{ errors }"
                    >
                      <b-form-input
                        v-model="formData.password"
                        type="password"
                      ></b-form-input>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </b-col>
                </b-row>
                <b-row class="m-2">
                  <b-button type="submit" :disabled="invalid">Envoyer</b-button>
                </b-row>
                <b-row class="my-3">
                  <b-col
                    md="3"
                    class="alert alert-danger text-center"
                    offset-md="5"
                    v-show="registerSuccess"
                    >{{ error }}</b-col
                  >
                </b-row>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
import axios from 'axios'
import router from '../router'

export default {
  name: 'Register',
  data () {
    return {
      formData: {
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        email: ''
      },
      registerSuccess: false,
      error: ''
    }
  },
  methods: {
    register () {
      axios
        .post('http://localhost:3000/api/users/signup', {
          firstname: this.formData.firstname,
          lastname: this.formData.lastname,
          username: this.formData.username,
          email: this.formData.email,
          password: this.formData.password
        })
        .then(response => {
          this.submitLogin(this.formData.email, this.formData.password)
          console.log(response)
        })
        .catch(error => {
          if (error.response) {
            this.registerSuccess = true
            console.log(error.response)
            this.error = error.response.data.error
          } else if (error.request) {
            console.log(error.request)
          } else {
            console.log('Error', error.message)
          }
          console.log(error.config)
        })
    },
    submitLogin (email, password) {
      axios
        .post('http://localhost:3000/api/users/login', {
          email: email,
          password: password
        })
        .then(response => {
          this.$store.commit('LOGIN_SUCCESS', response.data)
          window.localStorage.setItem('token', response.data.token)
          router.push('wall')
          console.log(response)
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response)
            this.error = error.response.data.error
            this.loginSuccess = true
          } else if (error.request) {
            console.log(error.request)
          } else {
            console.log('Error', error.message)
          }
          console.log(error.config)
        })
    }
  }
}
</script>
