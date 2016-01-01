import ChatFormActions from '../actions/ChatFormActions'
import ChatFormStore from '../stores/ChatFormStore'

class ChatForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = ChatFormStore.getState()
    this.onChange = this.onChange.bind(this)
  }
  onChange(state) {
    this.setState(state)
  }
  componentDidMount() {
    ChatFormStore.listen(this.onChange)
  }
  componentWillUnmount() {
    ChatFormStore.unlisten(this.onChange)
  }
  handleChatSubmit(event) {
    event.preventDefault();
    var messageText = this.state.messageText.trim()
    if (messageText) {
      this.setState({messageText: ''})
      ChatFormActions.postMessage(messageText)
      return null
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleChatSubmit.bind(this)}>
          <input type="text" placeholder="Enter chat" value={this.state.messageText} onChange={ChatFormActions.updateMessageText}/>
          <button type="submit">Send</button>
        </form>
      </div>
      )
  }
}

export default ChatForm;