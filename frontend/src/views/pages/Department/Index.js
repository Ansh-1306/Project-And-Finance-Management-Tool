import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { CCard, CCardHeader, CCardBody, CButton, CSpinner, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilDelete, cilPen } from '@coreui/icons';

const DepartmentIndex = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteId, setDeleteId] = useState(null); // For storing the id to delete
    const [filterText, setFilterText] = useState('');
    const navigate = useNavigate();

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <input
                key="search"
                type="text"
                placeholder="Search by department name..."
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
        const fetchDepartments = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/departments/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setDepartments(response.data);
            } catch (err) {
                setError(err.message);
                setModalVisible(true);
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.delete(`http://localhost:8000/departments/${deleteId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDepartments(departments.filter(department => department.department_id !== deleteId)); // Update state
        } catch (err) {
            setError('Failed to delete the department');
            setModalVisible(true);
        } finally {
            setDeleteModalVisible(false);
        }
    };

    if (loading) return <CSpinner color="primary" className='mx-auto d-flex' />;

    const columns = [
        {
            name: 'Department ID',
            selector: row => row.department_id,
            sortable: true,
            omit: window.innerWidth < 768,
        },
        {
            name: 'Department Name',
            selector: row => row.department_name,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className='no-wrap flex d-flex flex-row gap-3'>
                    <CButton size="sm" color="warning" onClick={() => navigate(`/departments/update/${row.department_id}`)}><CIcon icon={cilPen}></CIcon></CButton>{' '}
                    <CButton size="sm" color="danger" onClick={() => { setDeleteModalVisible(true); setDeleteId(row.department_id); }}>
                        <CIcon icon={cilDelete}></CIcon>
                    </CButton>
                </div>
            ),
        },
    ];

    const filteredItems = departments.filter(
        item => item.department_name && item.department_name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <>
            <CCard className='mb-4'>
                <CCardHeader className='d-flex flex-row justify-content-between'>
                    <h2 className='flex-item flex-grow-1'>Department Management</h2>
                    <CButton color="primary my-1" onClick={() => navigate('/departments/create')}>Create New</CButton>
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

            {/* Error Modal */}
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

            {/* Delete Confirmation Modal */}
            <CModal visible={deleteModalVisible} onClose={() => setDeleteModalVisible(false)}>
                <CModalHeader closeButton>
                    <CModalTitle>Confirm Deletion</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <p>Are you sure you want to delete this department?</p>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setDeleteModalVisible(false)}>Cancel</CButton>
                    <CButton color="danger" onClick={handleDelete}>Delete</CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default DepartmentIndex;
