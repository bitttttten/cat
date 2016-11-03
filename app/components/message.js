import React from 'react'

const Message = props => {
    const { message } = props
    const className = `message`
    return (
        <div className={className}>
            {message}
        </div>
    )
}

export default Message
