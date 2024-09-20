import { element, exact } from 'prop-types'
import React from 'react'


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))

const UserIndex = React.lazy(() => import('./views/pages/User/Index'))
const UserCreate = React.lazy(() => import('./views/pages/User/Create'))
const UserDetail = React.lazy(() => import('./views/pages/User/Detail'))
const UserUpdate = React.lazy(() => import('./views/pages/User/Update'))

const EmployeeIndex = React.lazy(() => import('./views/pages/Employee/Index'))
const EmployeeCreate = React.lazy(() => import('./views/pages/Employee/Create'))
const EmployeeDetail = React.lazy(() => import('./views/pages/Employee/Detail'))
const EmployeeUpdate = React.lazy(() => import('./views/pages/Employee/Update'))

const DepartmentIndex = React.lazy(() => import('./views/pages/Department/Index'))
const DepartmentCreate = React.lazy(() => import('./views/pages/Department/Create'))
const DepartmentDetail = React.lazy(() => import('./views/pages/Department/Detail'))
const DepartmentUpdate = React.lazy(() => import('./views/pages/Department/Update'))

const RoleIndex = React.lazy(() => import('./views/pages/Role/Index'))
const RoleCreate = React.lazy(() => import('./views/pages/Role/Create'))
const RoleDetail = React.lazy(() => import('./views/pages/Role/Detail'))
const RoleUpdate = React.lazy(() => import('./views/pages/Role/Update'))

const ProjectIndex = React.lazy(() => import('./views/pages/Project/Index'))
const ProjectCreate = React.lazy(() => import('./views/pages/Project/Create'))
const ProjectDetail = React.lazy(() => import('./views/pages/Project/Detail'))
const ProjectUpdate = React.lazy(() => import('./views/pages/Project/Update'))

const TaskIndex = React.lazy(() => import('./views/pages/Task/Index'))
const TaskCreate = React.lazy(() => import('./views/pages/Task/Create'))
const TaskDetail = React.lazy(() => import('./views/pages/Task/Detail'))
const TaskUpdate = React.lazy(() => import('./views/pages/Task/Update'))

const ExpenseIndex = React.lazy(() => import('./views/pages/Expense/Index'))
const ExpenseCreate = React.lazy(() => import('./views/pages/Expense/Create'))
const ExpenseDetail = React.lazy(() => import('./views/pages/Expense/Detail'))
const ExpenseUpdate = React.lazy(() => import('./views/pages/Expense/Update'))

const routes = [

  { path: '/', name: 'Dashboard', element: Dashboard },

  { path: '/users', name: 'Users', element: UserIndex, exact: true },
  { path: '/users/create', name: 'Create', element: UserCreate },
  { path: '/users/update', name: 'Update', element: UserUpdate },
  { path: '/users/detail', name: 'Detail', element: UserDetail },

  { path: '/employees', name: 'Employees', element: EmployeeIndex, exact: true },
  { path: '/employees/create', name: 'Create', element: EmployeeCreate },
  { path: '/employees/update', name: 'Update', element: EmployeeUpdate },
  { path: '/employees/detail', name: 'Detail', element: EmployeeDetail },

  { path: '/departments', name: 'Departments', element: DepartmentIndex, exact: true },
  { path: '/departments/create', name: 'Create', element: DepartmentCreate },
  { path: '/departments/update', name: 'Update', element: DepartmentUpdate },
  { path: '/departments/detail', name: 'Detail', element: DepartmentDetail },

  { path: '/roles', name: 'Roles', element: RoleIndex, exact: true },
  { path: '/roles/create', name: 'Create', element: RoleCreate },
  { path: '/roles/update', name: 'Update', element: RoleUpdate },
  { path: '/roles/detail', name: 'Detail', element: RoleDetail },

  { path: '/projects', name: 'Projects', element: ProjectIndex, exact: true },
  { path: '/projects/create', name: 'Create', element: ProjectCreate },
  { path: '/projects/update', name: 'Update', element: ProjectUpdate },
  { path: '/projects/detail', name: 'Detail', element: ProjectDetail },

  { path: '/tasks', name: 'Tasks', element: TaskIndex, exact: true },
  { path: '/tasks/create', name: 'Create', element: TaskCreate },
  { path: '/tasks/update', name: 'Update', element: TaskUpdate },
  { path: '/tasks/detail', name: 'Detail', element: TaskDetail },

  { path: '/expenses', name: 'Expenses', element: ExpenseIndex, exact: true },
  { path: '/expenses/create', name: 'Create', element: ExpenseCreate },
  { path: '/expenses/update', name: 'Update', element: ExpenseUpdate },
  { path: '/expenses/detail', name: 'Detail', element: ExpenseDetail },

]

export default routes
