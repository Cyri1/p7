<template>
  <div>
    <b-navbar toggleable="lg" type="light" class="shadow-sm" variant="white">
      <b-navbar-brand
        ><router-link to="/wall" class="text-decoration-none">
          <div class="d-flex ">
            <img src="../assets/icon.png" alt="Logo header" /><span
              class="header-text-color ml-2"
              ><h1>Groupomania</h1></span
            >
          </div></router-link
        ></b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav v-show="isLogged()" class="ml-auto">
          <b-nav-item class="my-2" href="#" v-b-toggle.sidebar-1
            ><span class="border rounded-pill m-3 p-2"
              ><b-icon icon="people-fill" variant="secondary"></b-icon> Liste
              des utilisateurs</span
            ></b-nav-item
          >
          <b-nav-item-dropdown right class="mt-2">
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
                  ><b-icon icon="box-arrow-left" variant="secondary"></b-icon> Se déconnecter</span
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
<style>
.header-text-color {
  color: red;
}
</style>
