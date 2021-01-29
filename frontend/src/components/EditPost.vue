<template lang="">
  <ValidationObserver v-slot="{ invalid }">
    <b-modal id="bv-modal-example" size="lg" hide-footer>
      <template #modal-title>
        <h3>Edition du post :</h3>
      </template>
      <div class="d-block text-center">
        <form @submit.prevent="editPost">
          <b-row class="my-1">
            <b-col sm="2">
              <label for="post-title-edit">Titre du post :</label>
            </b-col>
            <b-col sm="10">
              <ValidationProvider
                rules="required|min:3|max:20"
                name="titre du post"
                v-slot="{ errors }"
              >
                <b-form-input
                  id="post-title-edit"
                  size="sm"
                  v-model="formData.postTitleEdit"
                ></b-form-input>
                <small class="text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="post-content-edit">Contenu du post :</label>
            </b-col>
            <b-col sm="10">
              <ValidationProvider
                rules="required|min:3|max:255"
                name="contenu du post"
                v-slot="{ errors }"
              >
                <b-form-textarea
                  rows="3"
                  max-rows="6"
                  v-model="formData.postContentEdit"
                ></b-form-textarea>
                <small class="text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </b-col>
          </b-row>
          <b-row v-if="formData.postImageUrlEdit" class="my-1">
            <b-img
              :src="formData.postImageUrlEdit"
              fluid
              thumbnail
              center
              alt="image du post (édition)"
            ></b-img>
          </b-row>

          <b-row class="my-1">
            <b-col sm="2">
              <label for="image-edit">Image :</label>
            </b-col>
            <b-col sm="10">
              <b-form-file
                id="image-edit"
                placeholder="Cliquer pour charger une image"
                size="sm"
                accept="image/jpeg, image/png, image/gif"
                ref="file-input-edit"
              ></b-form-file>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-button type="submit" :disabled="invalid" class="mx-3 mt-3"
              >Envoyer</b-button
            >
          </b-row>
        </form>
      </div>
    </b-modal>
  </ValidationObserver>
</template>
<script>
import axios from 'axios'
import { bus } from '../main'

export default {
  name: 'EditPost',
  data () {
    return {
      formData: {
        postTitleEdit: '',
        postContentEdit: '',
        postImageUrlEdit: '',
        postIdEdit: ''
      }
    }
  },
  created () {
    bus.$on('editPost', data => {
      this.formData.postTitleEdit = data.postTitle
      this.formData.postContentEdit = data.postContent
      this.formData.postImageUrlEdit = data.postImageUrl
      this.formData.postIdEdit = data.postId
    })
  },
  methods: {
    editPost () {
      const formData = new FormData()
      formData.append('postTitle', this.formData.postTitleEdit)
      formData.append('postContent', this.formData.postContentEdit)
      formData.append('image', document.getElementById('image-edit').files[0])
      axios
        .put(
          'http://localhost:3000/api/posts/' + this.formData.postIdEdit,
          formData,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        .then(response => {
          console.log(response)
          this.formData.postTitleEdit = ''
          this.formData.postContentEdit = ''
          this.formData.postIdEdit = ''
          this.$refs['file-input-edit'].reset()
          this.$bvModal.hide('bv-modal-example')
          axios
            .get('http://localhost:3000/api/posts', {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
              }
            })
            .then(response => {
              console.log(response)
              bus.$emit('updatePosts', response.data.posts)
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
