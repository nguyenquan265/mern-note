import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Layout from '../pages/Layout'
import Error from '../pages/Error'
import ProtectedRoute from './ProtectedRoute'
import NoteList from '../components/NoteList'
import Note from '../components/Note'

import { loader as homeLoader } from '../pages/Home'
import { loader as noteListLoader, action as noteListAction } from '../components/NoteList'
import { loader as noteLoader, action as noteAction } from '../components/Note'

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
                action: noteListAction,
                children: [
                  {
                    path: `note/:noteId`,
                    element: <Note />,
                    loader: noteLoader,
                    action: noteAction
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
