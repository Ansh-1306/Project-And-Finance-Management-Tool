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

const UpdateExpense = () => {
    const { id } = useParams();
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
            const accessToken = localStorage.getItem('access_token');
            try {
                const response = await axios.get(`http://127.0.0.1:8000/expenses/${id}/`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                setFormData(response.data);

                const projectsResponse = await axios.get('http://127.0.0.1:8000/projects/', { headers: { Authorization: `Bearer ${accessToken}` } });
                setProjects(projectsResponse.data);
            } catch (error) {
                console.error('Error fetching expense:', error);
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
            await axios.put(`http://127.0.0.1:8000/expenses/${id}/`, formData, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setModalMessage('Expense updated successfully!');
            setModalVisible(true);
        } catch (error) {
            setModalMessage('Error updating expense: ' + (error.response?.data?.detail || 'An error occurred'));
            setModalVisible(true);
        }
    };

    return (
        <>
            <CCard>
                <CCardHeader><h3 className='pt-2'>Update Expense</h3></CCardHeader>
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
                                size='lg'
                                id="project"
                                name="project"
                                value={formData.project}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Project</option>
                                {projects.map((proj) => (
                                    <option key={proj.project_id} value={proj.project_id}>
                                        {proj.title}
                                    </option>
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
                                value={formData.date.split('T')[0]} // Format date
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
                        <CButton type="submit" color="primary">Update Expense</CButton>
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

export default UpdateExpense;
