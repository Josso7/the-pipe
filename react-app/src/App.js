import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import { authenticate } from './store/session';
import Channel from './components/Channel';
import ManageVideos from './components/ManageVideos'
import HomePage from './components/HomePage'
import Videos from './components/Videos';
import SplashPage from './components/SplashPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/login'>
          <LoginForm />
        </Route>
        <Route exact path='/sign-up'>
          <SignUpForm />
        </Route>
        <ProtectedRoute exact path='/users'>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute exact path='/user/channel'>
          <Channel />
        </ProtectedRoute>
        <ProtectedRoute exact path='/user/channel/videos'>
          <ManageVideos />
        </ProtectedRoute>
        <Route exact path='/videos/:id'>
          <Videos />
        </Route>
        <Route exact path='/home' >
          <HomePage />
        </Route>
        <Route exact path='/' >
          <SplashPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
