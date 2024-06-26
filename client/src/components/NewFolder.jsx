import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material'
import { CreateNewFolderOutlined } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { graphQLRequest } from '../utils/request'
import { useSearchParams, useNavigate } from 'react-router-dom'

function NewFolder() {
  const [open, setOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const popupName = searchParams.get('popup')
  const navigate = useNavigate()

  const handleOpenPopup = () => {
    setSearchParams({ popup: 'add-folder' })
  }

  const handleNewFolderNameChange = (e) => {
    setNewFolderName(e.target.value)
  }

  const handleClose = () => {
    setNewFolderName('')
    navigate(-1)
  }

  const handleAddNewFolder = async () => {
    const query = `mutation Mutation($name: String!) {
      addFolder(name: $name) {
        name
        author {
          name
        }
      }
    }`

    await graphQLRequest({ query, variables: { name: newFolderName } })

    handleClose()
  }

  useEffect(() => {
    if (popupName === 'add-folder') {
      setOpen(true)
      return
    }

    setOpen(false)
  }, [popupName])

  return (
    <div>
      <Tooltip title='Add Folder' onClick={handleOpenPopup}>
        <IconButton size='small'>
          <CreateNewFolderOutlined
            sx={{
              color: 'white'
            }}
          />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Folder Name'
            fullWidth
            size='small'
            variant='standard'
            sx={{ width: '400px' }}
            autoComplete='off'
            value={newFolderName}
            onChange={handleNewFolderNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddNewFolder}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default NewFolder
