import React from 'react';
import ChatStore from '../../Stores/ChatStore';
import ChatActions from '../../Actions/ChatActions';


class Chat extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			messages: [],
			input: ''
		}
		this._onInputChange = this._onInputChange.bind(this);
		this._onStoreChange = this._onStoreChange.bind(this);
		this._onKeyPress = this._onKeyPress.bind(this);
	}

	componentDidMount() {
		ChatStore.addChangeListener(this._onStoreChange);
	}

	componentWillUnmount() {
		ChatStore.removeChangeListener(this._onStoreChange);
	}

	componentDidUpdate(prevProps, prevState) {
		this._chatBox.scrollTop = this._chatBox.scrollHeight;
	}

	_onInputChange (e) {
		this.setState({
			input: e.target.value
		});
	}

	_onStoreChange() {
		this.setState({
			messages: ChatStore.messages
		});
	}

	_onKeyPress(e) {
		if (e.key === 'Enter') {
			ChatActions.send(this.state.input);
		    this.setState({
		      input: ''
		    });
		}
	}

	render() {
		return	<div className="chat-input-container">
					<div className="chat-box" ref={ (c) => { this._chatBox = c; } }>

						{
							this.state.messages.map( (m) => {
								return 	<div className="message">
											<span className="nickname">{m.nickname}: </span> {m.text}
										</div>;
							})
						}
					</div>
					<div className="chat-input">
						<input type="text" placeholder="write your message" value={this.state.input} onChange={this._onInputChange} onKeyPress={this._onKeyPress} ref={ (c) => { this._input = c; } }/>
					</div>
					<div className="button send">Send</div>
				</div>;
	}
}

export default Chat;