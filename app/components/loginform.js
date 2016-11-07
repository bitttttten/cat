import React from 'react'

const LoginForm = ({ onSubmit, children }) => {
    return <form onSubmit={onSubmit}>
        <h1>hello!</h1>
        {children}
        <button type="submit">submit</button>
    </form>
}

export default LoginForm
