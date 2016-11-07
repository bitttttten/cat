import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import LoginForm from '../components/loginform'

@observer
class Login extends React.Component {
    @observable details = JSON.parse(localStorage.getItem('details')) || {}
    @observable message = 'login pls'

    messages = {
        loginFailed: 'login failed',
        loginAccept: 'login accepted',
        failUsername: 'pls enter username',
        failPassword: 'where is the password?',
    }

    updateProperty(key, value) {
        this.details[key] = value
        if (key !== 'password') {
            localStorage.setItem('details', JSON.stringify(this.details))
        }
    }

    onSubmit(e) {
        e.preventDefault()
        const { username, password } = this.details

        if (!username) {
            this.message = this.messages.failUsername
            return
        } else if (!password) {
            this.message = this.messages.failPassword
            return
        }

        this.message = 'verifiying..'
        this.props.performLogin(
            username,
            password,
            authenticated => {
                if (authenticated) {
                    this.message = this.messages.loginAccept
                    this.props.afterLogin()
                } else {
                    this.message = this.messages.loginFailed
                }
            }
        )
    }

    render() {
        return <div className="login">
            <LoginForm
              message={this.message}
              details={this.details}
              onSubmit={e => this.onSubmit(e)}
              onChange={this.updateProperty.bind(this)}
            />
        </div>
    }
}

export default Login
