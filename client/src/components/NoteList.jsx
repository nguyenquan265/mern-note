import { Box, Card, CardContent, Grid, List, Typography } from '@mui/material'
import { useState } from 'react'
import { Link, Outlet, useLoaderData, useParams } from 'react-router-dom'
import { graphQLRequest } from '../utils/request'

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ params }) => {
  const query = `query Folder($folderId: String!) {
    folder(folderId: $folderId) {
      id
      name
      notes {
        content
        id
      }
    }
  }`

  const data = await graphQLRequest({
    query,
    variables: { folderId: params.folderId }
  })

  return data
}

function NoteList() {
  const { NoteId } = useParams()
  const [activeNote, setActiveNote] = useState(NoteId)
  const { folder } = useLoaderData()

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
            <Box>
              <Typography sx={{ fontWeight: 'bold' }}>Notes</Typography>
            </Box>
          }
        >
          {folder.notes.map(({ id, content }) => (
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
