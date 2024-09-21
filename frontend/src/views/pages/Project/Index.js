import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { CCard, CCardHeader, CCardBody, CButton, CSpinner, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilDelete, cilFile, cilPen,  } from '@coreui/icons';

const ProjectIndex = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
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
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/projects/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProjects(response.data);
            } catch (err) {
                setError(err.message);
                setModalVisible(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    if (loading) return <CSpinner color="primary" className='mx-auto d-flex' />;

    const columns = [
        {
            name: 'Project ID',
            selector: row => row.project_id,
            sortable: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
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
            name: 'End Date',
            selector: row => new Date(row.end_date).toLocaleDateString(),
            sortable: true,
        },
        {
            name: 'Department',
            selector: row => row.department.department_name, // Assuming department has a name field
            sortable: true,
        },
        {
            name: 'Expense',
            selector: row => `₹${row.project_expense}`,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className='no-wrap flex d-flex flex-row gap-3'>
                    {/* <CButton size="sm" className='no-wrap' color="info" onClick={() => navigate(`/projects/${row.project_id}`)}><CIcon icon={cilFile}></CIcon></CButton>{' '} */}
                    <CButton size="sm" color="warning" onClick={() => navigate(`/projects/update/${row.project_id}`)}><CIcon icon={cilPen}></CIcon></CButton>{' '}
                    <CButton size="sm" color="danger"><CIcon icon={cilDelete}></CIcon></CButton>
                </div>
            ),
        },
    ];

    const filteredItems = projects.filter(
        item => item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <>
            <CCard className='mb-4'>
                <CCardHeader className='d-flex flex-row justify-content-between'>
                    <h2 className='flex-item flex-grow-1'>Project Management</h2>
                    <CButton color="primary my-1" onClick={() => navigate('/projects/create')}>Create New</CButton>
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
        </>
    );
};

export default ProjectIndex;
