import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  Tooltip,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import {
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
  useSubmit
} from 'react-router-dom'
import { graphQLRequest } from '../utils/request'
import { NoteAddOutlined } from '@mui/icons-material'
import moment from 'moment'

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ params }) => {
  const query = `query Folder($folderId: String!) {
    folder(folderId: $folderId) {
      id
      name
      notes {
        content
        id
        updatedAt
      }
    }
  }`

  const data = await graphQLRequest({
    query,
    variables: { folderId: params.folderId }
  })

  return data
}

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const query = `mutation Mutation($content: String!, $folderId: ID!) {
    addNote(content: $content, folderId: $folderId) {
      id
      content
    }
  }`

  const { addNote } = await graphQLRequest({ query, variables: data })

  return addNote
}

function NoteList() {
  const { noteId, folderId } = useParams()
  const [activeNote, setActiveNote] = useState(noteId)
  const { folder } = useLoaderData()
  const submit = useSubmit()
  const navigate = useNavigate()

  const handleAddNewNote = async () => {
    submit(
      { content: 'Write something...', folderId },
      { method: 'POST', action: `/folders/${folderId}` }
    )
  }

  useEffect(() => {
    if (noteId) {
      setActiveNote(noteId)
      return
    }

    if (folder?.notes?.[0]) {
      navigate('note/' + folder.notes[0].id)
    }
  }, [noteId, folder.notes])

  return (
    <Grid container height='100%'>
      <Grid
        item
        xs={4}
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: '#f0ebe3',
          height: '100%',
          overflowY: 'auto',
          p: '10px',
          textAlign: 'left'
        }}
      >
        <List
          subheader={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography sx={{ fontWeight: 'bold' }}>Notes</Typography>
              <Tooltip title='Add Note' onClick={handleAddNewNote}>
                <IconButton size='small'>
                  <NoteAddOutlined />
                </IconButton>
              </Tooltip>
            </Box>
          }
        >
          {folder.notes.map(({ id, content, updatedAt }) => (
            <Link
              key={id}
              to={`note/${id}`}
              style={{ textDecoration: 'none' }}
              onClick={() => setActiveNote(id)}
            >
              <Card
                sx={{
                  mb: '5px',
                  bgcolor: activeNote === id ? 'rgb(255, 211, 140)' : null
                }}
              >
                <CardContent sx={{ '&:last-child': { pb: '10px' }, p: '10px' }}>
                  <div
                    style={{ fontSize: '14px', fontWeight: 'bold' }}
                    dangerouslySetInnerHTML={{
                      __html: `${content.substring(0, 30) || 'Empty'}`
                    }}
                  />
                  <Typography sx={{ fontSize: '10px' }}>{moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </List>
      </Grid>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </Grid>
  )
}

export default NoteList
