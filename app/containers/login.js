import React from 'react';

import LoginForm from '../components/loginform';

const Login = ({ viewStore }) => {
    return <div className="login">
        <LoginForm
          messages={{
              loginFailed: 'login failed',
              loginAccept: 'login accepted',
              failUsername: 'pls enter username',
              failPassword: 'where is the password?',
          }}
          performLogin={(...args) => viewStore.performLogin(...args)}
          afterLogin={() => viewStore.showHomepage()}
        />
    </div>;
};

export default Login;
