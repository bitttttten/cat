import React from 'react';
import { observer } from 'mobx-react';
import { render } from 'react-dom';

import startRouter from './router';
import { ViewStore } from './stores/stores';
import Homepage from './containers/homepage';
import Chat from './containers/chat';

// const contactsStore = new ContactsStore();
// const messagesStore = new MessagesStore();
const viewStore = new ViewStore();
startRouter(viewStore);

function renderCurrentView(store) {
    const view = store.currentView;
    switch (view.name) {
        case 'homepage':
            return <Homepage view={view} store={store} />;
        case 'chat':
            return <Chat view={view} store={store} />;
        default:
            return <div>Opps!</div>;
    }
}

const App = observer(({ viewStore }) => (
    <div>
        { renderCurrentView(viewStore) }
        Current user:
        { viewStore.isAuthenticated ? viewStore.currentUser.name : 'unknown user' }
    </div>
));

render(
    <App viewStore={viewStore} />,
    document.getElementById('app')
);
