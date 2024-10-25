import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../utils/ProtectedRoutes';
import NavBar from '../components/navBar/Navbar'
import Footer from '../components/footer/Footer'
const HomePage = lazy(() => import('../pages/homePage/HomePage'));
const BlogDetails = lazy(() => import('../pages/blogDetailsPage/BlogDetails'));
const BlogsManagePage = lazy(() => import('../pages/blogsManagePage/BlogsManagePage'));
const BlogsPage = lazy(() => import('../pages/blogsPage/BlogsPage'));
const LoginPage = lazy(() => import('../pages/loginPage/LoginPage'));
const RegisterPage = lazy(() => import('../pages/registerPage/RegisterPage'));

const AppRoutes = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/blog/:id" element={<BlogDetails />} />
                    <Route path="/manage-blogs" element={<ProtectedRoute><BlogsManagePage /></ProtectedRoute>} />
                    <Route path="/blogs" element={<BlogsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
                <Footer/>
            </Suspense>
        </Router>
    );
};

export default AppRoutes;
