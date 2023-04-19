import { useState, useContext } from 'react'

import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import Drawer from '@components/Drawer'
import Snackbar from '@mui/material/Snackbar'
import { StoreContext } from '@context/StoreContext'
import { AppContext } from '@context/AppContext'
import FeedbackPopup from '@components/FeedbackPopup'
import SelectResourcePopup from './SelectResourcePopup'
import BibleReference from '@components/BibleReference'
import createResource from '@utils/createResource'

const useStyles = makeStyles(theme => ({
  root: { flexGrow: 1 },
  button: {
    minWidth: '40px',
    padding: '5px 0px',
    marginRight: theme.spacing(3),
  },
  icon: { width: '40px' },
  menuButton: { marginRight: theme.spacing(1) },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  offset: theme.mixins.toolbar,
}))

export default function Header({
  title,
  resetResourceLayout,
  feedback,
  setFeedback,
}) {
  const classes = useStyles()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [alreadyOpenNotice, setAlreadyOpenNotice] = useState(false)

  const [drawerOpen, setOpen] = useState(false)
  const {
    state: {
      server
    },
  } = useContext(StoreContext)

  const {
    state: {
      resources,
      repoClient,
    },
    actions: {
      setResources, 
      setLtStState,
    },
  } = useContext(AppContext)
  
  const handleDrawerOpen = () => {
    if (!drawerOpen) {
      setOpen(true)
    }
  }

  const handleDrawerClose = () => {
    if (drawerOpen) {
      setOpen(false)
    }
  }

  const handleAlreadyOpenNoticeClose = () => {
    setAlreadyOpenNotice(false);
  };

  const doShowFeedback = () => {
    setFeedback && setFeedback(true)
  }

  const doHideFeedback = () => {
    setFeedback && setFeedback(false)
  }

  const handleOnNext = async (data) => {
    data['server'] = server
    data['repoClient'] = repoClient
    data['resources'] = resources 
    const resource = createResource(data)
    if (resource) {
      let found = -1
      for (let i = 0; i < resources.length; i++) {
        if (resources[i].url && resources[i].url === resource.url) {
          found = i
          break
        }
      }
      if (found > -1) {
        console.log("resource already loaded:", resource.url)
        setAlreadyOpenNotice("Resource is already open")
      } else {
        console.log("New Resource:", resource.docSetId, resource.url)
        console.log("HERE4")
        setResources(resources.append(resource))
      }
    }
  }

  return (
    <header>
      <AppBar position='fixed'>
        <Toolbar>
          <div className='flex flex-1 justify-center items-center'>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant='h6'
              className={classes.title}
              onClick={() => router.push('/')}
            >
              {title}
            </Typography>
          </div>
          {router.pathname.startsWith('/u/') && (
          <div className='flex flex-1 justify-center items-center'>
            <BibleReference />
          </div>)}
          <div className='flex flex-1 justify-end'>
              <Fab
                color='primary'
                aria-label='extended'
                variant='extended'
                onClick={() => {
                  setShowModal(true)
                }}
              >
                <AddIcon className={classes.extendedIcon} />
                Resource
              </Fab>
              <SelectResourcePopup
                onNext={handleOnNext}
                showModal={showModal}
                setShowModal={setShowModal}
              />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        open={drawerOpen}
        onOpen={handleDrawerOpen}
        onClose={handleDrawerClose}
        resetResourceLayout={resetResourceLayout}
        showFeedback={doShowFeedback}
      />
      {feedback ? (
        <FeedbackPopup open {...feedback} onClose={doHideFeedback} />
      ) : null}
      <Snackbar
        open={alreadyOpenNotice}
        autoHideDuration={6000}
        onClose={handleAlreadyOpenNoticeClose}
        message="Resource is already open"
        // action={action}
      />
      <div className={classes.offset} />
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string,
  resetResourceLayout: PropTypes.func,
  storeContext: PropTypes.object,
  feedback: PropTypes.bool,
  setFeedback: PropTypes.func,
}
