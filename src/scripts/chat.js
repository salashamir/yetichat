// responsible for getting tha chats and data together
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgII32bH5FZLS2G19t3i9UVNsQ9gWoQnw",
  authDomain: "yetibooksellers.firebaseapp.com",
  projectId: "yetibooksellers",
  storageBucket: "yetibooksellers.appspot.com",
  messagingSenderId: "338025267645",
  appId: "1:338025267645:web:47fac1ba05ef65599892d4",
};

// init firebase app
initializeApp(firebaseConfig);

// init services: firestore
const db = getFirestore();

// get collection reference
const colRef = collection(db, "chats");
// class for handling chatroom and data inc hatroom
// stuff chatroom class needs to be able to do:
// -add new chat docs, setup real time listener for new chats, update the username, update the room

export default class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = colRef;
    this.unsub;
  }
  // async method to add new chat docs to database
  async addChat(message) {
    // for creating date
    const now = new Date();
    // chat doc as an object: has who sends it, what room, time created
    const chat = {
      message,
      username: this.username,
      room: this.room,
      createdAt: Timestamp.fromDate(now),
    };
    // save teh chat doc to database
    const response = await addDoc(this.chats, chat);
    return response;
  }
  getChats(callback) {
    this.unsub = onSnapshot(
      // query to only listen and return docs based on room
      query(this.chats, where("room", "==", this.room), orderBy("createdAt")),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            // upating ui will be ui class responsibility, here we just want to pass getchats callback
            callback(change.doc.data());
          }
        });
      }
    );
  }
  // method to update username
  updateName(username) {
    // just update property w param
    this.username = username;
    // store in local storage
    localStorage.setItem("username", username);
  }
  updateRoom(room) {
    this.room = room;
    console.log("room updated.");
    // unsubscribe from other room collec
    if (this.unsub) {
      this.unsub();
    }
  }
}
