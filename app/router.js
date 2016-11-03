import { createHistory } from 'history'
import { Router } from 'director'
import { autorun } from 'mobx'

export default function startRouter(viewStore) {
    Router({
        '/chat/:chatId': id => viewStore.showThread(id),
        '/': () => viewStore.showHomepage()
    }).configure({
        notfound: () => viewStore.showHomepage(),
        html5history: true
    }).init();

    autorun(() => {
        const path = viewStore.currentPath
        if (path !== window.location.pathname) {
            window.history.pushState(null, null, path)
        }
    })
}
