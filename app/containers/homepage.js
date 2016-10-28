import React from 'react';
import { observer } from 'mobx-react';

const Homepage = observer(({ view, store }) => {
    if (!store.isAuthenticated) {
        return <div>login pls</div>;
    }

    switch (view.document.state) {
        case 'pending':
            return <h1>Loading!</h1>;
        case 'fulfilled':
            return (
                <div>
                    <button onClick={() => store.showOverview()}>Overview</button>
                    <h1>{ view.document.value.name }</h1>
                    <p> { view.document.value.text }</p>
                </div>
            );
        case 'rejected':
        default:
            return <Error error={view.document.reason || null} />;
    }
});

export default Homepage;
