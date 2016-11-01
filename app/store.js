import { observable, computed, action } from 'mobx';
import { fromPromise } from 'mobx-utils';

export default class ViewStore {
    @observable contacts = require('./data/contacts.json');
    @observable threads = require('./data/messages.json');

    @observable currentUser = null;
    @observable currentView = null;
    @observable currentThread = [];

    @action submitMessage({ chat, id }) {
        this.chats[id].push({
            chat
        });
    }

    @action showHomepage() {
        this.currentView = {
            name: 'homepage'
        };
    }

    @action showThread(threadId) {
        const messages = this.threads.filter(() => Math.random() < 0.2);
        this.currentThread = messages;
        this.currentView = {
            name: 'thread',
            threadId,
            thread: fromPromise(new Promise(resolve => resolve(this.currentThread)))
        };
    }

    @action performLogin(username, password, callback) {
        if (username && password) {
            this.currentUser = username;
            callback(true);
        } else {
            callback(false);
        }
    }

    @computed get isAuthenticated() {
        return this.currentUser !== null;
    }

    @computed get contactList() {
        return {
            contacts: fromPromise(new Promise(resolve => resolve(this.contacts)))
        };
    }

    @computed get currentPath() {
        switch (this.currentView.name) {
            case 'homepage':
            default:
                return '/';
            case 'thread':
                return `/thread/${this.currentView.threadId}`;
        }
    }
}
