import React, { PropTypes } from 'react';

const Message = props => {
    const { message } = props;

    const className = `message`;

    return (
        <div className={className}>
            {message}
        </div>
    );
};

Message.propTypes = {
    message: PropTypes.string.isRequired
};

export default Message;
