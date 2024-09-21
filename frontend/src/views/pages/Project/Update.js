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

const UpdateProject = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        status: '',
        department: '',
        project_expense: '',
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
                const response = await axios.get(`http://127.0.0.1:8000/projects/${id}/`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                setFormData(response.data);

                const departmentsResponse = await axios.get('http://127.0.0.1:8000/departments/', { headers: { Authorization: `Bearer ${accessToken}` } });
                setDepartments(departmentsResponse.data);
            } catch (error) {
                console.error('Error fetching project:', error);
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
            await axios.put(`http://127.0.0.1:8000/projects/${id}/`, formData, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setModalMessage('Project updated successfully!');
            setModalVisible(true);
        } catch (error) {
            setModalMessage('Error updating project: ' + (error.response?.data?.detail || 'An error occurred'));
            setModalVisible(true);
        }
    };

    return (
        <>
            <CCard>
                <CCardHeader><h3 className='pt-2'>Update Project</h3></CCardHeader>
                <CCardBody>
                    <CForm onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <CFormLabel htmlFor="title" className='h5'>Title</CFormLabel>
                            <CFormInput
                                size='lg'
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter project title"
                                value={formData.title}
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
                                placeholder="Enter project description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="start_date" className='h5'>Start Date</CFormLabel>
                            <CFormInput
                                size='lg'
                                type="date"
                                id="start_date"
                                name="start_date"
                                value={formData.start_date.split('T')[0]} // Format date
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="end_date" className='h5'>End Date</CFormLabel>
                            <CFormInput
                                size='lg'
                                type="date"
                                id="end_date"
                                name="end_date"
                                value={formData.end_date.split('T')[0]} // Format date
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="status" className='h5'>Status</CFormLabel>
                            <CFormSelect
                                size='lg'
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="not_started">Not Started</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="on_hold">On Hold</option>
                            </CFormSelect>
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
                            <CFormLabel htmlFor="project_expense" className='h5'>Project Expense</CFormLabel>
                            <CFormInput
                                size='lg'
                                type="number"
                                id="project_expense"
                                name="project_expense"
                                placeholder="Enter project expense"
                                value={formData.project_expense}
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
                        <CButton type="submit" color="primary">Update Project</CButton>
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
                        <CButton color="primary" onClick={() => navigate('/projects')}>Go to Projects</CButton>
                    )}
                </CModalFooter>
            </CModal>
        </>
    );
};

export default UpdateProject;
