// responsile for all the UI
// class for handling UI
// 2 RESPONSIBILITIES:
// RENDER CHAT TEMPLATES TO DOM, CLEAR LIST OF CHATS WHEN ROOM CHANGES
import { formatDistanceToNow } from "date-fns";

export default class ChatUI {
  // list is where we're outputting template to, store list on this class as property; instance will have reference to list we want to render to dom
  constructor(list) {
    this.list = list;
  }
  // to clear list when changing rooms
  clear() {
    // setting to empty string clears html contnt
    this.list.innerHTML = "";
  }
  // method responsible fore creating html template for each doc, wil be usd as callback in getchats method of chatroom class later
  // data passed in will be a doc. it will render for each doc using foreach loop in getchats method
  render(data) {
    // jobs: egenerate html template, inject data to it, and render to DOM
    // format date
    const when = formatDistanceToNow(data.createdAt.toDate(), {
      addSuffix: true,
      includeSeconds: true,
    });
    // 1 - generate template, inject data from data object param into it
    const html = `<li class="list-item">
    <span class="username">${data.username}</span>
    <div class="time">${when}</div>
    <span class="message">${data.message}</span>
    </li>`;

    // 2 - render to dom; add to list, not replace
    this.list.innerHTML += html;
  }
}
