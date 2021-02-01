<template>
  <div class="background-color">
    <Header></Header>
    <Userlist></Userlist>
    <div class="container">
      <ProfileWrite
        v-if="
          isAdminState || userIdState == idParam
        " :idParam="idParam"
      ></ProfileWrite>
      <ProfileRead v-else :idParam="idParam"></ProfileRead>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Userlist from '@/components/Userlist.vue'
import ProfileRead from '@/components/ProfileRead.vue'
import ProfileWrite from '@/components/ProfileWrite.vue'
import { mapState } from 'vuex'

export default {
  name: 'Profile',
  data () {
    return {
      idParam: ''
    }
  },
  components: {
    Header,
    Userlist,
    ProfileRead,
    ProfileWrite
  },
  watch: {
    $route (to, from) {
      this.idParam = to.params.userId
    }
  },
  mounted () {
    this.idParam = this.$router.currentRoute.params.userId
  },
  computed: {
    ...mapState(['userIdState', 'isAdminState'])
  }
}
</script>
<style>
.background-color {
  background-color: rgb(252, 244, 245);
  height: 100%;
}
</style>
