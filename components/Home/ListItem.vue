<template>
  <div id="app-list-item">
    <ul class="bar-list-item">
      <li v-for="(item, index) in getList(id)" :key="index" class="item">
        <div class="item-content">
          <div class="container-item-left">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1" v-bind:checked="item.check" v-on:change="updateCheck(item)">
            </div>
            <p class="text-list">{{ item.name }}</p>
          </div>
          <i class="fas fa-sort-down btn-show" v-on:click="updateShow(item.id)"></i>
        </div>
        <transition name="slide">
          <div class="item-show-details" v-show="item.show">
            <div class="container-image">
              <h5 class="txt-image title-show">Image: </h5>
              <div class="box-image">
                <img :src="item.image ? item.image : '/src/assets/placeholder.png'" alt="" class="item-image">
              </div>
              <div class="box-btn-file">
                <input class="file-image" type="file" @change="onFileChange" :data-index="index"> 
                <p class="error-file-image">Error image must type: png/jpg</p>
              </div>
            </div>
            <div class="container-description">
              <h5 class="txt-description title-show">Description: </h5>
              <div class="box-description">
                <textarea name="" id="" cols="41" rows="3" class="description" v-model="item.description"></textarea>
                <p class="error-textarea" v-bind:class="{ 'active-error': !item.description }" >Description must fill</p>
              </div>
            </div>
            <div class="btn-update">
              <button class="btn btn-success" v-on:click="updateList(index, item.id)">Update</button>
            </div>
          </div>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex'
import * as fb from '../../firebase'
export default {
  name: 'comp-list-item',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      id: this.$route.params.id,
    }
  },
  watch: {
    '$route'(to, from) {
      $(".item-image").attr("src", "");
      $(".file-image").val('');
      $(".description").val('');
      this.id = to.params.id
    }
  },
  computed: {
    ... mapGetters(['getList'])
  },
  methods: {

    onFileChange(e) {
      const file = e.target.files[0];
      if (file['type'] === 'image/png') {
        document.querySelectorAll('.item-image')[e.target.getAttribute('data-index')].setAttribute("src", URL.createObjectURL(file));
        document.querySelectorAll('.error-file-image')[e.target.getAttribute('data-index')].classList.remove('active-error');
      } else {
        document.querySelectorAll('.error-file-image')[e.target.getAttribute('data-index')].classList.add("active-error");
      }
    },

    async updateList(index, id) {
      var file = document.querySelectorAll('.file-image')[index].files[0];
      var description = document.querySelectorAll('.description')[index].value;
      let object = { 'id': id, };
      if (file) {
        object.file = file;
      }
      if (description) {
        object.description = description;
      }
      await this.$store.dispatch('updateDetailItem', object);
      this.$swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Update Successful',
        showConfirmButton: false,
        timer: 1500
      })
    },

    async updateCheck(item) {
      const update = await this.$store.dispatch('updateCheck', item);
      if (update) {
        this.$store.dispatch('showAlert', {
          showAlert: true, 
          content: item.check ?  'Uncheck successful!' : 'Checked successful!', 
          typeAlert: 'alert-success'
        });
        this.$store.commit('updateCheckOffline', item.id)
      } else {
        this.$store.dispatch('showAlert', {
          showAlert: true, 
          content: 'Check Fail', 
          typeAlert: 'alert-danger'
        });
      }
    },

    ... mapMutations([
      'updateShow',
      'updateCheckOffline'
    ]),
  }
}
</script>

<style>
  .app-list-item {

  }
  
  .bar-list-item {
    list-style: none;
    padding: 0;
  }

  .item {
  }

  .item-content {
    margin: 10px 0;
    background-color: #ffffff;
    width: 331px;
    overflow: hidden;
    border-radius: 3px;
  }

  .form-check {
    float: left;
    width: 20px;
    height: 20px;
    margin-top: 0.1rem;
  }

  .container-item-left {
    padding: 10px;
    clear: both;
    float: left;
    overflow: hidden;
  }

  .form-check-input {
    width: 20px;
    height: 20px;
    margin-top: 0.1rem;
  }

  .text-list {
    margin: 0;
    margin-left: 0.5rem;
    float: left;
  }

  .btn-show {
    float: right;
    cursor: pointer;
    padding: 14px;
  }

  .item-show-details {
    padding: 10px;
    background-color: #ffffff;
    margin-top: 10px;
  }

  .title-show {
    background-color: #aed1ea;
    padding: 4px;
    font-size: 17px;
    color: #4c4b4a;
  }
  
  .txt-image {
  }
  
  .item-image {
    width: 100%;
    height: 100%;
  }

  .box-image {
    width: 100px;
    height: 100px;
  }

  .box-btn-file {
    margin-top: 5px;
  }
  
  .txt-description {
    margin-top: 10px;
  }

  .description {
    padding: 4px;
  }

  .btn-update {
    margin-top: 10px;
  }

  .error-file-image {
    color: rgb(196, 33, 33);
    display: none;
  }

  .error-textarea {
    color: rgb(196, 33, 33);
    display: none;
  }

  .active-error {
    display: block;
  }

  .slide-enter {
    opacity: 0;
    position: absolute; 
  }

  .slide-enter-active {
    transition: opacity 1s;
    animation: enter 1s ease-out forwards;
  }

  .slide-leave {
  }

  .slide-leave-active {
    opacity: 0;
    transition: opacity 1s;
    animation: leave 1s ease-out forwards;
  }

  .sldie-move {
    transition: tranform 1s;
  }

  @keyframes enter {
    from {
      transform: translateY(20px);
    }
    
    to {
      transform: translateY(0px);
    }
  }

  @keyframes leave {
    from {
      transform: translateY(0px);
    }
    
    to {
      transform: translateY(20px);
    }
  }
</style>