import { observable, computed, action } from 'mobx';
import fetch from 'isomorphic-fetch';

export class ContactsStore {
    @observable contacts;
    @observable loaded = false;

    constructor() {
        this.contacts = require('../data/contacts.json');
    }

    fetch() {
        fetch('/some/url')
        .then(resp => JSON.parse(resp).contacts)
        .then(contacts => {
            this.contacts = contacts;
            this.loaded = true;
        })
        .catch(err => console.log(err));
    }
}

export class MessagesStore {
    @observable messages;

    submit({ message, id }) {
        this.messages[id].push({
            message
        });
    }
}

export class ViewStore {
    @observable currentUser = null;
    @observable messages = null;
    @observable currentView = null;

    constructor() {
        const messages = require('../data/messages.json');
        this.messages = {
            '75f05f1e-4517-4439-a06e-e5ef571ce0eb': messages.slice(0, Math.floor(messages.length / 2)),
            'ec4ea0ec-9039-47b6-a168-f2edb4404184': messages.slice(0, Math.floor(messages.length / 2)),
            'b6433a3b-ff64-496b-8394-611a5107bb35': messages.slice(0, Math.floor(messages.length / 2)),
            'd6363c20-8b00-4dc2-ba9b-0466ff1dbfd1': messages.slice(0, Math.floor(messages.length / 2)),
            'ad2cbaf6-ac35-4dcc-9c6c-449b2f41e0de': messages.slice(0, Math.floor(messages.length / 2))
        };
    }

    @computed get isAuthenticated() {
        return this.currentUser !== null;
    }

    @action showHomepage() {
        this.currentView = {
            name: 'homepage'
        };
    }

    @action showChat(userId) {
        this.currentView = {
            name: 'chat',
            userId,
            messages: (this.isAuthenticated
                    ? this.messages[userId]
                    : new Error('Authentication required')
            )
        };
    }

    @action performLogin(username) {
        this.currentUser = username;
    }

    @computed get currentPath() {
        switch (this.currentView.name) {
            case 'overview':
            default:
                return '/';
            case 'document':
                return `/chat/${this.currentView.userId}`;
        }
    }
}
