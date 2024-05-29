import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthProvider"
import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";

function UserMenu() {
  const { user: { displayName, photoURL, auth } } = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  return (
    <>
      <Box sx={{ display: 'flex', cursor: 'pointer' }} onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Typography>{displayName}</Typography>
        <Avatar
          alt='avatar'
          src={photoURL}
          sx={{ width: '24px', height: '24px', ml: '5px' }}
        />
      </Box>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => auth.signOut()}>Logout</MenuItem>
      </Menu>
    </>
  )
}

export default UserMenu