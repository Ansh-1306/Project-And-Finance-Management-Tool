import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    CCard,
    CCardHeader,
    CCardBody,
    CForm,
    CFormLabel,
    CFormInput,
    CFormCheck,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter
} from '@coreui/react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateDepartment = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        department_name: '',
        description: '',
        is_active: true,
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartment = async () => {
            const accessToken = localStorage.getItem('access_token');
            try {
                const response = await axios.get(`http://127.0.0.1:8000/departments/${id}/`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching department:', error);
            }
        };

        fetchDepartment();
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
            await axios.put(`http://127.0.0.1:8000/departments/${id}/`, formData, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setModalMessage('Department updated successfully!');
            setModalVisible(true);
        } catch (error) {
            setModalMessage('Error updating department: ' + (error.response?.data?.detail || 'An error occurred'));
            setModalVisible(true);
        }
    };

    return (
        <>
            <CCard>
                <CCardHeader><h3 className='pt-2'>Update Department</h3></CCardHeader>
                <CCardBody>
                    <CForm onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <CFormLabel htmlFor="department_name" className='h5'>Department Name</CFormLabel>
                            <CFormInput
                                size='lg'
                                type="text"
                                id="department_name"
                                name="department_name"
                                placeholder="Enter department name"
                                value={formData.department_name}
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
                        <CButton type="submit" color="primary">Update Department</CButton>
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
                        <CButton color="primary" onClick={() => navigate('/departments')}>Go to Departments</CButton>
                    )}
                </CModalFooter>
            </CModal>
        </>
    );
};

export default UpdateDepartment;
