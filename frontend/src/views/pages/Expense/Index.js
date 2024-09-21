import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { CCard, CCardHeader, CCardBody, CButton, CSpinner, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilDelete, cilPen } from '@coreui/icons';

const ExpenseIndex = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
    const [expenseToDelete, setExpenseToDelete] = useState(null);
    const [filterText, setFilterText] = useState('');
    const navigate = useNavigate();

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <input
                key="search"
                type="text"
                placeholder="Search by description..."
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
        const fetchExpenses = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/expenses/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setExpenses(response.data);
            } catch (err) {
                setError('Something went wrong while fetching expenses');
                setModalVisible(true);
            } finally {
                setLoading(false);
            }
        };

        fetchExpenses();
    }, []);

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.delete(`http://127.0.0.1:8000/expenses/${expenseToDelete}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setExpenses(expenses.filter(expense => expense.id !== expenseToDelete));
            setConfirmDeleteModal(false); // Close the confirmation modal
        } catch (err) {
            setError('Something went wrong while deleting the expense');
            setModalVisible(true);
            setConfirmDeleteModal(false);
        }
    };

    if (loading) return <CSpinner color="primary" className='mx-auto d-flex' />;

    const columns = [
        {
            name: 'Expense ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: row => row.amount,
            sortable: true,
            format: row => `₹${row.amount.toFixed(2)}`,
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Project',
            selector: row => row.project.title, 
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => new Date(row.date).toLocaleDateString(),
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className='no-wrap flex d-flex flex-row gap-3'>
                    <CButton size="sm" color="warning" onClick={() => navigate(`/expenses/update/${row.id}`)}><CIcon icon={cilPen}></CIcon></CButton>{' '}
                    <CButton size="sm" color="danger" onClick={() => { setExpenseToDelete(row.id); setConfirmDeleteModal(true); }}><CIcon icon={cilDelete}></CIcon></CButton>
                </div>
            ),
        },
    ];

    const filteredItems = expenses.filter(
        item => item.description && item.description.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <>
            <CCard className='mb-4'>
                <CCardHeader className='d-flex flex-row justify-content-between'>
                    <h2 className='flex-item flex-grow-1'>Expense Management</h2>
                    <CButton color="primary my-1" onClick={() => navigate('/expenses/create')}>Create New</CButton>
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
                    <p>Are you sure you want to delete this expense?</p>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setConfirmDeleteModal(false)}>Cancel</CButton>
                    <CButton color="danger" onClick={handleDelete}>Delete</CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default ExpenseIndex;
