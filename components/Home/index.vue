<template>
  <div id="app-home">
    <div class="container-home">
      <comp-header/>
      <div class="container-alert">
        <transition name="slide" appear>
          <div class="alert" v-bind:class="[typeAlert]" role="alert" v-if="showAlert">
            {{ contentAlert }}<i class="fas fa-times btn-close" v-on:click="closeAlert"></i>
          </div>
        </transition>
      </div>
      <comp-add-item v-bind:id="id"/>
      <div class="content">
        <div class="content-left">
          <comp-list-item/>
        </div>
        <div class="content-right">
          <comp-categories/>
        </div>
      </div>
      <comp-add-category/>
    </div>
  </div>
</template>

<script>
import CompHeader from '../Header';
import CompAddItem from './AddItem';
import CompListItem from './ListItem';
import CompCategories from './Categories';
import CompAddCategory from './addCategory';
import { mapMutations } from 'vuex';
import { mapState } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      id: this.$route.params.id,
      idUserShare: this.$route.params.idUserShare,
    }
  },
  watch: {
    '$route'(to, from) {
      this.id = to.params.id
      this.$store.dispatch('fetchItems', this.id);
    }
  },
  components: {
    CompHeader,
    CompAddItem,
    CompListItem,
    CompCategories,
    CompAddCategory,
  },
  computed: {
    ...mapState([
      'showAlert', 'typeAlert', 'contentAlert'
    ])
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    closeAlert() {
      this.$store.dispatch('showAlert', {
        showAlert: false, 
        content: '', 
        typeAlert: ''
      });
    },
    ... mapMutations([
      'setUserIdShare'
    ]),
  },
  async beforeMount() {
    this.setUserIdShare(this.$route.params.idUserShare);
    await this.$store.dispatch('fetchCategories');
    if (this.$store.getters.getListCategorie[0].id) {
      this.$store.dispatch('fetchItems', this.$store.getters.getListCategorie[0].id);
    }
  }
}
</script>

<style>
  html, body {
    width: 100%;
    background-color: #b7b7b7;
  }

  #app-home {
    padding-top: 80px;
  }

  .container-home {
    margin: 0 auto;
    width: max-content;
    margin-top: 100px;
    padding: 30px;
    background-color: rgba(0,0,0,0.5) !important;
    border-radius: 4px;
  }

  .content {
    width: 100%;
    display: inline-block;
    margin-top: 20px;
  }

  .content-left {
    float: left;
    padding-right: 20px;
    min-width: 351px;
  }

  .content-right {
    float: left;
  }

  .test {
    background-color: red;
  }

  .btn-close {
    float: right;
    cursor: pointer;
  }

  .container-alert {
    height: 66px;
  }
</style>
