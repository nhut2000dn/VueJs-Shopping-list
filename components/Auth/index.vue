<template>
  <div id="app-auth">
    <div class="container">
      <div class="d-flex justify-content-center h-100">
        <div class="card">
          <div class="card-header">
            <h3>{{ type ? "Sign Up" : "Sign In" }}</h3>
            <div class="d-flex justify-content-end social_icon">
              <span><i class="fab fa-facebook-square"></i></span>
              <span><i class="fab fa-google-plus-square"></i></span>
              <span><i class="fab fa-twitter-square"></i></span>
            </div>
          </div>
          <div class="card-body">
            <comp-login v-if="type == true" />
            <comp-register v-if="type == false" />
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-center links">
              {{ type ? "Don't have an account?" : "have an account?" }}<p v-on:click="type = !type">{{ type ? "Sign Up" : "Sign In" }}</p>
            </div>
            <div class="d-flex justify-content-center">
              <a href="#">Forgot your password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <comp-login/>
    <comp-register/> -->
  </div>
</template>

<script>
import CompLogin from './login';
import CompRegister from './register';
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      type: true,
    }
  },
  components: {
    CompLogin,
    CompRegister
  }
}
</script>

<style>

  .container{
    height: 100%;
    align-content: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 100vh;
  }

  .card{
    height: 370px;
    margin-top: auto;
    margin-bottom: auto;
    width: 400px;
    background-color: rgba(0,0,0,0.5) !important;
  }

  .social_icon span{
    font-size: 60px;
    margin-left: 10px;
    color: #FFC312;
  }

  .social_icon span:hover{
    color: white;
    cursor: pointer;
  }

  .card-header h3{
    color: white; 
  }

  .social_icon{
    position: absolute;
    right: 20px;
    top: -45px;
  }

  .input-group-prepend span{
    width: 50px;
    background-color: #FFC312;
    color: black;
    border:0 !important;
  }

  input:focus{
    outline: 0 0 0 0  !important;
    box-shadow: 0 0 0 0 !important;

  }

  .remember{
    color: white;
  }

  .remember input
  {
    width: 20px;
    height: 20px;
    margin-left: 15px;
    margin-right: 5px;
  }

  .login_btn{
    color: black;
    background-color: #FFC312;
    width: 100px;
  }

  .login_btn:hover{
    color: black;
    background-color: white;
  }

  .links{
    color: white;
  }

  .links p{
    margin: 0;
    margin-left: 4px;
    color: #007bff;
    cursor: pointer;
  }
</style>
