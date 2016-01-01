import alt from '../alt';

class ChatFormActions {
  constructor() {
    this.generateActions(
      'updateMessageText',
      )
  }
  postMessage(messageText) {
    var messageObj = {
      text: messageText
    }
    socket.emit('newMessage', messageObj)
  }
}

export default alt.createActions(ChatFormActions)