<template>
  <div>
    <Header></Header>
    <Userlist></Userlist>
    <div class="container">
      <CreatePost v-on:updatePosts="updatePosts($event)"></CreatePost>
      <Post
        v-on:updatePosts="updatePosts($event)"
        v-for="(post, index) in posts"
        :key="index"
        :createdAt="post.createdAt"
        :postContent="post.postContent"
        :postId="post.postId"
        :postImageUrl="post.postImageUrl"
        :postTitle="post.postTitle"
        :updatedAt="post.updatedAt"
        :postUserId="post.User.userId"
        :postUserImageUrl="post.User.ImageUrl"
        :postUserUsername="post.User.username"
        :comments="post.Comments"
        :likes="post.Likes"
      ></Post>
      <EditPost></EditPost>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Post from '@/components/Post.vue'
import Userlist from '@/components/Userlist.vue'
import CreatePost from '@/components/CreatePost.vue'
import EditPost from '@/components/EditPost.vue'
import axios from 'axios'
import { bus } from '../main'

export default {
  name: 'Wall',
  components: {
    Header,
    Post,
    CreatePost,
    Userlist,
    EditPost
  },
  data () {
    return {
      posts: []
    }
  },
  methods: {
    updatePosts (event) {
      console.log(event)
      this.posts = event
    }
  },
  created () {
    bus.$on('updatePosts', data => {
      this.posts = data
    })
  },
  mounted () {
    axios
      .get('http://localhost:3000/api/posts', {
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
</script>
<style></style>
