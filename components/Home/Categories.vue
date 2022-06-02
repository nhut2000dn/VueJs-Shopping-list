<template>
  <div id="app">
    <div class="container-categories">
      <div class="container-header">
        <h5 class="title-categories" active-class="active">Categories 
          <button type="button" class="btn btn-primary btn-dialog-add" data-toggle="modal" data-target=".modal-add" v-on:click="showModel"><i class="fas fa-plus-circle"></i></button>
        </h5>
        <button class="btn-share btn" v-on:click="shareAction">share</button>
      </div> 
      <ul class="bar-categories" v-for="(item, index) in getListCategorie" :key="index">
        <router-link
          tag="li"
          :to="{ path: '/home/' + item.id + ((idUserShare != null) ? ('/' + idUserShare) : '' ) }"
          class="item-categories" active-class="active" v-on:click="updateAllCheck">{{ item.name }} <span class="count-category">{{ item.count }}</span></router-link>
      </ul>
    </div>
  </div>
</template>

<script>

import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex'
import { mapState } from 'vuex';
import CompAddCategory from './addCategory';
import * as fb from '../../firebase';
export default {
  name: 'comp-list-categories',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      listCategories: {}, 
      idUserShare: this.$route.params.idUserShare,
    }
  },
  computed: {
    ... mapGetters(['getListCategorie']),
  },
  watch: {
    categories (newCount, oldCount) {
      // Our fancy notification (2).
      this.listCategories = newCount;
    }
  },
  methods: {
    ... mapMutations([
      'updateAllCheck'
    ]),

    showModel() {
      console.log(this.getListCategorie);
      alert(this.getListCategorie[0].count);
    },

    shareAction() {
      this.$swal.fire(
        'Public URL!',
        (window.location.href + "/" + fb.auth.currentUser.uid),
        'success'
      )
    },

  },

  components: {
    CompAddCategory,
  },
}
</script>

<style>
  .container-categories {
  }

  .title-categories {
    margin: 10px 0;
    padding: 7px;
    background-color: white;
    border-radius: 3px;
    width: max-content;
    font-size: 16px;
    color: #5f5f5f;
  }

  .bar-categories {
    list-style: none;
    padding: 0;
  }

  .item-categories {
    padding: 10px;
    margin: 10px 0;
    background-color: #ffffff;
    cursor: pointer;
    border-radius: 3px;
  }

  .active {
    background-color: #aed1ea;
  }

  .btn-dialog-add {
    padding: 5px;
    line-height: 0;
    border-radius: 29px;
    margin-left: 4px;
  }

  .container-header {
    display: inline-flex;
  }

  .btn-share {
    height: max-content;
    margin: 11px 0px 11px 11px;
    padding: 7px;
  }

  .count-category {
    float: right;
    background: white;
    padding: 0 8px;
    margin-left: 13px;
    border: 1px solid #dad5d5;
    border-radius: 21px;
  }
</style>