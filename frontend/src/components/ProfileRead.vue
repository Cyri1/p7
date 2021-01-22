<template lang="">
  <div>
    <b-card class="mt-5">
      <b-card-body>
        <b-card-title><h4>Profil utilisateur :</h4></b-card-title>
        <b-row>
          <b-col cols="10">
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
                <span class="text-muted"
                  >{{ user.bio }} Lorem ipsum dolor sit, amet consectetur
                  adipisicing elit. Molestiae nemo beatae cupiditate optio cum
                  id, voluptatibus est recusandae facilis eaque similique dicta
                  tempora impedit laboriosam obcaecati culpa numquam ea.
                  Corrupti, vitae molestias, eligendi maiores quo sint quae
                  doloribus eveniet, animi quasi dignissimos laborum sit tempora
                  cum reprehenderit illo! Debitis, iure.</span
                >
              </b-col>
            </b-row>

            <b-card-sub-title class="my-3"
              >Messages postés par l'utilisateur :</b-card-sub-title
            >

            <div
              v-if="posts.length"
              v-for="(post, index) in posts"
              :key="index"
            >
              <b-button
                variant="outline-secondary"
                v-b-toggle="'collapse-' + post.postId"
                class="m-1 btn-block"
                size="sm"
                >{{ post.postTitle }}</b-button
              >
              <b-collapse :id="'collapse-' + post.postId">
                <b-card>{{ post.postContent }}</b-card>
              </b-collapse>
            </div>
          </b-col>
          <b-col
            ><b-img
              thumbnail
              fluid
              src="https://picsum.photos/250/250/?image=54"
              alt="Image 1"
            ></b-img
          ></b-col>
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
