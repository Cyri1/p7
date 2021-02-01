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
                <span class="text-muted">{{ formData.firstname }}</span>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="3">
                <label>Nom :</label>
              </b-col>
              <b-col sm="9">
                <span class="text-muted">{{ formData.lastname }}</span>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="3">
                <label>Nom d'utilisateur :</label>
              </b-col>
              <b-col sm="9">
                <span class="text-muted">{{ formData.username }}</span>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="3">
                <label>Adresse email :</label>
              </b-col>
              <b-col sm="9">
                <span class="text-muted">{{ formData.email }}</span>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="3">
                <label>A propos de moi :</label>
              </b-col>
              <b-col sm="9">
                <span class="text-muted">{{ formData.bio }}</span>
              </b-col>
            </b-row>
          </b-col>
          <b-col sm="4"
            ><b-img
              v-if="formData.imageUrl"
              thumbnail
              fluid
              :src="'http://localhost:3000/images/' + formData.imageUrl"
              alt="Image de profil"
              class="mt-5 mb-2 w-100"
            ></b-img>
            <b-icon
              v-else
              icon="person"
              font-scale="10"
              class="mt-5 mb-2 w-100 text-black-50"
            ></b-icon
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
                <b-col class="card my-1 py-2">
                  <b-row v-if="post.postImageUrl" class="my-1">
                    <b-img
                      :src="'http://localhost:3000/images/' + post.postImageUrl"
                      fluid
                      thumbnail
                      center
                      alt="image du post (édition)"
                    ></b-img>
                  </b-row>
                  <b-row class="m-3">{{ post.postContent }}</b-row>
                </b-col>
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
  name: 'ProfileRead',
  data () {
    return {
      formData: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        bio: '',
        imageUrl: ''
      },
      posts: [],
      idParam: ''
    }
  },
  mounted () {
    console.log(this.posts)
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
    }
  }
}
</script>
<style></style>
