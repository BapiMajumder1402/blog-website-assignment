import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {Container} from 'react-bootstrap';
import { useDispatch } from 'react-redux'; 
import { login } from '../../redux/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, values);
      toast.success('Login successful!');
      dispatch(login({
        user: response.data.data.user,
        accessToken: response.data.data.accessToken,
      }));
      console.log(response.data);
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed!');
    }
  };

  return (

    <Container>

  <div className='d-flex justify-content-center align-items-center page'>
        <div className="loginRegisterForm">
          <h2>Login</h2>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
              password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Required'),
            })}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>
              <button type="submit" className="loginRegisterBtn">Login</button>
            </Form>
          </Formik>
          </div>
          </div>
    </Container>
  );
};

export default LoginPage;
