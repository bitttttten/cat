import React from 'react'
import { observer } from 'mobx-react'
import { v4 } from 'node-uuid'

import Contact from '../components/contact'
import Error from '../components/error'

@observer
class ContactList extends React.Component {
    render() {
        const { viewStore } = this.props;
        const { contactList } = viewStore
        switch (contactList.contacts.state) {
            default:
            case 'pending':
                return <p>faux load contacts..</p>
            case 'rejected':
                return <Error error={contactList.contacts.value} />
            case 'fulfilled':
                return <ul>
                    {contactList.contacts.value.map(contact =>
                        <Contact onClick={() => viewStore.showThread(contact.id)} key={v4()} current={contact.id === viewStore.currentView.threadId}>
                            {contact.firstName} {contact.lastName}
                        </Contact>
                    )}
                </ul>
        }
    }
}
export default ContactList
