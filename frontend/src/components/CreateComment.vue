<template lang="">
  <ValidationObserver v-slot="{ invalid }">
    <form @submit.prevent="createComment">
      <div class="my-3 p-3">
        <b-row class="my-1">
          <b-col>
            <ValidationProvider
              rules="required|min:3|max:255"
              name="contenu du commentaire"
              v-slot="{ errors }"
            >
              <b-form-textarea
                rows="3"
                max-rows="6"
                v-model="formData.commentContent"
              ></b-form-textarea>
              <small class="text-danger">{{ errors[0] }}</small>
            </ValidationProvider>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-button type="submit" :disabled="invalid" class="mx-3 mt-3 btn-sm"
            >Envoyer</b-button
          >
        </b-row>
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
import { bus } from '../main'
import axios from 'axios'

export default {
  name: 'CreateComment',
  data () {
    return {
      formData: {
        commentContent: ''
      }
    }
  },
  methods: {
    createComment () {
      axios
        .post(
          `http://localhost:3000/api/posts/${this.postId}/comments`,
          this.formData,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          }
        )
        .then(response => {
          console.log(response)
          this.formData.commentContent = ''
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
  },
  props: ['postId']
}
</script>
<style lang=""></style>
