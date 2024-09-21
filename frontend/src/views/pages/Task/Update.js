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
    CFormSelect,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter
} from '@coreui/react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateTask = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        assigned_to: '',
        status: '',
        start_date: '',
        due_date: '',
        is_active: true,
    });

    const [employees, setEmployees] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = localStorage.getItem('access_token');
            try {
                const response = await axios.get(`http://127.0.0.1:8000/tasks/${id}/`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                setFormData(response.data);

                const employeesResponse = await axios.get('http://127.0.0.1:8000/employees/', { headers: { Authorization: `Bearer ${accessToken}` } });
                setEmployees(employeesResponse.data);
            } catch (error) {
                console.error('Error fetching task:', error);
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
            await axios.put(`http://127.0.0.1:8000/tasks/${id}/`, formData, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setModalMessage('Task updated successfully!');
            setModalVisible(true);
        } catch (error) {
            setModalMessage('Error updating task: ' + (error.response?.data?.detail || 'An error occurred'));
            setModalVisible(true);
        }
    };

    return (
        <>
            <CCard>
                <CCardHeader><h3 className='pt-2'>Update Task</h3></CCardHeader>
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
                            <CFormLabel htmlFor="assigned_to" className='h5'>Assigned To</CFormLabel>
                            <CFormSelect
                                size='lg'
                                id="assigned_to"
                                name="assigned_to"
                                value={formData.assigned_to}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Employee</option>
                                {employees.map((emp) => (
                                    <option key={emp.employee_id} value={emp.employee_id}>
                                        {emp.first_name} {emp.last_name}
                                    </option>
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
                                <option value="">Select Status</option>
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
                                value={formData.start_date.split('T')[0]} // Format date
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
                                value={formData.due_date.split('T')[0]} // Format date
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
                        <CButton type="submit" color="primary">Update Task</CButton>
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

export default UpdateTask;
