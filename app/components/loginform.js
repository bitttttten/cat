import React from 'react'

const LoginForm = ({ onSubmit, onChange, message, details }) => {
    const { username, password } = details;
    return <form onSubmit={onSubmit}>
        <h1>hello!</h1>
        <h2>{message}</h2>
        <input onChange={e => onChange('username', e.target.value)} value={username} type="text" autoFocus={username === undefined} />
        <input onChange={e => onChange('password', e.target.value)} value={password} type="password" autoFocus={username !== undefined} />
        <button type="submit">submit</button>
    </form>
}

export default LoginForm
