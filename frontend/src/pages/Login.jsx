import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { login, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';

import heroImage from './hero.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      // console.log(" error");
      // toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isLoading, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // console.log(" you submit the login form");
    const userData = {
      email,
      password,
    };
    // console.log("loging data", userData)
    dispatch(login(userData));
  };

  return (
    <div className='container'>
      <div className='left-container'>
        <div className='hero-text'>
          <h1 className='custom-font'> Memorify </h1>
          <p>Capture Moments, Share Memories.</p>
        </div>

        <div className='hero-image'>
          <img src={heroImage} alt='' />
        </div>
      </div>
      <div className='right-container'>
        <div className='header'>
          <h2>Login</h2>
          <p>please login to your account</p>
        </div>

        {/* form section  */}

        <form className='form' onSubmit={onSubmit}>
          {/* div for form field */}

          <div>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              placeholder='enter your email'
              onChange={onChange}
            />
          </div>

          <div>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='enter your password'
              onChange={onChange}
            />
          </div>

          <button type='submit'>Submit</button>
        </form>

        {/*  for register section */}
        <div>
          <p>
            {' '}
            Need an Account ?{' '}
            <Link to='/register'>
              <span> Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
