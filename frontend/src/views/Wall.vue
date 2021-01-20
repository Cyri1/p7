<template>
  <div>
    <Header></Header>
    <div class="container">
        <Post></Post>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Post from '@/components/Post.vue'

export default {
  name: 'Wall',
  components: {
    Header,
    Post
  }
}
</script>
<style></style>
