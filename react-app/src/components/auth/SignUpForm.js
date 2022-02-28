import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    let data = [];
    e.preventDefault();
    if (password === repeatPassword) {
      data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
    if(password !== repeatPassword){
      data.push('Passwords do not match');
    }
    setErrors(data)
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <form className='sign-up-form-container' onSubmit={onSignUp}>
      <div className='create-account-text-container'>
        Create your Pipe Account
      </div>
      <div className='to-continue-text-container'>
        to continue to ThePipe
      </div>
      <div>
        {errors.map((error, ind) => (
          <div className='error-message-container' key={ind}>{error}</div>
        ))}
      </div>
      <div className='username-input-container'>
        <label></label>
        <input
        className='username-input'
          placeholder='Username'
          required
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className='email-input-container'>
        <label></label>
        <input
          className='email-input'
          required
          placeholder='Email'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className='password-input-container'>
        <label></label>
        <input
          className='password-input'
          required
          placeholder='Password'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className='repeat-password-input-container'>
        <label></label>
        <input
          className='repeat-password-input'
          placeholder='Repeat Password'
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button className='sign-up-button' type='submit'>SIGN UP</button>
    </form>
  );
};

export default SignUpForm;
