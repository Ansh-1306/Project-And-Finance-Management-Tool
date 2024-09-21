import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    CCard,
    CCardHeader,
    CCardBody,
    CForm,
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
import { useNavigate } from 'react-router-dom';

const ProjectCreate = () => {
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
    const [employees, setEmployees] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const departmentsResponse = await axios.get('http://127.0.0.1:8000/departments/');
                const employeesResponse = await axios.get('http://127.0.0.1:8000/employees/');
                
                setDepartments(departmentsResponse.data);
                setEmployees(employeesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('access_token');

        try {
            await axios.post('http://127.0.0.1:8000/projects/', formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setModalMessage('Project created successfully!');
            setModalVisible(true);
            setFormData({ title: '', description: '', start_date: '', end_date: '', status: '', department: '', project_expense: '', is_active: true });
        } catch (error) {
            setModalMessage('Error creating project: ' + (error.response?.data?.detail || 'An error occurred'));
            setModalVisible(true);
        }
    };

    return (
        <>
            <CCard>
                <CCardHeader><h3 className='pt-2'>Create Project</h3></CCardHeader>
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
                                value={formData.start_date}
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
                                value={formData.end_date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="status" className='h5'>Status</CFormLabel>
                            <CFormSelect
                                id="status"
                                name="status"
                                size='lg'
                                value={formData.status}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select status</option>
                                <option value="not_started">Not Started</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="on_hold">On Hold</option>
                            </CFormSelect>
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="department" className='h5'>Department</CFormLabel>
                            <CFormSelect
                                id="department"
                                name="department"
                                size='lg'
                                value={formData.department}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a department</option>
                                {departments.map(department => (
                                    <option key={department.id} value={department.id}>{department.department_name}</option>
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
                        <CButton type="submit" color="primary">Create Project</CButton>
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

export default ProjectCreate;
