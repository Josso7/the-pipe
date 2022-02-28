import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';
import Demo from '../auth/Demo';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <form className='login-form-container' onSubmit={onLogin}>
      <div className='sign-in-text-container'>
        Sign in
      </div>
      <div className='to-continue-text-container'>
        to continue to ThePipe
      </div>
      <div>
        {errors.map((error, ind) => (
          <div className='login-error-message-container' key={ind}>{error}</div>
        ))}
      </div>
      <div className='email-input-container'>
        <label className='email-input-label' htmlFor='email'></label>
        <input
          required
          className='email-input'
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className='password-input-container'>
        <label htmlFor='password'></label>
        <input
          required
          className='password-input'
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
      </div>
      <button className='submit-button' type='submit'>LOGIN</button>
      <Demo />
    </form>
  );
};

export default LoginForm;
