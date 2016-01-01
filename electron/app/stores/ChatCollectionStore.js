import alt from '../alt';
import ChatCollectionActions from '../actions/ChatCollectionActions';

var messagesCollectionArray = []
class ChatCollectionStore {
  constructor() {
    this.bindActions(ChatCollectionActions);
    this.messagesCollection = []
  }
  onGetAndUpdateMessageSuccess(message) {
    messagesCollectionArray.push(message)
    this.messagesCollection = messagesCollectionArray
  }
}

export default alt.createStore(ChatCollectionStore)