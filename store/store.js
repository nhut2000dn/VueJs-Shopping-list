import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import {router} from "../main.js"

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    idUser : '',
    idUserShare: '',
    categories: [],
    listItem: [],
    userProfile: {},
    showAlert: false,
    typeAlert: '',
    contentAlert: '',
    setTimeOutClose: '',
  },
  getters: {
    getList: (state) => (id) => {
      return state.listItem;
    },
    getListCategorie: (state) => {
      return state.categories;
    }
  },
  mutations: {

    setUserIdShare(state, val) {
      state.idUserShare = val
    },

    updateShow(state, id) {
      state.listItem.find(item => item.id == id).show = !state.listItem.find(item => item.id == id).show;
    },

    updateCheckOffline(state, id) {
      state.listItem.find(item => item.id == id).check == true ? state.listItem.find(item => item.id == id).check = false : state.listItem.find(item => item.id == id).check = true;
    },

    setUserProfile(state, val) {
      state.userProfile = val
    },

    setCategory(state, val) {
      state.categories = val
    },

    setCategoryCount(state, val ) {
      var foundIndex = state.categories.findIndex(x => x.id == val.id);
      Vue.set(state.categories[foundIndex], 'count', val.count)
    },

    setListItem(state, val) {
      state.listItem = val
    }
  },
  actions: {

    async signup({ dispatch }, form) {
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
      })
      await dispatch('fetchCategories')
      router.push('/home/' + state.categories[0].id);
    },


    async login({ state, dispatch }, form) {
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
      await dispatch('fetchCategories')
      router.push('/home/' + state.categories[0].id);
    },

    async fetchUserProfile({ commit }) {
      const userProfile = await fb.usersCollection.doc(user.uid).get()
      commit('setUserProfile', userProfile.data())
    },

    async logout({ commit }) {
      await fb.auth.signOut()
      commit('setUserProfile', {})
      router.push('/auth');
    },

    async fetchCategories({ state, commit }) {

      try {
        const docs =  await fb.categoryCollection.where('userId', '==',  (fb.auth.currentUser.uid)).get();
        var categoryArray = []
  
        docs.forEach(doc => {
          let category = doc.data()
          category.id = doc.id
          categoryArray.push(category)
        })
  
        commit('setCategory', categoryArray)
        categoryArray.forEach(element => {
          fb.itemCollection.where('categoryId', '==', element.id).get().then(snap => {
            commit('setCategoryCount', { "id": element.id, "count" : snap.size });
          })
        }); 

      } catch (error) {
        const docs =  await fb.categoryCollection.where('userId', '==',  (state.idUserShare)).get();
        var categoryArray = []
  
        docs.forEach(doc => {
          let category = doc.data()
          category.id = doc.id
          categoryArray.push(category)
        })
  
        commit('setCategory', categoryArray)
        
        categoryArray.forEach(element => {
          fb.itemCollection.where('categoryId', '==', element.id).get().then(snap => {
            commit('setCategoryCount', element.id, "snap.size");
          })
        }); 
      }

    },

    async createCategory({ state, dispatch }, category) {
      await fb.categoryCollection.add({
        createdOn: new Date(),
        name: category.name,
        userId: fb.auth.currentUser.uid,
      })

      dispatch('fetchCategories')
    },

    async createItem({ commit, dispatch }, item) {

      await fb.itemCollection.add({
        createdOn: new Date(),
        categoryId: item.idCategory,
        userId: fb.auth.currentUser.uid,
        name: item.name,
        description: "",
        image: "",
        check: false,
      })
      
    },

    async fetchItems({ commit }, id) {
      const docs =  await fb.itemCollection.where('categoryId', '==', id).get();
      let itemArray = []

      docs.forEach(doc => {
        let item = doc.data()
        item.id = doc.id
        item.show = false
      
        itemArray.push(item)
      })
      
      commit('setListItem', itemArray)
    },

    async updateCheck({ state, commit, dispatch }, item) {
      try {
        fb.itemCollection.doc(item.id).update({
          check: !item.check
        })
        return true;
      } catch (error) {
        return false;
      }
    },

    async updateDetailItem({ state, commit, dispatch }, object) {
      let storageUrl = {};
      let description = {};

      if (object.file) {
        storageUrl = {image: await dispatch('uploadTaskPromise', object)};
      }

      if (object.description) {
        description = {description: object.description};
      }

      if (description || storageUrl) {
        await fb.itemCollection.doc(object.id).update({
          ...description,
          ...storageUrl
        })
      }
    },

    async uploadTaskPromise({ state, commit, dispatch }, object) {
      return new Promise(function(resolve, reject) {
        const storageRef = fb.storage.ref(`${object.file.name}-${Math.ceil(Math.random()*10)}`)
        const uploadTask = storageRef.put(object.file)
        uploadTask.on('state_changed',
          function(snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
          },
          function error(err) {
            console.log('error', err)
            reject()
          },
          function complete() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              resolve(downloadURL)
            })
          }
        )
      })
    },

    showAlert({ state, commit, dispatch }, object) {
      clearTimeout(state.setTimeOutClose);
      state.showAlert = false;
      state.setTimeOutClose = setTimeout(function() {
        state.showAlert = object.showAlert;
        state.contentAlert = object.content;
        state.typeAlert = object.typeAlert;
        if (object.showAlert) {
          state.setTimeOutClose = setTimeout(function() {
            state.showAlert = false;
          }, 3000);
        }
      }, 100);
    }

  },
});