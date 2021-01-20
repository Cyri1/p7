<template>
  <div class="d-flex justify-content-center">
    <form class="card m-3 p-4 w-75">
      <h3>Créer un compte :</h3>
      <div class="row-form mt-2">
        <label for="email">Email :</label>
        <input class="form-control" id="email" placeholder="email" type="email" />
      </div>
      <div class="row-form mt-2">
        <label for="password">Mot de passe :</label>
        <input class="form-control" id="password" placeholder="Mot de passe" type="password" />
      </div>
      <div class="row-form mt-2">
        <label for="firstname">Nom d'utilisateur :</label>
        <input class="form-control" id="username" placeholder="Nom d'utilisateur" type="text" />
      </div>
      <div class="row-form mt-2">
        <label for="firstname">Prénom :</label>
        <input class="form-control" id="firstname" placeholder="Prénom" type="text" />
      </div>
      <div class="row-form mt-2">
        <label for="lastname">Nom :</label>
        <input class="form-control" id="lastname" placeholder="Nom" type="text" />
      </div>
      <div>
        <button class="btn btn-primary mt-3" type="submit">Envoyer</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'Register'
}
</script>
