import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
class PostMessageForm extends React.Component {
    @observable message = '';

    onSubmit(e) {
        e.preventDefault();
        const { message } = this;
        this.props.viewStore.submitMessage({ message });
        this.message = '';
    }

    render() {
        const { message } = this;
        return <div className="postmessageform">
            <form onSubmit={e => this.onSubmit(e)}>
                <input type="text" onChange={e => { this.message = e.target.value }} value={message} autoFocus />
                <button>Send</button>
            </form>
        </div>;
    }
}

export default PostMessageForm;
