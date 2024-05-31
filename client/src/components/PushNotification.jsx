import NotificationsIcon from "@mui/icons-material/Notifications"
import { useEffect, useState } from "react"
import { createClient } from 'graphql-ws'
import { GRAPHQL_WS_SERVER } from "../utils/constants"
import { Badge, Menu, MenuItem } from "@mui/material"

const client = createClient({
  url: GRAPHQL_WS_SERVER
})

const query = `subscription pushNotification {
  notification {
    message
  }
}`

function PushNotification() {
  const [invisible, setInvisible] = useState(true)
  const [notification, setNotification] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleOpen = (e) => {
    if (notification) {
      setAnchorEl(e.currentTarget)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
    setNotification('')
    setInvisible(true)
  }

  useEffect(() => {
    (async () => {
      const onNext = (data) => {
        setInvisible(false)
        const message = data?.data?.notification?.message
        setNotification(message)
      }

      await new Promise((resolve, reject) => {
        client.subscribe(
          { query },
          {
            next: onNext,
            error: reject,
            complete: resolve
          }
        )
      })
    })()
  }, [])

  return (
    <>
      <Badge color='error' variant='dot' invisible={invisible}>
        <NotificationsIcon onClick={handleOpen} />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>{notification}</MenuItem>
      </Menu>
    </>
  )
}

export default PushNotification