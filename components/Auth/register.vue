<template>
  <div id="app">
    <form>
      <div class="input-group form-group">
        <div class="input-group-prepend">
          <span class="input-group-text"><i class="fas fa-user"></i></span>
        </div>
        <input type="text" class="form-control" v-model.trim="signupForm.name" placeholder="name">
        
      </div>
      <div class="input-group form-group">
        <div class="input-group-prepend">
          <span class="input-group-text"><i class="fas fa-user"></i></span>
        </div>
        <input type="text" class="form-control" v-model.trim="signupForm.email" placeholder="email">
        
      </div>
      <div class="input-group form-group">
        <div class="input-group-prepend">
          <span class="input-group-text"><i class="fas fa-key"></i></span>
        </div>
        <input type="password" class="form-control" v-model.trim="signupForm.password" placeholder="password">
      </div>
      <div class="form-group">
        <input type="button" value="Register" v-on:click="signup" class="btn float-right login_btn">
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'comp-register',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      signupForm: {
        name: '',
        title: '',
        email: '',
        password: ''
      }
    }
  },
  components: {
  },
  methods: {
    signup() {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        title: this.signupForm.title
      })
    }
  }
}
</script>

<style>
  html, body {
    height: 100%;
    width: 100%;
    background-color: #b7b7b7;
  }
</style>
