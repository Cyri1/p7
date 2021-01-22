<template>
  <div>
    <Header></Header>
    <Userlist></Userlist>
    <div class="container">
      <ProfileWrite v-if="isAdminState || user.isMe" :posts="posts"></ProfileWrite>
      <ProfileRead v-else :user="user" :posts="posts"></ProfileRead>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Userlist from '@/components/Userlist.vue'
import ProfileRead from '@/components/ProfileRead.vue'
import ProfileWrite from '@/components/ProfileWrite.vue'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'Profile',
  components: {
    Header,
    Userlist,
    ProfileRead,
    ProfileWrite
  },
  data () {
    return {
      posts: [],
      user: {}
    }
  },
  computed: {
    ...mapState(['userIdState', 'isAdminState'])
  },
  methods: {
    getUserInfos (userId) {
      axios
        .get('http://localhost:3000/api/users/' + userId, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(response => {
          console.log(response)
          this.user = response.data
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
    getUserPosts (userId) {
      axios
        .get('http://localhost:3000/api/users/' + userId + '/posts', {
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
  },
  mounted () {
    this.getUserInfos(this.$route.params.userId)
    this.getUserPosts(this.$route.params.userId)
  },
  beforeRouteUpdate (to, from, next) {
    this.getUserInfos(to.params.userId)
    this.getUserPosts(to.params.userId)
    next()
  }
}
</script>
<style></style>
