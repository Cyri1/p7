<template lang="">
  <ValidationObserver v-slot="{ invalid }">
    <form @submit.prevent="updateProfile">
      <div>
        <b-card class="mt-5">
          <b-card-body>
            <b-card-title><h4>Profil utilisateur :</h4></b-card-title>
            <b-row>
              <b-col>
                <b-card-sub-title class="my-3"
                  >Informations personnelles :</b-card-sub-title
                >

                <b-row class="my-1">
                  <b-col sm="3">
                    <label>Prénom :</label>
                  </b-col>
                  <b-col sm="9">
                    <ValidationProvider
                      rules="required|min:2|max:20"
                      name="prénom"
                      v-slot="{ errors }"
                    >
                      <b-form-input
                        v-model="formData.firstname"
                        type="text"
                      ></b-form-input>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="3">
                    <label>Nom :</label>
                  </b-col>
                  <b-col sm="9">
                    <ValidationProvider
                      rules="required|min:2|max:20"
                      name="nom"
                      v-slot="{ errors }"
                    >
                      <b-form-input v-model="formData.lastname"></b-form-input>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="3">
                    <label>Nom d'utilisateur :</label>
                  </b-col>
                  <b-col sm="9">
                    <ValidationProvider
                      rules="required|min:2|max:20"
                      name="nom d'utilisateur"
                      v-slot="{ errors }"
                    >
                      <b-form-input v-model="formData.username"></b-form-input>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </b-col>
                </b-row>

                <b-row class="my-1">
                  <b-col sm="3">
                    <label>Adresse email :</label>
                  </b-col>
                  <b-col sm="9">
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

                <b-row class="my-1">
                  <b-col sm="3">
                    <label>A propos de moi :</label>
                  </b-col>
                  <b-col sm="9">
                    <ValidationProvider
                      rules="min:2|max:255"
                      name="à propos de moi"
                      v-slot="{ errors }"
                    >
                      <b-form-textarea
                        rows="3"
                        max-rows="6"
                        v-model="formData.bio"
                      ></b-form-textarea>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </b-col>
                </b-row>

                <b-row class="m-2 mt-5" align-v="end">
                  <b-button type="submit" :disabled="invalid" class="mr-2"
                    >Modifier</b-button
                  ><b-button @click="deleteUser()" variant="outline-danger"
                    >Supprimer le compte</b-button
                  >
                </b-row>
              </b-col>
              <b-col sm="4"
                ><b-img
                  v-if="formData.imageUrl"
                  thumbnail
                  fluid
                  :src="'http://localhost:3000/images/' + formData.imageUrl"
                  alt="Image de profil"
                  class="mt-5 mb-2 w-100 d-block"
                ></b-img>
                <b-icon
                  v-else
                  icon="person"
                  font-scale="10"
                  class="mt-5 mb-2 w-100 text-black-50 d-block"
                ></b-icon>
                <ValidationProvider
                  rules="ext:jpg,png,gif,jpeg"
                  name="image de profil"
                  v-slot="{ errors, validate }"
                >
                  <b-form-file
                    @change="validate"
                    id="image"
                    placeholder="Image de profil"
                    size="sm"
                    accept="image/jpeg, image/png, image/gif"
                  ></b-form-file>
                  <small class="text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </b-col>
            </b-row>
            <b-row v-if="posts.length">
              <b-col>
                <b-row>
                  <b-card-sub-title class="my-3"
                    >Messages postés par l'utilisateur :</b-card-sub-title
                  >
                </b-row>

                <b-row v-for="(post, index) in posts" :key="index">
                  <b-button
                    variant="outline-secondary"
                    v-b-toggle="'collapse-' + post.postId"
                    class="m-1 btn-block"
                    size="sm"
                    >{{ post.postTitle }}</b-button
                  >

                  <b-collapse class="w-100" :id="'collapse-' + post.postId">
                    <b-col class="card my-1 py-2">{{ post.postContent }}</b-col>
                  </b-collapse>
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
  name: 'ProfileWrite',
  data () {
    return {
      formData: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        bio: ' ',
        isMe: '',
        imageUrl: ''
      },
      posts: [],
      idParam: ''
    }
  },
  mounted () {
    this.idParam = this.$router.currentRoute.params.userId
    this.getUserInfos()
    this.getUserPosts()
  },
  watch: {
    $route (to, from) {
      this.idParam = to.params.userId
      this.getUserInfos()
      this.getUserPosts()
    }
  },
  methods: {
    getUserInfos () {
      axios
        .get('http://localhost:3000/api/users/' + this.idParam, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(response => {
          console.log(response)
          this.formData.firstname = response.data.firstname
          this.formData.lastname = response.data.lastname
          this.formData.username = response.data.username
          this.formData.email = response.data.email
          this.formData.bio = response.data.bio
          this.formData.isMe = response.data.isMe
          this.formData.imageUrl = response.data.imageUrl
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response)
          } else if (error.request) {
            console.log(error.request)
          } else {
            console.log('Error', error.message)
          }
          console.log(error.config)
        })
    },
    getUserPosts () {
      axios
        .get('http://localhost:3000/api/users/' + this.idParam + '/posts', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(response => {
          console.log(response)
          this.posts = response.data.posts
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response)
          } else if (error.request) {
            console.log(error.request)
          } else {
            console.log('Error', error.message)
          }
          console.log(error.config)
        })
    },

    updateProfile () {
      const formData = new FormData()
      formData.append('firstname', this.formData.firstname)
      formData.append('lastname', this.formData.lastname)
      formData.append('username', this.formData.username)
      formData.append('email', this.formData.email)
      formData.append('bio', this.formData.bio)
      formData.append('image', document.getElementById('image').files[0])

      axios
        .put('http://localhost:3000/api/users/' + this.idParam, formData, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          this.getUserInfos()
          console.log(response)
          this.$bvModal.msgBoxConfirm('Utilisateur modifié avec succès.', {
            title: 'Mise à jour des infos utilisateur',
            buttonSize: 'sm',
            okVariant: 'outline-success',
            okTitle: 'OK',
            footerClass: 'p-2'
          })
        })
        .catch(error => {
          if (error.response) {
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
    deleteUser () {
      this.$bvModal
        .msgBoxConfirm(
          `Etes vous sûr de vouloir supprimer l'utilisateur ${this.formData.username} ?`,
          {
            title: 'Veuillez confirmer :',
            buttonSize: 'sm',
            okVariant: 'outline-danger',
            okTitle: 'Oui',
            cancelTitle: 'Annuler',
            footerClass: 'p-2',
            hideHeaderClose: false
          }
        )
        .then(value => {
          if (value) {
            axios
              .delete('http://localhost:3000/api/users/' + this.idParam, {
                headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('token')
                }
              })
              .then(response => {
                console.log(response)
                if (this.formData.isMe) {
                  router.push('../')
                  window.localStorage.removeItem('token')
                } else {
                  router.push('../wall')
                }
              })
              .catch(error => {
                if (error.response) {
                  console.log(error.response)
                  this.error = error.response.data.error
                } else if (error.request) {
                  console.log(error.request)
                } else {
                  console.log('Error', error.message)
                }
                console.log(error.config)
              })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang=""></style>
