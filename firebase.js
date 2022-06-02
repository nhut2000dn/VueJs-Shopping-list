import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/firebase-storage'


// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyAbyhq-pE_RiLZ2H6kU5BVb8JQUylGd5KI",
  authDomain: "shopping-list-9a2ec.firebaseapp.com",
  databaseURL: "https://shopping-list-9a2ec.firebaseio.com",
  projectId: "shopping-list-9a2ec",
  storageBucket: "shopping-list-9a2ec.appspot.com",
  messagingSenderId: "676689011096",
  appId: "1:676689011096:web:ca3c74e508dd1aedbf4bed"
}

firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

// collection references
const usersCollection = db.collection('users')
const categoryCollection = db.collection('categories')
const itemCollection = db.collection('items')

// export utils/refs
export {
  db,
  auth,
  storage,
  usersCollection,
  categoryCollection,
  itemCollection,
}


