// import { PolicyProvider } from '@/providers/PolicyProvider'
import { Navigate, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      // <PolicyProvider>
      //   <div>sss</div>
      // </PolicyProvider>
      <div>this is munadiya project</div>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={'/home'} />,
      },
    ],
  },
])
export default router
