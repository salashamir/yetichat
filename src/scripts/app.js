// end of import/firebase setup
import Chatroom from "./chat";
import ChatUI from "./ui";

// THIS FILE:
// resposnible for bringin other 2 scripts together, running app

// dom queries
// ref to chatlist
const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMssg = document.querySelector(".update-mssg");
// use event delegation on rooms
const rooms = document.querySelector(".chat-rooms");

// add a new chat
newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get value from field
  const newMessage = newChatForm.message.value.trim();
  // add chat: adchat method from chatroom class
  // doesnt matter that our class instance is below bc by time user submits message it will have been created
  // addchat returns promise, is async
  chatroom
    .addChat(newMessage)
    .then(() => {
      newChatForm.reset();
    })
    .catch((err) => console.log(err.message));
});

// update username; update name property on chatroom sinstance
newNameForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // store new name from input
  const newName = newNameForm.name.value.trim();
  // update name via chatroom calss method on our instance
  // doesnt matter this is defined beliw
  chatroom.updateName(newName);
  // reset form all iput fields
  newNameForm.reset();
  // show then hide the update message; use setttimeout
  updateMssg.textContent = `Your name was updated to ${newName}`;
  setTimeout(() => {
    updateMssg.textContent = "";
  }, 3000);
});

// update room: use event delgation
rooms.addEventListener("click", (e) => {
  // use e to check event target
  console.log(e);
  // check if target is button using tagname prop on target prop of e
  if (e.target.tagName === "BUTTON") {
    // CHANGING rooms so clear current chat lsit
    chatUI.clear();
    // update room; each button has id so pass in value using getattrbiute method on target reference
    // remember: updateroom unsubscribes from lsitenting to changes of prev room
    chatroom.updateRoom(e.target.getAttribute("id"));
    // still need to set up lsitener for new room
    chatroom.getChats((chat) => {
      chatUI.render(chat);
    });
  }
});

// check localstorage for name w ternary operator
const username = localStorage.username ? localStorage.username : "anon";
// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", username);
console.log(chatroom);

// get chats and render
chatroom.getChats((data) => {
  chatUI.render(data);
});
