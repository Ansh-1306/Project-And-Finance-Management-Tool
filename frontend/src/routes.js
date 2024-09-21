import { element, exact } from 'prop-types'
import React from 'react'


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const UserIndex = React.lazy(() => import('./views/pages/User/Index'))
const UserCreate = React.lazy(() => import('./views/pages/User/Create'))
const UserUpdate = React.lazy(() => import('./views/pages/User/Update'))

const EmployeeIndex = React.lazy(() => import('./views/pages/Employee/Index'))
const EmployeeCreate = React.lazy(() => import('./views/pages/Employee/Create'))
const EmployeeUpdate = React.lazy(() => import('./views/pages/Employee/Update'))

const DepartmentIndex = React.lazy(() => import('./views/pages/Department/Index'))
const DepartmentCreate = React.lazy(() => import('./views/pages/Department/Create'))
const DepartmentUpdate = React.lazy(() => import('./views/pages/Department/Update'))

const RoleIndex = React.lazy(() => import('./views/pages/Role/Index'))
const RoleCreate = React.lazy(() => import('./views/pages/Role/Create'))
const RoleUpdate = React.lazy(() => import('./views/pages/Role/Update'))

const ProjectIndex = React.lazy(() => import('./views/pages/Project/Index'))
const ProjectCreate = React.lazy(() => import('./views/pages/Project/Create'))
const ProjectUpdate = React.lazy(() => import('./views/pages/Project/Update'))

const TaskIndex = React.lazy(() => import('./views/pages/Task/Index'))
const TaskCreate = React.lazy(() => import('./views/pages/Task/Create'))
const TaskUpdate = React.lazy(() => import('./views/pages/Task/Update'))

const ExpenseIndex = React.lazy(() => import('./views/pages/Expense/Index'))
const ExpenseCreate = React.lazy(() => import('./views/pages/Expense/Create'))
const ExpenseUpdate = React.lazy(() => import('./views/pages/Expense/Update'))

const routes = [

  { path: '/', name: 'Dashboard', element: Dashboard },

  { path: '/users', name: 'Users', element: UserIndex, exact: true },
  { path: '/users/create/', name: 'Create', element: UserCreate },
  { path: '/users/update/:id', name: 'Update', element: UserUpdate },

  { path: '/employees', name: 'Employees', element: EmployeeIndex, exact: true },
  { path: '/employees/create/', name: 'Create', element: EmployeeCreate },
  { path: '/employees/update/:id', name: 'Update', element: EmployeeUpdate },

  { path: '/departments', name: 'Departments', element: DepartmentIndex, exact: true },
  { path: '/departments/create/', name: 'Create', element: DepartmentCreate },
  { path: '/departments/update/:id', name: 'Update', element: DepartmentUpdate },

  { path: '/roles', name: 'Roles', element: RoleIndex, exact: true },
  { path: '/roles/create/', name: 'Create', element: RoleCreate },
  { path: '/roles/update/:id', name: 'Update', element: RoleUpdate },

  { path: '/projects', name: 'Projects', element: ProjectIndex, exact: true },
  { path: '/projects/create/', name: 'Create', element: ProjectCreate },
  { path: '/projects/update/:id', name: 'Update', element: ProjectUpdate },

  { path: '/tasks', name: 'Tasks', element: TaskIndex, exact: true },
  { path: '/tasks/create/', name: 'Create', element: TaskCreate },
  { path: '/tasks/update/:id', name: 'Update', element: TaskUpdate },

  { path: '/expenses', name: 'Expenses', element: ExpenseIndex, exact: true },
  { path: '/expenses/create/', name: 'Create', element: ExpenseCreate },
  { path: '/expenses/update/:id', name: 'Update', element: ExpenseUpdate },
]

export default routes
