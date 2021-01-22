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
            createdAt !== updatedAt
              ? 'Créé le ' + createdAt
              : 'Modifié le ' + updatedAt
          }}</small></span
        ><span v-if="userIdState == commentUserId || isAdminState"
          ><a class="d-inline-block mr-2"><b-icon-pencil></b-icon-pencil></a
          ><a class="d-inline-block"><b-icon-trash></b-icon-trash></a></span
        >
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Comment',
  computed: {
    ...mapState(['userIdState', 'isAdminState'])
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
