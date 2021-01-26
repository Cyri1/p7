<template>
  <div>
    <b-card class="mt-5">
      <b-card-body>
        <b-card-title><h4>Créer un compte :</h4></b-card-title>
        <b-row>
          <b-col>
            <b-row class="my-2">
              <b-col sm="3">
                <label>Prénom :</label>
              </b-col>
              <b-col sm="7">
                <b-form-input
                  v-model="formData.firstname"
                  :state="null"
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-2">
              <b-col sm="3">
                <label>Nom :</label>
              </b-col>
              <b-col sm="7">
                <b-form-input
                  v-model="formData.lastname"
                  :state="null"
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-2">
              <b-col sm="3">
                <label>Nom d'utilisateur :</label>
              </b-col>
              <b-col sm="7">
                <b-form-input
                  v-model="formData.username"
                  :state="null"
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-2">
              <b-col sm="3">
                <label>Adresse email :</label>
              </b-col>
              <b-col sm="7">
                <b-form-input
                  v-model="formData.email"
                  :state="null"
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-2">
              <b-col sm="3">
                <label>A propos de moi :</label>
              </b-col>
              <b-col sm="7">
                <b-form-textarea rows="3" max-rows="6"></b-form-textarea>
              </b-col>
            </b-row>

            <b-row class="my-2">
              <b-col sm="3">
                <label>Image de profil :</label>
              </b-col>
              <b-col sm="7">
                <b-form-file
                  placeholder="Image de profil"
                  size="sm"
                  accept="image/jpeg, image/png, image/gif"
                ></b-form-file>
              </b-col>
            </b-row>

            <b-row class="m-2">
              <b-button @click="register()">Envoyer</b-button>
            </b-row>

          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data () {
    return {
      formData: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        bio: ''
      }
    }
  }
}
</script>
