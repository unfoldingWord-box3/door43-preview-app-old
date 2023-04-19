import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import SettingsIcon from '@mui/icons-material/Settings'
import BugReportIcon from '@mui/icons-material/BugReport'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
// TODO: Enable buttons once ready to fully implement functionality
// import DashboardIcon from '@mui/icons-material/Dashboard'
// import Crop54Icon from '@mui/icons-material/Crop54'
// import FolderIcon from '@mui/icons-material/Folder'
// import Divider from '@mui/material/Divider'
// import Button from '@mui/material/Button'

export default function Drawer({
  open,
  onOpen,
  onClose,
  resetResourceLayout,
  showFeedback,
}) {
  const router = useRouter()

  async function onSettingsClick() {
    router.push('/settings')
    onClose()
  }

  function onFeedbackClick() {
    onClose()
    showFeedback && showFeedback()
  }

  function onResetResourceLayout() {
    resetResourceLayout()
    onClose()
  }

  return (
    <SwipeableDrawer
      anchor='left'
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      classes={{ paper: 'w-72' }}
    >
      <div className='flex items-center flex-end py-2 px-2 bg-primary shadow-xs'>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon htmlColor='#fff' />
        </IconButton>
      </div>
      <List disablePadding>
        <ListItemButton key={'Settings'} onClick={onSettingsClick}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={'Settings'} />
        </ListItemButton>
      </List>
      <List disablePadding>
        <ListItem button key={'Reset Resource Layout'} onClick={onResetResourceLayout}>
          <ListItemIcon>
            <DashboardOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={'Reset Resource Layout'} />
        </ListItem>
      </List>
      {/* <div className='mx-4 mt-2 m-1'>
        <Button variant='outlined' startIcon={<FolderIcon />}>
          Save Current Layout
        </Button>
      </div>
      <List disablePadding>
        <ListItem button key={'Templates Gallery'}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={'Templates Gallery'} />
        </ListItem>
        <ListItem button key={'Resource Gallery'}>
          <ListItemIcon>
            <Crop54Icon />
          </ListItemIcon>
          <ListItemText primary={'Resource Gallery'} />
        </ListItem>
      </List>
      <Divider />
      <div className='text-gray-500 px-4 pt-2.5 text-xs'>Recently Used</div>
      <List disablePadding>
        <ListItem button key={'Translation Notes'}>
          <ListItemIcon>
            <Crop54Icon />
          </ListItemIcon>
          <ListItemText primary={'Translation Notes'} />
        </ListItem>
        <ListItem button key={'My Review Process'}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={'My Review Process'} />
        </ListItem>
        <ListItem button key={'Translation Words'}>
          <ListItemIcon>
            <Crop54Icon />
          </ListItemIcon>
          <ListItemText primary={'Translation Words'} />
        </ListItem>
      </List>
      <Divider />
      <div className='text-gray-500 px-4 pt-2.5 text-xs'>Bookmarked</div>
      <List disablePadding>
        <ListItem button key={'Translation Flow'}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={'Translation Flow'} />
        </ListItem>
        <ListItem button key={'Academy Articles'}>
          <ListItemIcon>
            <Crop54Icon />
          </ListItemIcon>
          <ListItemText primary={'Academy Articles'} />
        </ListItem>
        <ListItem button key={'My Notes Setup'}>
          <ListItemIcon>
            <Crop54Icon />
          </ListItemIcon>
          <ListItemText primary={'My Notes Setup'} />
        </ListItem>
        <ListItem button key={'All the Scripture'}>
          <ListItemIcon>
            <Crop54Icon />
          </ListItemIcon>
          <ListItemText primary={'All the Scripture'} />
        </ListItem>
        <ListItem button key={'My Book Package Flow'}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={'My Book Package Flow'} />
        </ListItem>
      </List>
      <Divider /> */}
      <List disablePadding>
        <ListItem
          button
          key={'Bug Report or Feedback'}
          onClick={onFeedbackClick}
        >
          <ListItemIcon>
            <BugReportIcon />
          </ListItemIcon>
          <ListItemText primary={'Bug Report or Feedback'} />
        </ListItem>
      </List>
    </SwipeableDrawer>
  )
}

Drawer.propTypes = {
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  resetResourceLayout: PropTypes.func,
  showFeedback: PropTypes.func,
}
