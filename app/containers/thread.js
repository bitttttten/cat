import React from 'react';
import { observer } from 'mobx-react';
import { v4 } from 'node-uuid';

import Message from '../components/message';

function renderThreadView({ state, reason, value }) {
    switch (state) {
        default:
        case 'pending':
            return <p>loading..</p>;
        case 'rejected':
            return <Error error={reason} />;
        case 'fulfilled':
            if (value.length === 0) {
                return <div>no messages</div>;
            }
            return <div>{value.map(message => <Message key={v4()} {...message} />)}</div>;
    }
}

const Thread = observer(({ viewStore }) => {
    const thread = viewStore.currentView.thread;
    return <div className="thread">
        { renderThreadView(thread) }
    </div>;
});

export default Thread;
