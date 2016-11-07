import { observable, computed, action } from 'mobx';
import { fromPromise } from 'mobx-utils';
import { v4 } from 'node-uuid';

export default class ViewStore {
    @observable contacts = require('./data/contacts.json');
    @observable threads = require('./data/messages.json');

    @observable currentUser = null;
    @observable currentView = null;
    @observable currentThread = [];
    @observable cachedThreads = {};

    @action submitMessage({ message }) {
        const { threadId } = this.currentView;
        this.cachedThreads[threadId] = this.cachedThreads[threadId] || {};
        const id = v4();
        this.cachedThreads[threadId].push({ message, id });
        this.showThread(threadId);
    }

    @action showHomepage() {
        this.currentThread = null;
        this.currentView = {
            name: 'homepage'
        };
    }

    @action showThread(threadId) {
        const name = 'thread';
        if (this.cachedThreads[threadId]) {
            this.currentView = {
                name,
                threadId,
                thread: fromPromise(new Promise(resolve => resolve(this.cachedThreads[threadId])))
            };
        } else {
            const messages = this.threads.filter(() => Math.random() < 0.2);
            this.currentView = {
                name,
                threadId,
                thread: fromPromise(new Promise(resolve => {
                    this.cachedThreads[threadId] = messages;
                    resolve(messages);
                }))
            };
        }
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
            contacts: fromPromise(new Promise(resolve => setTimeout(() => resolve(this.contacts), 1000)))
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
