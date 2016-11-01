import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
class LoginForm extends Component {
    @observable details = {};
    @observable message = 'login pls';

    updateProperty(key, value) {
        this.details[key] = value;
    }

    onSubmit(e) {
        e.preventDefault();
        const { username, password } = this.details;

        if (!username) {
            this.message = 'pls enter username';
            return;
        } else if (!password) {
            this.message = 'where is the password?';
            return;
        }

        this.message = 'verifiying..';
        this.props.performLogin(
            username,
            password,
            authenticated => {
                if (authenticated) {
                    this.message = 'login accepted';
                    this.props.afterLogin();
                } else {
                    this.message = 'login failed';
                }
            }
        );
    }

    render() {
        const { username, password, message } = this;
        return <form onSubmit={e => this.onSubmit(e)}>
            <h2>{message}</h2>
            <input onChange={e => this.updateProperty('username', e.target.value)} value={username} type="text" />
            <input onChange={e => this.updateProperty('password', e.target.value)} value={password} type="password" />
            <button type="submit">Submit</button>
        </form>;
    }

}

export default LoginForm;
