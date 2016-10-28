import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { v4 } from 'node-uuid';

import Message from './message';

@observer
class Messages extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messagesStore: props.messagesStore,
            viewStore: props.viewStore,
        };
    }

    render() {
        switch (this.state.viewStore.currentView) {
            case 'homepage':
                return (<div>Hello!</div>);
            default:
                return (
                    <div>
                        <div id="messages">{this.messagesStore.messages.map(message => <Message key={v4()} {...message} />)}</div>
                    </div>
                );
        }
    }

}

export default Messages;
