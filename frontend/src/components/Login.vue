<template>
  <div>
    <b-card class="mt-5">
      <b-card-body>
        <b-card-title><h4>Connexion :</h4></b-card-title>
        <b-row>
          <b-col>
            <b-row class="my-3">
              <b-col sm="3">
                <label>Adresse email :</label>
              </b-col>
              <b-col sm="7">
                <b-form-input
                  v-model="formData.emailLogin"
                  :state="null"
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-3">
              <b-col sm="3">
                <label>Mot de passe :</label>
              </b-col>
              <b-col sm="7">
                <b-form-input
                  v-model="formData.passwordLogin"
                  :state="null"
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-3">
              <b-col md="3" class="alert alert-danger text-center" offset-md="5" v-show="loginSuccess">{{
                error
              }}</b-col>
            </b-row>

            <b-row class="m-2">
              <b-button @click="submitLogin()">Connexion</b-button>
            </b-row>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>
<script>
import axios from 'axios'
import router from '../router'

export default {
  name: 'Login',
  data () {
    return {
      formData: {
        emailLogin: '',
        passwordLogin: ''
      },
      loginSuccess: false,
      error: ''
    }
  },
  methods: {
    submitLogin () {
      axios
        .post('http://localhost:3000/api/users/login', {
          email: this.formData.emailLogin,
          password: this.formData.passwordLogin
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
