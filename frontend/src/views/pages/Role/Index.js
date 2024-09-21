import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { CCard, CCardHeader, CCardBody, CButton, CSpinner, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilDelete, cilPen } from '@coreui/icons';

const RoleIndex = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState(null);
    const [filterText, setFilterText] = useState('');
    const navigate = useNavigate();

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <input
                key="search"
                type="text"
                placeholder="Search by role name..."
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
        const fetchRoles = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/roles/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setRoles(response.data);
            } catch (err) {
                setError(err.message);
                setModalVisible(true);
            } finally {
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.delete(`http://127.0.0.1:8000/roles/${roleToDelete}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setRoles(roles.filter(role => role.role_id !== roleToDelete));
            setConfirmDeleteModal(false); // Close the confirmation modal
        } catch (err) {
            setError('Something went wrong while deleting the role');
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
            name: 'Role ID',
            selector: row => row.role_id,
            sortable: true,
            omit: window.innerWidth < 768,
        },
        {
            name: 'Role Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Department',
            selector: row => row.department.department_name, // Assuming 'department' has a 'department_name' field
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className='no-wrap flex d-flex flex-row gap-3'>
                    <CButton size="sm" color="warning" onClick={() => navigate(`/roles/update/${row.role_id}`)}><CIcon icon={cilPen}></CIcon></CButton>{' '}
                    <CButton size="sm" color="danger" onClick={() => { setRoleToDelete(row.role_id); setConfirmDeleteModal(true); }}><CIcon icon={cilDelete}></CIcon></CButton>
                </div>
            ),
        },
    ];

    const filteredItems = roles.filter(
        item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <>
            <CCard className='mb-4'>
                <CCardHeader className='d-flex flex-row justify-content-between'>
                    <h2 className='flex-item flex-grow-1'>Role Management</h2>
                    <CButton color="primary my-1" onClick={() => navigate('/roles/create')}>Create New</CButton>
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
                    <p>Are you sure you want to delete this role?</p>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setConfirmDeleteModal(false)}>Cancel</CButton>
                    <CButton color="danger" onClick={handleDelete}>Delete</CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default RoleIndex;
