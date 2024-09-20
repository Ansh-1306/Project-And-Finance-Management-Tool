import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'

const Page404 = () => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row justify-content-center align-items-center">
      <CContainer>
        <CRow className="justify-content-center text-nowrap">
          <CCol md={8} className="d-flex flex-row justify-content-center">
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">404</h1>
              <h4 className="pt-4">Oops! You{"'"}re lost.</h4>
              <p className="text-body-secondary float-start">
                The page you are looking for was not found.
              </p>
            </div>  
          </CCol>
          <CCol md={8} className="d-flex flex-row justify-content-center">
          <h4 className='block clearfix mx-5'>
              Go to <Link to="/">Dashboard</Link>.
            </h4>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404
