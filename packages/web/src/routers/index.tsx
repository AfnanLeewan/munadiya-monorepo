// import { PolicyProvider } from '@/providers/PolicyProvider'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import HomePageTemplate from '@/component/template/HomePageTemplate.react'
import HomePage from '@/component/pages/HomePage.react'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      // <PolicyProvider>
      //   <div>sss</div>
      // </PolicyProvider>
      <HomePageTemplate />
    ),
    children: [
      {
        index: true,
        element: <Navigate to={'/home'} />,
      },
      {
        path: 'home',
        element: <HomePage/>,
      },
      {
        path: 'book',
        element: <HomePage/>,
      },
      {
        path: 'article',
        element: <HomePage/>,
      },
      {
        path: 'video',
        element: <HomePage/>,
      },
      {
        path: 'podcast',
        element: <HomePage/>,
      },
      {
        path: 'podcast',
        element: <HomePage/>,
      },
    ],
  },
])
export default router
