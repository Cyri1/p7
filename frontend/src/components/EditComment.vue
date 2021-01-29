<template lang="">
  <ValidationObserver v-slot="{ invalid }">
    <b-modal id="bv-modal-edit-comment" size="lg" hide-footer>
      <template #modal-title>
        <h3>Edition du commentaire :</h3>
      </template>
      <div class="d-block text-center">
        <form @submit.prevent="editComment">
          <b-row class="my-1">
            <b-col sm="2">
              <label for="comment-content-edit">Contenu du commentaire :</label>
            </b-col>
            <b-col sm="10">
              <ValidationProvider
                rules="required|min:1|max:255"
                name="contenu du commentaire"
                v-slot="{ errors }"
              >
                <b-form-textarea
                  rows="3"
                  max-rows="6"
                  v-model="formData.commentContentEdit"
                ></b-form-textarea>
                <small class="text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
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
  name: 'EditComment',
  data () {
    return {
      formData: {
        commentContentEdit: '',
        commentIdEdit: ''
      }
    }
  },
  created () {
    bus.$on('editComment', data => {
      this.formData.commentContentEdit = data.commentContent
      this.formData.commentIdEdit = data.commentId
    })
  },
  methods: {
    editComment () {
      axios
        .put(
          'http://localhost:3000/api/comments/' + this.formData.commentIdEdit,
          { commentContent: this.formData.commentContentEdit },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          }
        )
        .then(response => {
          console.log(response)
          this.formData.commentContentEdit = ''
          this.$bvModal.hide('bv-modal-edit-comment')
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
