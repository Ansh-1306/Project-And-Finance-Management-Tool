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

const UpdateEmployee = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone_no: '',
        user: '',
        department: '',
        role: '',
        date_of_birth: '',
        joining_date: '',
        salary: '',
        is_active: true,
    });

    const [departments, setDepartments] = useState([]);
    const [roles, setRoles] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = localStorage.getItem('access_token');
            try {
                const response = await axios.get(`http://127.0.0.1:8000/employees/${id}/`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                setFormData(response.data);
                
                const departmentsResponse = await axios.get('http://127.0.0.1:8000/departments/', { headers: { Authorization: `Bearer ${accessToken}` } });
                setDepartments(departmentsResponse.data);
                
                const rolesResponse = await axios.get('http://127.0.0.1:8000/roles/', { headers: { Authorization: `Bearer ${accessToken}` } });
                setRoles(rolesResponse.data);
            } catch (error) {
                console.error('Error fetching employee:', error);
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
            await axios.put(`http://127.0.0.1:8000/employees/${id}/`, formData, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setModalMessage('Employee updated successfully!');
            setModalVisible(true);
        } catch (error) {
            setModalMessage('Error updating employee: ' + (error.response?.data?.detail || 'An error occurred'));
            setModalVisible(true);
        }
    };

    return (
        <>
            <CCard>
                <CCardHeader><h3 className='pt-2'>Update Employee</h3></CCardHeader>
                <CCardBody>
                    <CForm onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <CFormLabel htmlFor="first_name" className='h5'>First Name</CFormLabel>
                            <CFormInput
                                size='lg'
                                type="text"
                                id="first_name"
                                name="first_name"
                                placeholder="Enter first name"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="last_name" className='h5'>Last Name</CFormLabel>
                            <CFormInput
                                size='lg'
                                type="text"
                                id="last_name"
                                name="last_name"
                                placeholder="Enter last name"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="phone_no" className='h5'>Phone No</CFormLabel>
                            <CFormInput
                                size='lg'
                                type="text"
                                id="phone_no"
                                name="phone_no"
                                placeholder="Enter phone number"
                                value={formData.phone_no}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="user" className='h5'>User</CFormLabel>
                            <CFormInput
                                size='lg'
                                type="text"
                                id="user"
                                name="user"
                                placeholder="Enter user ID"
                                value={formData.user}
                                onChange={handleChange}
                                required
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
                                {departments.map((dept) => (
                                    <option key={dept.department_id} value={dept.department_id}>
                                        {dept.department_name}
                                    </option>
                                ))}
                            </CFormSelect>
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="role" className='h5'>Role</CFormLabel>
                            <CFormSelect
                                size='lg'
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Role</option>
                                {roles.map((role) => (
                                    <option key={role.role_id} value={role.role_id}>
                                        {role.role_name}
                                    </option>
                                ))}
                            </CFormSelect>
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="date_of_birth" className='h5'>Date of Birth</CFormLabel>
                            <CFormInput
                                size='lg'
                                type="date"
                                id="date_of_birth"
                                name="date_of_birth"
                                value={formData.date_of_birth.split('T')[0]} // Format date
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="joining_date" className='h5'>Joining Date</CFormLabel>
                            <CFormInput
                                size='lg'
                                type="date"
                                id="joining_date"
                                name="joining_date"
                                value={formData.joining_date.split('T')[0]} // Format date
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="salary" className='h5'>Salary</CFormLabel>
                            <CFormInput
                                size='lg'
                                type="number"
                                id="salary"
                                name="salary"
                                placeholder="Enter salary"
                                value={formData.salary}
                                onChange={handleChange}
                                required
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
                        <CButton type="submit" color="primary">Update Employee</CButton>
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
                        <CButton color="primary" onClick={() => navigate('/employees')}>Go to Employees</CButton>
                    )}
                </CModalFooter>
            </CModal>
        </>
    );
};

export default UpdateEmployee;
