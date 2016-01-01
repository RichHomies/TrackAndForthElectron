import ChatForm from './ChatForm'
import ChatCollection from './ChatCollection'

class ChatView extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {

  }
  render() {
    return (
      <div>
        <ChatForm />
        <ChatCollection />
      </div>
    )
  }

}

export default ChatView;