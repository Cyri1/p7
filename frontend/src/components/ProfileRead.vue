<template lang="">
  <div>
    <b-card class="mt-5">
      <b-card-body>
        <b-card-title><h4>Profil utilisateur :</h4></b-card-title>
        <b-row>
          <b-col>
            <b-card-sub-title class="my-3"
              >Informations personnelles :</b-card-sub-title
            >

            <b-row class="my-1">
              <b-col sm="3">
                <label>Prénom :</label>
              </b-col>
              <b-col sm="9">
                <span class="text-muted">{{ user.firstname }}</span>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="3">
                <label>Nom :</label>
              </b-col>
              <b-col sm="9">
                <span class="text-muted">{{ user.lastname }}</span>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="3">
                <label>Nom d'utilisateur :</label>
              </b-col>
              <b-col sm="9">
                <span class="text-muted">{{ user.username }}</span>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="3">
                <label>Adresse email :</label>
              </b-col>
              <b-col sm="9">
                <span class="text-muted">{{ user.email }}</span>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="3">
                <label>A propos de moi :</label>
              </b-col>
              <b-col sm="9">
                <span class="text-muted">{{ user.bio }}</span>
              </b-col>
            </b-row>
          </b-col>
          <b-col sm="4"
            ><b-img
              v-if="user.imageUrl"
              thumbnail
              fluid
              :src="'http://localhost:3000/images/' + user.imageUrl"
              alt="Image de profil"
              class="mt-5 mb-2 w-100"
            ></b-img>
            <b-icon
              icon="person"
              font-scale="10"
              class="mt-5 mb-2 w-100 text-black-50"
            ></b-icon
          ></b-col>
        </b-row>
        <b-row v-if="posts.length">
          <b-col>
            <b-row>
              <b-card-sub-title class="my-3"
                >Messages postés par l'utilisateur :</b-card-sub-title
              >
            </b-row>

            <b-row v-for="(post, index) in posts" :key="index">
              <b-button
                variant="outline-secondary"
                v-b-toggle="'collapse-' + post.postId"
                class="m-1 btn-block"
                size="sm"
                >{{ post.postTitle }}</b-button
              >

              <b-collapse class="w-100" :id="'collapse-' + post.postId">
                <b-col class="card my-1 py-2">{{ post.postContent }}</b-col>
              </b-collapse>
            </b-row>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>
<script>
export default {
  name: 'ProfileRead',
  props: ['user', 'posts']
}
</script>
<style></style>
