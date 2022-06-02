<template>
  <div id="app">
    <h1 class="title">Shopping List 2<i class="fas fa-sign-out-alt btn-sign-out" v-on:click="logout"></i></h1>
  </div>
</template>

<script>
export default {
  name: 'comp-header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    logout() {
      this.$swal.fire(
        'Logout!',
        '',
        'success'
      )
      this.$store.dispatch('logout')
    }
  },
}
</script>

<style>
  .title {
    font-weight: bold;
    text-align: center;
    margin-bottom: 40px;
    color: #c7ffa4;
    margin-bottom: 15px;
  }

  .btn-sign-out {
    color: #ffffff;
    float: right;
    cursor: pointer;
  }

  .btn-sign-out:hover {
    color: rgb(56, 124, 151);
  }
</style>