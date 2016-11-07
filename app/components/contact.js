import React from 'react'

const Contact = ({ onClick, children, current }) => {
    return <li onClick={onClick} className={current ? 'active' : ''}>
        <p>{children}</p>
    </li>
}

export default Contact
