import React, { PropTypes } from 'react';
import Link from '../router/link';

const Contact = props => {
    const { firstName, lastName, id } = props;

    const className = `contact`;

    return (
        <li className={className}>
            <Link href={id}>
                {firstName} {lastName}
            </Link>
        </li>
    );
};

Contact.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string
};

export default Contact;
