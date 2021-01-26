<template lang="">
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
                <b-form-input
                  v-model="formData.firstname"
                  :state="null"
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="3">
                <label>Nom :</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  v-model="formData.lastname"
                  :state="null"
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="3">
                <label>Nom d'utilisateur :</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  v-model="formData.username"
                  :state="null"
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="3">
                <label>Adresse email :</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  v-model="formData.email"
                  :state="null"
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="3">
                <label>A propos de moi :</label>
              </b-col>
              <b-col sm="9">
                <b-form-textarea
                  rows="3"
                  max-rows="6"
                  v-model="formData.bio"
                ></b-form-textarea>
              </b-col>
            </b-row>

            <b-row class="m-2 mt-5" align-v="end">
              <b-button @click="updateProfile()">Envoyer</b-button>
            </b-row>
          </b-col>
          <b-col sm="4"
            ><b-img
              v-if="user.imageUrl"
              thumbnail
              fluid
              :src="'http://localhost:3000/images/' + user.imageUrl"
              alt="Image de profil"
              class="mt-5 mb-2 w-100"
            ></b-img>
            <b-icon
              icon="person"
              font-scale="10"
              class="mt-5 mb-2 w-100 text-black-50"
            ></b-icon>
            <b-form-file
              id="image"
              placeholder="Image de profil"
              size="sm"
              accept="image/jpeg, image/png"
            ></b-form-file
          ></b-col>
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
</template>
<script>
import axios from 'axios'

export default {
  name: 'ProfileWrite',
  data () {
    return {
      formData: {
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        username: this.user.username,
        email: this.user.email,
        bio: this.user.bio,
        imageUrl: this.user.imageUrl
      }
    }
  },
  methods: {
    updateProfile () {
      const formData = new FormData()
      formData.append('firstname', this.formData.firstname)
      formData.append('lastname', this.formData.lastname)
      formData.append('username', this.formData.username)
      formData.append('email', this.formData.email)
      formData.append('bio', this.formData.bio)
      formData.append('image', document.getElementById('image').files[0])

      axios
        .put('http://localhost:3000/api/users/' + this.user.userId, formData, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
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
  },
  props: ['user', 'posts']
}
</script>
<style lang=""></style>
