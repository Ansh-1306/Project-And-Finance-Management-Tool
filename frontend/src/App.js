import React, { Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    setColorMode('light')

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, [])

  const PrivateRoute = ({ element: Element, ...rest }) => {
    const isAuthenticated = localStorage.getItem('access_token');
    return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" name="Home" element={<PrivateRoute element={DefaultLayout} />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
