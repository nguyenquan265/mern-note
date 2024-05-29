import { Box, Card, CardContent, List, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function FolderList({ folders }) {
  const { folderId } = useParams()
  const [activeFolder, setActiveFolder] = useState(folderId)

  return (
    <List
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: '#7d9d9c',
        p: '10px',
        textAlign: 'left',
        overflowY: 'auto'
      }}
      subheader={
        <Box>
          <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
            Folders
          </Typography>
        </Box>
      }
    >
      {folders.map(({ id, name }) => (
        <Link
          key={id}
          to={`folders/${id}`}
          style={{ textDecoration: 'none' }}
          onClick={() => setActiveFolder(id)}
        >
          <Card
            sx={{
              mb: '5px',
              bgcolor: activeFolder === id ? 'rgb(255, 211, 140)' : null
            }}
          >
            <CardContent sx={{ '&:last-child': { pb: '10px' }, p: '10px' }}>
              <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>{name}</Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </List>
  )
}

FolderList.propTypes = {
  folders: PropTypes.array.isRequired
}

export default FolderList
