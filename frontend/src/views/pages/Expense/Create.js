import React from 'react'
import DataTable from 'react-data-table-component';
import { CCard, CCardHeader, CCardBody,CForm, CFormLabel, CFormInput } from '@coreui/react'

const ExpenseCreate = () => {
    return (
        <>
            <CCard>
                <CCardHeader><h3 className='pt-2'>Create Expense</h3></CCardHeader>
                <CCardBody>
                    <CForm>
                        <div className="mb-3">
                            <CFormLabel htmlFor="email" className='h5'>Email address</CFormLabel>
                            <CFormInput
                            size='lg'
                                type="email"
                                id="exampleFormControlInput1"
                                placeholder="name@example.com"
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="password" className='h5'>Password</CFormLabel>
                            <CFormInput
                            size='lg'
                                type="password"
                                id="password"
                                placeholder="password"
                            />
                        </div>
                    </CForm>
                </CCardBody>
            </CCard>
        </>
    )
}
export default ExpenseCreate 