import alt from '../alt';
import ChatFormActions from '../actions/ChatFormActions';

class ChatFormStore {
  constructor() {
    this.bindActions(ChatFormActions);
    this.messageText = ''
  }
  onUpdateMessageText(event) {
    this.messageText = event.target.value;
  }
}

export default alt.createStore(ChatFormStore)