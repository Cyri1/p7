<template>
  <b-sidebar id="sidebar-1" title="Liste des utilisateurs" shadow>
    <div class="px-3 py-2">
      <b-list-group style="max-width: 300px;">
        <b-list-group-item
          v-for="(user, index) in users"
          :key="index"
          class="d-flex align-items-center mb-2"
        >
          <b-avatar class="mr-3"></b-avatar>
          <span class="mr-auto">{{ user.username }}</span>
        </b-list-group-item>
      </b-list-group>
    </div>
  </b-sidebar>
</template>
<script>
import axios from 'axios'

export default {
  name: 'Userlist',
  data () {
    return {
      users: []
    }
  },
  mounted () {
    axios
      .get('http://localhost:3000/api/users', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(response => {
        console.log(response)
        this.users = response.data
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
        console.log(error.config)
      })
  }
}
</script>
<style lang=""></style>
