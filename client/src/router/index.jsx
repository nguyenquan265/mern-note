import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Layout from '../pages/Layout'
import Error from '../pages/Error'
import ProtectedRoute from './ProtectedRoute'
import NoteList from '../components/NoteList'
import Note from '../components/Note'

import { loader as homeLoader } from '../pages/Home'
import { loader as noteListLoader } from '../components/NoteList'
import { loader as noteLoader } from '../components/Note'

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
            loader: homeLoader,
            children: [
              {
                path: `folders/:folderId`,
                element: <NoteList />,
                loader: noteListLoader,
                children: [
                  {
                    path: `note/:noteId`,
                    element: <Note />,
                    loader: noteLoader
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
