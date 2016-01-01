import alt from '../alt';

class ChatCollectionActions {
  constructor() {
    this.generateActions(
      'getAndUpdateMessageSuccess'
      )
  }
  getAndUpdateMessagesCollection () {
    var that = this
    socket.on('message', function(message) {
      that.actions.getAndUpdateMessageSuccess(message)
    })
    socket.emit('fetchAndUpdateMessages')
  }
}

export default alt.createActions(ChatCollectionActions)