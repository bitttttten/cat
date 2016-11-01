import React from 'react';
import { observer } from 'mobx-react';

import Login from './containers/login';
import ContactList from './containers/contactlist';
import Thread from './containers/thread';
import PostMessageForm from './containers/postmessageform';

function renderCurrentView({ viewStore }) {
    const view = viewStore.currentView;
    const { isAuthenticated } = viewStore;

    if (!isAuthenticated) {
        return <Login viewStore={viewStore} />;
    }

    switch (view.name) {
        case 'homepage':
            return <div>
                <ContactList viewStore={viewStore} />
            </div>;
        case 'thread':
            return <div>
                <ContactList viewStore={viewStore} />
                <Thread viewStore={viewStore} />
                <PostMessageForm viewStore={viewStore} />
                <button onClick={() => viewStore.showHomepage()}>go back</button>
            </div>;
        default:
            return <div>404</div>;
    }
}

const App = observer(({ viewStore }) => (
    <div>
        <h1>Chat</h1>
        <h2>{ viewStore.isAuthenticated ? `hello ${viewStore.currentUser}` : `` }</h2>
        { renderCurrentView({ viewStore }) }
    </div>
));

export default App;
