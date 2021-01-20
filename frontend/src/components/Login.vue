<template>
  <div class="d-flex justify-content-center">
    <form class="card m-3 p-4 w-75">
      <h3>Connexion :</h3>
      <div class="row-form mt-2">
        <label for="email-login">Email :</label>
        <input
          class="form-control"
          id="email-login"
          placeholder="Email"
          type="email"
          v-model="formData.emailLogin"
        />
      </div>
      <div class="row-form mt-2">
        <label for="password-login">Mot de passe :</label>
        <input
          class="form-control"
          id="password-login"
          placeholder="Mot de passe"
          type="password"
          v-model="formData.passwordLogin"
        />
      </div>
      <div class="row-form mt-2">
        <div v-show="loginSuccess" class="alert alert-danger text-center">
          {{ error }}
        </div>
      </div>
      <div>
        <button
          class="btn btn-primary mt-3"
          type="submit"
          v-on:click.prevent="submitLogin"
        >
          Se connecter
        </button>
      </div>
    </form>
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
    submitLogin: function () {
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
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
            this.error = error.response.data.error
            this.loginSuccess = true
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message)
            console.log('test')
          }
          console.log(error.config)
        })
    }
  }
}
</script>
