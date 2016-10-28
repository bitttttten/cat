import { createHistory } from 'history';
import { Router } from 'director';
import { autorun } from 'mobx';

export default function startRouter(store) {
    Router({
        '/chat/:chatId': id => store.showChat(id),
        '/': () => store.showHomepage()
    }).configure({
        notfound: () => store.showOverview(),
        html5history: true
    }).init();

    // update url on state changes
    autorun(() => {
        const path = store.currentPath;
        if (path !== window.location.pathname) {
            window.history.pushState(null, null, path);
        }
    });
}
