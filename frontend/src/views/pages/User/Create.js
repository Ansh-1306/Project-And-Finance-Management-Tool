import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CCard, CCardHeader, CCardBody, CForm, CFormLabel, CFormInput, CButton, CFormCheck } from '@coreui/react';
import { Navigate } from 'react-router-dom';

const UserCreate = () => {

    const [formData, setFormData] = useState({
        username: '',
        user_email: '',
        password: '',
        is_active: true,
        is_staff: true,
        is_superuser: false,
    });



    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/users/create/', formData);
            alert('User created successfully!');
            setFormData({ username: '', user_email: '', password: '', is_active: true, is_staff: true, is_superuser: false });  // Reset form
            const navigate = Navigate()
            navigate('users')
        } catch (error) {
            alert('Error creating user: ' + (error.response?.data?.detail || 'An error occurred'));
        }
    };

    return (
        <>
            <CCard>
                <CCardHeader><h3 className='pt-2'>Create User</h3></CCardHeader>
                <CCardBody>
                    <CForm onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <CFormLabel htmlFor="username" className='h5'>Username</CFormLabel>
                            <CFormInput
                                size='lg'
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="user_email" className='h5'>Email address</CFormLabel>
                            <CFormInput
                                size='lg'
                                type="email"
                                id="user_email"
                                name="user_email"
                                placeholder="name@example.com"
                                value={formData.user_email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="password" className='h5'>Password</CFormLabel>
                            <CFormInput
                                size='lg'
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mb-3 d-flex flex-column justify-content-around'>
                            <CFormCheck
                                type="checkbox"
                                id="is_active"
                                name="is_active"
                                label="Active"
                                checked={formData.is_active}
                                onChange={handleChange}
                            />
                            <CFormCheck
                            className='mr-4'
                                type="checkbox"
                                id="is_staff"
                                name="is_staff"
                                label="Staff"
                                checked={formData.is_staff}
                                onChange={handleChange}
                            />
                            <CFormCheck
                                className='mr-4'
                                type="checkbox"
                                id="is_superuser"
                                name="is_superuser"
                                label="Superuser"
                                checked={formData.is_superuser}
                                onChange={handleChange}
                            />
                        </div>
                        <CButton type="submit" color="primary">Create User</CButton>
                    </CForm>
                </CCardBody>
            </CCard>
        </>
    );
};

export default UserCreate;
