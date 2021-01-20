<template>
  <div>
    <Header></Header>
    <div class="justify-content-center container mt-2">
        <b-tabs content-class="mt-3">
          <b-tab active title="Se connecter">
            <Login></Login>
          </b-tab>
          <b-tab title="Créer un compte">
            <Register></Register>
          </b-tab>
        </b-tabs>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Login,
    Register
  }
}
</script>
