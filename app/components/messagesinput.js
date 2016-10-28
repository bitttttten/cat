import React, { Component } from 'react';

class MessagesInput extends Component {

    constructor(props) {
        super();
        this.messagesStore = props.messagesStore;
        this.submitForm = this.submitForm.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = { message: '' };
    }

    onChange(e) {
        const message = e.target.value.trim();
        this.setState({ message });
    }

    submitForm(e) {
        e.preventDefault();
        this.messagesStore.submit(this.state.message);
        this.setState({ message: '' });
    }

    render() {
        const { message = '' } = this.state;
        return (
            <div className="messagesinput">
                <form onSubmit={this.submitForm}>
                    <input type="text" onChange={this.onChange} value={message} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }

}

export default MessagesInput;
