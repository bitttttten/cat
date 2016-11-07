import React from 'react'
import { observer } from 'mobx-react'

import Login from './containers/login'
import ContactList from './containers/contactlist'
import Thread from './containers/thread'
import PostMessageForm from './containers/postmessageform'

function renderView({ viewStore }) {
    const view = viewStore.currentView

    switch (view.name) {
        case 'homepage':
        case 'thread':
            const items = []
            if (view.name === 'thread') {
                items.push(<PostMessageForm viewStore={viewStore} key="postmessageform" />)
                items.push(<button key="goback" onClick={() => viewStore.showHomepage()}>go back</button>)
            }
            return <div>
                <Thread viewStore={viewStore} />
                { items }
            </div>
        default:
            return <div>404</div>
    }
}

const App = observer(({ viewStore }) => {
    const { isAuthenticated } = viewStore

    if (!isAuthenticated) {
        return <Login
          viewStore={viewStore}
          performLogin={(...args) => viewStore.performLogin(...args)}
          afterLogin={() => viewStore.showHomepage()}
        />
    }

    return <div className="view">
        <div className="left">
            <h1>Chat</h1>
            <h2>{`hello ${viewStore.currentUser}`}</h2>
            <div className="contactlist">
                <ContactList viewStore={viewStore} />
            </div>
        </div>
        <div className="right">
            { renderView({ viewStore }) }
        </div>
    </div>
})

export default App
