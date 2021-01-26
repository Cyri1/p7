<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand
        ><router-link to="/wall"
          ><h1>Groupomania</h1></router-link
        ></b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav v-show="isLogged()" class="ml-auto">
          <b-nav-item class="border rounded-pill mx-3" href="#" v-b-toggle.sidebar-1
            ><b-icon icon="people-fill" variant="secondary"></b-icon> Liste des
            utilisateurs</b-nav-item
          >
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ usernameState }}</em>
            </template>
            <b-dropdown-item href="#"
              ><router-link :to="'/profile/' + userIdState">
                <b-icon icon="person-fill" variant="secondary"></b-icon> Mon
                Profil</router-link
              ></b-dropdown-item
            >
            <b-dropdown-item href="#"
              ><router-link :to="'/'"
                ><span @click="logout()"
                  ><b-icon icon="box-arrow-left" variant="secondary"></b-icon>
                  Se déconnecter</span
                ></router-link
              ></b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  methods: {
    logout () {
      window.localStorage.removeItem('token')
    },
    isLogged () {
      return !!localStorage.getItem('token')
    }
  },
  computed: {
    ...mapState(['usernameState', 'userIdState'])
  }
}
</script>
<style></style>
