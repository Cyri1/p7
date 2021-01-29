<template lang="">
  <ValidationObserver v-slot="{ invalid }">
    <form @submit.prevent="createPost">
      <div class="card my-3 p-3">
        <h3>Poster un message :</h3>
        <b-row class="my-1">
          <b-col sm="2">
            <label for="post-title">Titre du post :</label>
          </b-col>
          <b-col sm="10">
            <ValidationProvider
              rules="required|min:3|max:20"
              name="titre du post"
              v-slot="{ errors }"
            >
              <b-form-input
                id="post-title"
                size="sm"
                v-model="formData.postTitle"
                type="text"
              ></b-form-input>
              <small class="text-danger">{{ errors[0] }}</small>
            </ValidationProvider>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2">
            <label for="post-content">Contenu du post :</label>
          </b-col>
          <b-col sm="10">
            <ValidationProvider
              rules="required|min:3|max:255"
              name="contenu du post"
              v-slot="{ errors }"
            >
              <b-form-textarea
                rows="3"
                name="contenu"
                max-rows="6"
                v-model="formData.postContent"
                type="text"
              ></b-form-textarea>
              <small class="text-danger">{{ errors[0] }}</small>
            </ValidationProvider>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2">
            <label for="image">Image :</label>
          </b-col>
          <b-col sm="10">
            <ValidationProvider rules="ext:jpg,png,gif,jpeg" name="image du post" v-slot="{ errors, validate }">
              <b-form-file
                @change="validate"
                id="image"
                placeholder="Cliquer pour charger une image"
                size="sm"
                accept="image/jpeg, image/png, image/gif"
                ref="file-input"
              ></b-form-file>
              <small class="text-danger">{{ errors[0] }}</small>
            </ValidationProvider>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-button type="submit" :disabled="invalid" class="mx-3 mt-3"
            >Envoyer</b-button
          >
        </b-row>
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
import axios from 'axios'

export default {
  name: 'CreatePost',
  data () {
    return {
      formData: {
        postTitle: '',
        postContent: ''
      }
    }
  },
  methods: {
    createPost () {
      const formData = new FormData()
      formData.append('postTitle', this.formData.postTitle)
      formData.append('postContent', this.formData.postContent)
      formData.append('image', document.getElementById('image').files[0])

      axios
        .post('http://localhost:3000/api/posts/', formData, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log(response)
          this.formData.postTitle = ''
          this.formData.postContent = ''
          this.$refs['file-input'].reset()

          axios
            .get('http://localhost:3000/api/posts', {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
              }
            })
            .then(response => {
              console.log(response)
              this.$emit('updatePosts', response.data.posts)
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
  }
}
</script>
<style lang=""></style>
