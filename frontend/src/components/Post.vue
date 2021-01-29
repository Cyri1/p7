<template lang="">
  <div>
    <div class="card my-3">
      <div class="card-header d-flex justify-content-between ">
        <h5 class="d-inline-block">{{ postTitle }}</h5>
        <span v-if="userIdState == postUserId || isAdminState"
          ><a class="d-inline-block mr-2" v-b-modal="'bv-modal-example'" @click="editPost()"
            ><b-icon-pencil></b-icon-pencil></a
          ><a class="d-inline-block" @click="deletePost()"
            ><b-icon-trash></b-icon-trash></a
        ></span>
      </div>
      <div class="card-body">
        <div v-if="postImageUrl" class="img-post">
          <img
            :src="'http://localhost:3000/images/' + postImageUrl"
            class="card-img-top img-resize d-block"
            alt="post image"
          />
          <hr />
        </div>
        <p class="card-text mt-2">
          {{ postContent }}
        </p>
      </div>
      <div class="d-flex justify-content-between m-2">
        <span class="d-inline-block"
          ><button
            v-b-toggle="'post-comment-' + postId"
            class="btn btn-sm btn-outline-secondary mr-2"
          >
            <b-icon font-scale="1.5" icon="chat-text"></b-icon></button
          ><small>{{ postUserUsername }} - </small
          ><small class="text-muted">{{
            createdAt !== updatedAt
              ? 'Créé le ' + createdAt
              : 'Modifié le ' + updatedAt
          }}</small></span
        >
        <a class="d-inline-block">
          <b-badge variant="primary">{{ likes.length }}</b-badge
          ><b-icon
            font-scale="1.5"
            icon="hand-thumbs-up"
            @click="like()"
          ></b-icon>
        </a>
      </div>
      <b-collapse :id="'post-comment-' + postId">
        <CreateComment :postId="postId"></CreateComment>
      </b-collapse>

      <div v-if="comments.length" class="accordion" role="tablist">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
              :class="'btn-sm text-left'"
              block
              v-b-toggle="'accordion-' + postId"
              variant="light"
              >{{ comments.length }} Commentaires :</b-button
            >
          </b-card-header>
          <b-collapse
            :id="'accordion-' + postId"
            accordion="my-accordion"
            role="tabpanel"
          >
            <b-card-body>
              <Comment
                v-for="(comment, index) in comments"
                :key="index"
                :commentContent="comment.commentContent"
                :commentId="comment.commentId"
                :updatedAt="comment.updatedAt"
                :createdAt="comment.createdAt"
                :UserImageUrl="comment.User.imageUrl"
                :UserUsername="comment.User.username"
                :commentUserId="comment.User.userId"
              ></Comment>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    </div>
  </div>
</template>
<script>
import Comment from '@/components/Comment.vue'
import CreateComment from '@/components/CreateComment.vue'
import { mapState } from 'vuex'
import axios from 'axios'
import { bus } from '../main'

export default {
  name: 'Post',
  components: {
    Comment,
    CreateComment
  },
  methods: {
    like () {
      axios
        .post(
          `http://localhost:3000/api/posts/${this.postId}/likes`,
          {},
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          }
        )
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
    },
    deletePost () {
      this.$bvModal
        .msgBoxConfirm('Etes vous sûr de vouloir supprimer ce post ?', {
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
              .delete('http://localhost:3000/api/posts/' + this.postId, {
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
        })
        .catch(err => {
          console.log(err)
        })
    },
    editPost () {
      bus.$emit('editPost', {
        postId: this.postId,
        postContent: this.postContent,
        postTitle: this.postTitle,
        postImageUrl: this.postImageUrl
      })
    }
  },
  computed: {
    ...mapState(['userIdState', 'isAdminState'])
  },
  props: [
    'createdAt',
    'postContent',
    'postId',
    'postImageUrl',
    'postTitle',
    'updatedAt',
    'postUserId',
    'postUserImageUrl',
    'postUserUsername',
    'comments',
    'likes'
  ]
}
</script>
<style>
.img-resize {
  max-height: 400px;
  -o-object-fit: contain;
  object-fit: contain;
}
</style>
