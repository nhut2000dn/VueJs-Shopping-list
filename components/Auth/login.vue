<template>
  <div id="app">
    <form>
      <div class="input-group form-group">
        <div class="input-group-prepend">
          <span class="input-group-text"><i class="fas fa-user"></i></span>
        </div>
        <input type="text" class="form-control" v-model.trim="loginForm.email" placeholder="username">
        
      </div>
      <div class="input-group form-group">
        <div class="input-group-prepend">
          <span class="input-group-text"><i class="fas fa-key"></i></span>
        </div>
        <input type="password" class="form-control" v-model.trim="loginForm.password" placeholder="password">
      </div>
      <div class="row align-items-center remember">
        <input type="checkbox">Remember Me
      </div>
      <div class="form-group">
        <input type="button" value="Login" @click="login()" class="btn float-right login_btn">
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'comp-login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  components: {
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password,
      });
    }
  }
}
</script>

<style>

</style>
