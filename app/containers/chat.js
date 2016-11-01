import React, { Component } from 'react';

class Chat extends Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }

}

export default Chat;
