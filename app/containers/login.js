import React from 'react';

import LoginForm from '../components/loginform';

const Login = ({ viewStore }) => {
    return <LoginForm
      performLogin={(...args) => viewStore.performLogin(...args)}
      afterLogin={() => viewStore.showHomepage()}
    />;
};

export default Login;
