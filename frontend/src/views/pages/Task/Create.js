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

const TaskCreate = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        project: '',
        assigned_to: '',
        status: '',
        start_date: '',
        due_date: '',
        is_active: true,
    });

    const [projects, setProjects] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectsResponse = await axios.get('http://127.0.0.1:8000/projects/');
                const employeesResponse = await axios.get('http://127.0.0.1:8000/employees/');
                
                setProjects(projectsResponse.data);
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
            await axios.post('http://127.0.0.1:8000/tasks/', formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setModalMessage('Task created successfully!');
            setModalVisible(true);
            setFormData({ title: '', description: '', project: '', assigned_to: '', status: '', start_date: '', due_date: '', is_active: true });
        } catch (error) {
            setModalMessage('Error creating task: ' + (error.response?.data?.detail || 'An error occurred'));
            setModalVisible(true);
        }
    };

    return (
        <>
            <CCard>
                <CCardHeader><h3 className='pt-2'>Create Task</h3></CCardHeader>
                <CCardBody>
                    <CForm onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <CFormLabel htmlFor="title" className='h5'>Title</CFormLabel>
                            <CFormInput
                                size='lg'
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter task title"
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
                                placeholder="Enter task description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="project" className='h5'>Project</CFormLabel>
                            <CFormSelect
                                id="project"
                                name="project"
                                size='lg'
                                value={formData.project}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a project</option>
                                {projects.map(project => (
                                    <option key={project.project_id} value={project.project_id}>{project.title}</option>
                                ))}
                            </CFormSelect>
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="assigned_to" className='h5'>Assigned To</CFormLabel>
                            <CFormSelect
                                id="assigned_to"
                                name="assigned_to"
                                size='lg'
                                value={formData.assigned_to}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select an employee</option>
                                {employees.map(employee => (
                                    <option key={employee.employee_id} value={employee.employee_id}>{employee.first_name} {employee.last_name}</option>
                                ))}
                            </CFormSelect>
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
                                <option value="">Select status</option>
                                <option value="not_started">Not Started</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="on_hold">On Hold</option>
                            </CFormSelect>
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
                            <CFormLabel htmlFor="due_date" className='h5'>Due Date</CFormLabel>
                            <CFormInput
                                size='lg'
                                type="date"
                                id="due_date"
                                name="due_date"
                                value={formData.due_date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <CButton type="submit" color="primary">Create Task</CButton>
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
                        <CButton color="primary" onClick={() => navigate('/tasks')}>Go to Tasks</CButton>
                    )}
                </CModalFooter>
            </CModal>
        </>
    );
};

export default TaskCreate;
