<template>
  <ValidationObserver v-slot="{ invalid }">
    <form @submit.prevent="submitLogin">
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
                    <ValidationProvider
                      rules="required|email"
                      name="adresse email"
                      v-slot="{ errors }"
                    >
                      <b-form-input
                        v-model="formData.emailLogin"
                        type="email"
                      ></b-form-input>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </b-col>
                </b-row>

                <b-row class="my-3">
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
                        v-model="formData.passwordLogin"
                        type="password"
                      ></b-form-input>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </b-col>
                </b-row>
                <b-row class="my-3">
                  <b-col
                    md="3"
                    class="alert alert-danger text-center"
                    offset-md="5"
                    v-show="loginSuccess"
                    >{{ error }}</b-col
                  >
                </b-row>
                <b-row class="m-2">
                  <b-button type="submit" :disabled="invalid"
                    >Connexion</b-button
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
