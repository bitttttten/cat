import React from 'react';
import { observer } from 'mobx-react';
import { v4 } from 'node-uuid';

const ContactList = observer(({ viewStore }) => {
    const { contactList } = viewStore;
    switch (contactList.contacts.state) {
        default:
        case 'pending':
            return <p>loading contacts</p>;
        case 'rejected':
            return <Error error={contactList.contacts.reason} />;
        case 'fulfilled':
            return <ul>
                {contactList.contacts.value.map(contact =>
                    <li onClick={() => viewStore.showThread(contact.id)} key={v4()}>
                        {contact.firstName} {contact.lastName}
                    </li>
                )}
            </ul>;
    }
});

export default ContactList;
