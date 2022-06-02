<template>
  <div id="app-dialog-add">
    <div class="modal fade modal-add" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control input-new-category" id="exampleInputNewItem" aria-describedby="newItemHelp" placeholder="Enter New Category" v-model="newCategory">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" v-on:click="createCategory(newCategory)">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comp-add-category',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      newCategory: '',
    }
  },
  watch: {
    '$route'(to, from) {
      this.id = to.params.id
    }
  },
  methods: {
    createCategory(newCategory) {
      this.$store.dispatch('createCategory', {
        name: newCategory,
      });
      $('.modal-add').modal('hide');
      this.$store.dispatch('showAlert', {
        showAlert: true, 
        content: 'Create category succesfull!', 
        typeAlert: 'alert-success'
      });
    },
  }
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