<template>
  <div id="app1">
    <input type="text" class="form-control input-new-item" id="exampleInputNewItem" aria-describedby="newItemHelp" placeholder="Enter New Item" v-model="newItem">
    <button class="btn btn-success ml-3" v-on:click="addItem(newItem)">Add New Item</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Vue from 'vue'
export default {
  name: 'comp-add-item',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      newItem: '',
    }
  },
  props: {
    id: String
  },
  methods: {
    addItem(newItem) {
      if (newItem != '') {
        this.$store.dispatch('createItem', {
          name: newItem,
          idCategory: this.id
        });
        this.newItem = "";
        this.$store.dispatch('fetchItems', this.id);
        this.$store.dispatch('showAlert', {
          showAlert: true, 
          content: 'Create succeful', 
          typeAlert: 'alert-success'
        });
        var foundIndex = this.categories.findIndex(x => x.id == this.id);
        Vue.set(this.categories[foundIndex], 'count', this.categories[foundIndex].count + 1)
      } else {
        this.$store.dispatch('showAlert', {
          showAlert: true, 
          content: 'Create fail! New item must fill', 
          typeAlert: 'alert-danger'
        });
      }
    },
  },
  computed: mapState(['categories']),
}
</script>

<style>
  #app1 {
    display: flex;
  }

  .input-new-item {
    width: 330px;
  }
</style>