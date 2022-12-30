import { useContext, useEffect, useState } from 'react'
//import useDeepEffect from 'use-deep-compare-effect';

import { Workspace } from 'resource-workspace-rcl'
import { makeStyles } from '@mui/styles'
import { AppContext } from '@context/AppContext'
import CircularProgress from '@components/CircularProgress'
import {
  addNetworkDisconnectError,
  onNetworkActionButton,
  processNetworkError,
  reloadApp,
} from '@utils/network'
import { useRouter } from 'next/router'
import { HTTP_CONFIG } from '@common/constants'
import NetworkErrorPopup from '@components/NetworkErrorPopUp'
import ResourceWorkspaceCard from './ResourceWorkspaceCard'
import useStoreContext from '@hooks/useStoreContext'
import EmptyMessage from './EmptyMessage'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    margin: '0 1px !important',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  dragIndicator: {},
  label: {
    color: 'red',
  },
}))

function ResourceWorkspace() {
  const router = useRouter()
  console.log(router.query);
  const classes = useStyles()
  const [workspaceReady, setWorkspaceReady] = useState(false)
  const [networkError, setNetworkError] = useState(null)

  const {
    state: { books, ltStState },
    actions: { setBooks, setLtStState },
  } = useContext(AppContext)

  const removeBook = id => {
    const _books = books.filter(b => {
      return b.id !== id
    })
    setBooks(_books)
  }

  const {
    state: {
      server,
      appRef,
      owner,
      repo,
      languageId,
      currentLayout,
    },
    actions: {
      setCurrentLayout,
      setLastError,
      setOwner,
      setRepo,
      setLanguageId,
      setAppRef,
      onReferenceChange,
    },
  } = useStoreContext()

  /**
   * show NetworkError for workspace
   * @return {JSX.Element|null}
   */
  function showNetworkError() {
    if (networkError) {
      // for all other workspace network errors
      return (
        <NetworkErrorPopup
          networkError={networkError}
          setNetworkError={setNetworkError}
          onActionButton={onNetworkActionButton}
          hideClose={true}
          /* show reload if send feedback not enabled */
          onRetry={!networkError.actionButtonText ? reloadApp : null}
        />
      )
    }
    return null
  }

  /**
   * process error and determine if there is a problem with connection to server
   *  if showAnyError is true we display an error popup
   *    the process then is to check if this is server connection problem - if so we display that message, if not we display the error returned
   *  if showAnyError is false (default) we only display an error popup if there is a problem connecting to server
   * @param {string} message - the error message we received fetching a resource
   * @param {boolean} isAccessError - if false then the error type is not one that would be caused by server connection problems
   * @param {number} resourceStatus - status code returned fetching resource
   * @param {object} error - error object for detected error, could be a parsing error, etc.  This will take precedence over message
   * @param {boolean} showAllErrors - if true then always show a popup error message, otherwise just show server error message if we can't talk to server
   */
  function onResourceError(
    message,
    isAccessError,
    resourceStatus,
    error,
    showAllErrors = false
  ) {
    if (!networkError) {
      // only show if another error not already showing
      if (showAllErrors) {
        processNetworkError(
          error || message,
          resourceStatus,
          router,
          setNetworkError,
          setLastError,
          setLastError
        )
      } else {
        if (isAccessError) {
          // we only show popup for access errors
          addNetworkDisconnectError(
            error || message,
            0,
            router,
            setNetworkError,
            setLastError
          )
        }
      }
    }
  }

  useEffect(() => {
    console.log(router.query);
    const { owner, repo, refEtc } = router.query;
    console.log("HERE: ", owner, repo, refEtc)
    if (owner && repo) {
      setOwner(owner)
      setRepo(repo)
      setLanguageId(repo.split('_')[0])
      if (refEtc && refEtc[0])
        setAppRef(refEtc[0])
      if (refEtc && refEtc[1])
        onReferenceChange(refEtc[1], "1", "1")
    }
  }, [router.query])

  useEffect(() => {
    setWorkspaceReady(false)

    if (owner && languageId && appRef && server) {
      // clearCaches()
      setWorkspaceReady(true)
    } // eslint-disable-next-line
  }, [owner, languageId, appRef, server])

  const config = {
    server,
    ...HTTP_CONFIG,
  }

  return networkError || !workspaceReady ? (
    // Do not render workspace until user logged in and we have user settings
    <>
      {showNetworkError()}
      <CircularProgress size={180} />
    </>
  ) : !!books.length ? (
    <Workspace
      layout={currentLayout}
      classes={classes}
      gridMargin={[10, 10]}
      onLayoutChange={(_layout, layouts) => {
        setCurrentLayout(layouts)
      }}
      minW={2}
      minH={1}
      rowHeight={25}
      layoutWidths={[
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
      ]}
      layoutHeights={[
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
        [20, 20],
      ]}
    >
      {books.map(data => (
        <ResourceWorkspaceCard
          key={data.id}
          id={data.id}
          bookId={data.bookId}
          docSetId={data.docset}
          data={data}
          classes={classes}
          onClose={removeBook}
        />
      ))}
    </Workspace>
  ) : (
    <EmptyMessage
      sx={{ color: 'text.disabled' }}
      message={'No books to display, please add a new book.'}
    ></EmptyMessage>
  )
}

export default ResourceWorkspace
