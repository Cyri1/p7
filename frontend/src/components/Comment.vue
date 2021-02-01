<template>
  <div>
    <div class="card mt-2">
      <div class="card-body">
        {{ commentContent }}
      </div>
      <div class="d-flex justify-content-between m-2">
        <span class="d-inline-block m-2"
          ><small>{{ UserUsername }} - </small
          ><small class="text-muted">{{
            'Créé le ' + formatCreatedAt
          }}</small></span
        ><span v-if="userIdState == commentUserId || isAdminState"
          ><a
            class="d-inline-block mr-2"
            v-b-modal="'bv-modal-edit-comment'"
            @click="editComment()"
            ><b-icon-pencil></b-icon-pencil></a
          ><a class="d-inline-block" @click="deleteComment()"
            ><b-icon-trash></b-icon-trash></a
        ></span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import axios from 'axios'
import { bus } from '../main'
import moment from 'moment'

export default {
  name: 'Comment',
  data () {
    return {
      formatCreatedAt: ''
    }
  },
  computed: {
    ...mapState(['userIdState', 'isAdminState'])
  },
  created () {
    moment.locale('fr')
    this.formatCreatedAt = moment(this.createdAt).format('lll')
  },
  methods: {
    deleteComment () {
      this.$bvModal
        .msgBoxConfirm('Etes vous sûr de vouloir supprimer ce commentaire ?', {
          title: 'Veuillez confirmer :',
          buttonSize: 'sm',
          okVariant: 'outline-danger',
          okTitle: 'Oui',
          cancelTitle: 'Annuler',
          footerClass: 'p-2',
          hideHeaderClose: false
        })
        .then(value => {
          if (value) {
            axios
              .delete('http://localhost:3000/api/comments/' + this.commentId, {
                headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('token')
                }
              })
              .then(response => {
                console.log(response)
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
        })
        .catch(err => {
          console.log(err)
        })
    },
    editComment () {
      bus.$emit('editComment', {
        commentId: this.commentId,
        commentContent: this.commentContent
      })
    }
  },
  props: [
    'commentContent',
    'commentId',
    'commentUserId',
    'updatedAt',
    'createdAt',
    'UserImageUrl',
    'UserUsername'
  ]
}
</script>
<style></style>
