import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate()
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, values);
      toast.success('Registration successful! You can now log in.');
      navigate("/login");
      console.log(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed!');
    }
  };

  return (
    <Container>
      <div className='d-flex justify-content-center align-items-center page'>
        <div className="loginRegisterForm">
          <h2>Register</h2>
          <Formik
            initialValues={{ fullName: '', email: '', password: '' }}
            validationSchema={Yup.object({
              fullName: Yup.string().required('Required'),
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
                <label htmlFor="fullName">Full Name</label>
                <Field name="fullName" type="text" className="form-control" />
                <ErrorMessage name="fullName" component="div" className="text-danger" />
              </div>
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
              <button type="submit" className="loginRegisterBtn">Register</button>
            </Form>
          </Formik>
        </div>
      </div>
    </Container>
  );
};

export default RegisterPage;
