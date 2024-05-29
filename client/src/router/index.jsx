import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Layout from '../pages/Layout'
import Error from '../pages/Error'
import ProtectedRoute from './ProtectedRoute'
import NoteList from '../components/NoteList'
import Note from '../components/Note'

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            element: <Home />,
            children: [
              {
                path: `folders/:folderId`,
                element: <NoteList />,
                children: [
                  {
                    path: `note/:noteId`,
                    element: <Note />
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        element: <Login />,
        path: '/login'
      }
    ]
  }
])

export default router
