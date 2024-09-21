import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilNotes,
  cilHome,
  cilUser,
  cilPeople,
  cilTask,
  cilDollar,
  cilAccountLogout,
  cilBuilding,
  cilTransfer,
  cilContact
} from '@coreui/icons'
import {  CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'User',
    to: '/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Employee',
    to: '/employees',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Department',
    to: '/departments',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Role',
    to: '/roles',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Project',
    to: '/projects',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Task',
    to: '/tasks',
    icon: <CIcon icon={cilTask} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Expense',
    to: '/expenses',
    icon: <CIcon icon={cilDollar} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Logout',
    to: '/login',
    onClick: () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />
  }
]

export default _nav
