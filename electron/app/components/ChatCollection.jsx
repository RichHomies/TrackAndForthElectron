import ChatCollectionActions from '../actions/ChatCollectionActions'
import ChatCollectionStore from '../stores/ChatCollectionStore'

var messageCollectionArray = []
class ChatCollection extends React.Component {
  constructor(props) {
    super(props)
    this.state = ChatCollectionStore.getState()
    this.onChange = this.onChange.bind(this)
  }
  onChange(state) {
    this.setState(state)
  }
  componentDidMount() {
    ChatCollectionStore.listen(this.onChange)
    ChatCollectionActions.getAndUpdateMessagesCollection()
  }
  componentWillUnmount() {
    ChatCollectionStore.unlisten(this.onChange)
  }
  render() {
    var messageList = this.state.messagesCollection.map(function(item, i) {
      return (
        <li key={i}>
          <p>{ item.body }</p>
        </li>
      );
    })
    return (
      <ul>
        {messageList}
      </ul>
    );
  }
}

export default ChatCollection;