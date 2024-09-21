import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { CCard, CCardHeader, CCardBody, CButton, CSpinner, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilDelete, cilPen } from '@coreui/icons';

const TaskIndex = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [filterText, setFilterText] = useState('');
    const navigate = useNavigate();

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <input
                key="search"
                type="text"
                placeholder="Search by title..."
                style={{
                    width: '20%',
                    padding: '5px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '14px',
                    backgroundColor: '#fff',
                    transition: 'border-color 0.3s ease'
                }}
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
            />
        );
    }, [filterText]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/tasks/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTasks(response.data);
            } catch (err) {
                setError('Something went wrong while fetching tasks');
                setModalVisible(true);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.delete(`http://127.0.0.1:8000/tasks/${taskToDelete}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTasks(tasks.filter(task => task.task_id !== taskToDelete));
            setConfirmDeleteModal(false); // Close the confirmation modal
        } catch (err) {
            setError('Something went wrong while deleting the task');
            setModalVisible(true);
            setConfirmDeleteModal(false);
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    if (loading) return <CSpinner color="primary" className='mx-auto d-flex' />;

    const columns = [
        {
            name: 'Task ID',
            selector: row => row.task_id,
            sortable: true,
        },
        {
            name: 'Project',
            selector: row => row.project.title,
            sortable: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Assigned To',
            selector: row => `${row.assigned_to.first_name} ${row.assigned_to.last_name}`,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Start Date',
            selector: row => new Date(row.start_date).toLocaleDateString(),
            sortable: true,
        },
        {
            name: 'Due Date',
            selector: row => new Date(row.due_date).toLocaleDateString(),
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className='no-wrap flex d-flex flex-row gap-3'>
                    <CButton size="sm" color="warning" onClick={() => navigate(`/tasks/update/${row.task_id}`)}><CIcon icon={cilPen}></CIcon></CButton>{' '}
                    <CButton size="sm" color="danger" onClick={() => { setTaskToDelete(row.task_id); setConfirmDeleteModal(true); }}><CIcon icon={cilDelete}></CIcon></CButton>
                </div>
            ),
        },
    ];

    const filteredItems = tasks.filter(
        item => item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <>
            <CCard className='mb-4'>
                <CCardHeader className='d-flex flex-row justify-content-between'>
                    <h2 className='flex-item flex-grow-1'>Task Management</h2>
                    <CButton color="primary my-1" onClick={() => navigate('/tasks/create')}>Create New</CButton>
                </CCardHeader>
                <CCardBody>
                    <DataTable
                        columns={columns}
                        data={filteredItems}
                        pagination
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[10, 20, 30]}
                        highlightOnHover
                        pointerOnHover
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        responsive
                    />
                </CCardBody>
            </CCard>

            <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
                <CModalHeader closeButton>
                    <CModalTitle>Error</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <p>{error}</p>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalVisible(false)}>Close</CButton>
                    <CButton color="primary" onClick={handleLoginRedirect}>Go to Login</CButton>
                </CModalFooter>
            </CModal>

            <CModal visible={confirmDeleteModal} onClose={() => setConfirmDeleteModal(false)}>
                <CModalHeader closeButton>
                    <CModalTitle>Confirm Deletion</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <p>Are you sure you want to delete this task?</p>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setConfirmDeleteModal(false)}>Cancel</CButton>
                    <CButton color="danger" onClick={handleDelete}>Delete</CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default TaskIndex;
