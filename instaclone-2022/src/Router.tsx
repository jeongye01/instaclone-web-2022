import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Layout from './components/Layout';
import { authService } from './fbase';
import useUser from './redux/Auth/userHooks';
import Profile from './screens/Profile';
function Router() {
  const { isLoggedIn, login, logout } = useUser();
  const [init, setInit] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        login(user);
      } else {
        logout();
      }
      setInit(true);
    });
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        {init ? (
          <Route path={['/', '/create/select', '/create/details']} exact>
            {isLoggedIn ? (
              <Layout>
                <Home />
              </Layout>
            ) : (
              <Login />
            )}
          </Route>
        ) : (
          <h1>Initializing...</h1>
        )}
        {!isLoggedIn ? (
          <Route path="/sign-up" exact>
            <SignUp />
          </Route>
        ) : null}
        <Route path={['/:username', '/create/select', '/create/details']} exact>
          <Layout>
            <Profile />
          </Layout>
        </Route>
        <Route>
          <div>Not Found</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
/*
 */
