<template lang="">
  <div>
    <div class="card my-3">
      <div class="card-header">
        <h5>Titre du post</h5>
      </div>
      <div class="card-body">
        <img
          src="https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          class="card-img-top img-resize rounded mx-auto d-block"
          alt="post image"
        />
        <p class="card-text mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          minima tenetur esse et sapiente delectus sed, animi enim, est fugiat
          iste quidem earum aspernatur debitis voluptas tempore quibusdam
          blanditiis ea, doloremque vero quam nemo exercitationem unde. Nulla
          vitae voluptatem deleniti, obcaecati laborum maxime assumenda soluta
          molestiae suscipit, tempore, earum error.
        </p>
      </div>
      <div class="d-flex justify-content-between m-2">
          <small class="text-muted d-inline-block">Last updated 3 mins ago</small><small class="d-inline-block">Auteur</small>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Post'
}
</script>
<style>
.img-resize {
  max-width: 500px;
}
</style>
