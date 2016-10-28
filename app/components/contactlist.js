import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { v4 } from 'node-uuid';

import Contact from './contact';

@observer
class ContactList extends Component {

    constructor(props) {
        super(props);
        this.contactsStore = props.contactsStore;
    }

    render() {
        return (
            <ul>
                {this.contactsStore.contacts.map(contact => <Contact key={v4()} {...contact} />)}
            </ul>
        );
    }

}

export default ContactList;
