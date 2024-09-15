

// auth
import SignIn from '../views/dashboard/auth/sign-in'
// errors
import Error404 from '../views/dashboard/errors/error404'

export const SimpleRouter = [
    {
        path: 'auth/sign-in',
        element: <SignIn />
    },
    {
        path: 'errors/error404',
        element: <Error404 />
    },
]
