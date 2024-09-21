import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    CCard,
    CCardHeader,
    CCardBody,
    CForm,
    CFormCheck,
    CFormLabel,
    CFormInput,
    CFormSelect,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter
} from '@coreui/react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateRole = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        department: '',
        is_active: true,
    });
    const [departments, setDepartments] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = localStorage.getItem('access_token');
            try {
                const roleResponse = await axios.get(`http://127.0.0.1:8000/roles/${id}/`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                setFormData(roleResponse.data);

                const departmentResponse = await axios.get('http://127.0.0.1:8000/departments/', {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                setDepartments(departmentResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('access_token');

        try {
            await axios.put(`http://127.0.0.1:8000/roles/${id}/`, formData, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setModalMessage('Role updated successfully!');
            setModalVisible(true);
        } catch (error) {
            setModalMessage('Error updating role: ' + (error.response?.data?.detail || 'An error occurred'));
            setModalVisible(true);
        }
    };

    return (
        <>
            <CCard>
                <CCardHeader><h3 className='pt-2'>Update Role</h3></CCardHeader>
                <CCardBody>
                    <CForm onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <CFormLabel htmlFor="name" className='h5'>Role Name</CFormLabel>
                            <CFormInput
                                size='lg'
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter role name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="description" className='h5'>Description</CFormLabel>
                            <CFormInput
                                size='lg'
                                type="text"
                                id="description"
                                name="description"
                                placeholder="Enter description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="department" className='h5'>Department</CFormLabel>
                            <CFormSelect
                            size='lg'
                                id="department"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Department</option>
                                {departments.map(department => (
                                    <option key={department.department_id} value={department.department_id}>
                                        {department.department_name}
                                    </option>
                                ))}
                            </CFormSelect>
                        </div>
                        <div className='mb-3'>
                            <CFormCheck
                                type="checkbox"
                                id="is_active"
                                name="is_active"
                                label="Active"
                                checked={formData.is_active}
                                onChange={handleChange}
                            />
                        </div>
                        <CButton type="submit" color="primary">Update Role</CButton>
                    </CForm>
                </CCardBody>
            </CCard>

            <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
                <CModalHeader onClose={() => setModalVisible(false)}>
                    <CModalTitle>Notification</CModalTitle>
                </CModalHeader>
                <CModalBody>{modalMessage}</CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalVisible(false)}>Close</CButton>
                    {modalMessage.includes('successfully') && (
                        <CButton color="primary" onClick={() => navigate('/roles')}>Go to Roles</CButton>
                    )}
                </CModalFooter>
            </CModal>
        </>
    );
};

export default UpdateRole;
