<template>
  <b-sidebar id="sidebar-1" title="Liste des utilisateurs" shadow>
    <div class="px-3 py-2">
      <b-list-group style="max-width: 300px;">
        <b-list-group-item v-for="(user, index) in users" :key="index">
          <router-link
            class="d-flex align-items-center mb-2"
            :to="'/profile/' + user.userId"
            title="Profil"
          >
            <b-avatar
              v-if="user.imageUrl"
              :src="'http://localhost:3000/images/' + user.imageUrl"
              class="mr-3"
            ></b-avatar>
            <b-avatar v-else class="mr-3"></b-avatar>
            <span class="mr-auto">{{ user.username }}</span>
            <b-icon
              v-if="user.isAdmin"
              icon="award-fill"
              variant="warning"
            ></b-icon>
            <b-icon
              v-if="user.userId == userIdState"
              icon="house-fill"
              variant="success"
            ></b-icon>
          </router-link>
        </b-list-group-item>
      </b-list-group>
    </div>
  </b-sidebar>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'Userlist',
  data () {
    return {
      users: []
    }
  },
  computed: {
    ...mapState(['userIdState', 'isAdminState'])
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
<style lang=""></style>
