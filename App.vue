<template>
  <div id="app-vue">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  components: {
  }
}
</script>

<style>
  html,body {
    min-height: max-content;
    background-image: url('http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg');
    background-size: cover;
    background-repeat: no-repeat;
  }

  #app-vue {
    min-height: 100%;
  }
</style>
