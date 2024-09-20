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

const ExpenseCreate = () => {
    const [formData, setFormData] = useState({
        amount: '',
        description: '',
        project: '',
        date: '',
        is_active: true,
    });

    const [projects, setProjects] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectsResponse = await axios.get('http://127.0.0.1:8000/projects/');
                setProjects(projectsResponse.data);
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
            await axios.post('http://127.0.0.1:8000/expenses/', formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setModalMessage('Expense created successfully!');
            setModalVisible(true);
            setFormData({ amount: '', description: '', project: '', date: '', is_active: true });
        } catch (error) {
            setModalMessage('Error creating expense: ' + (error.response?.data?.detail || 'An error occurred'));
            setModalVisible(true);
        }
    };

    return (
        <>
            <CCard>
                <CCardHeader><h3 className='pt-2'>Create Expense</h3></CCardHeader>
                <CCardBody>
                    <CForm onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <CFormLabel htmlFor="amount" className='h5'>Amount</CFormLabel>
                            <CFormInput
                                size='lg'
                                type="number"
                                id="amount"
                                name="amount"
                                placeholder="Enter expense amount"
                                value={formData.amount}
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
                                placeholder="Enter expense description"
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
                            <CFormLabel htmlFor="date" className='h5'>Date</CFormLabel>
                            <CFormInput
                                size='lg'
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <CButton type="submit" color="primary">Create Expense</CButton>
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
                        <CButton color="primary" onClick={() => navigate('/expenses')}>Go to Expenses</CButton>
                    )}
                </CModalFooter>
            </CModal>
        </>
    );
};

export default ExpenseCreate;
