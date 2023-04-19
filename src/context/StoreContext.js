import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import useLocalStorage from '@hooks/useLocalStorage'
import useSaveChangesPrompt from '@hooks/useSaveChangesPrompt'

export const StoreContext = createContext({})
export default function StoreContextProvider(props) {
  const username = ''

  /**
   * wrapper for useULS.useUserLocalStorage that applies current username
   * @param {string} key
   * @param {any} initialValue
   * @return {any[]}
   */
  function useUserLocalStorage(key, initialValue) {
    return useLocalStorage(key, initialValue)
  }

  const [server, setServer] = useLocalStorage('server', 'git.door43.org')
  const [mainScreenRef, setMainScreenRef] = useState(null)
  const [lastError, setLastError] = useState(null)
  const [showAccountSetup, setShowAccountSetup] = useLocalStorage(
    'showAccountSetup',
    true
  )
  const [taArticle, setTaArticle] = useState(null)
  const [selectedQuote, setQuote] = useLocalStorage('selectedQuote', null)
  // TODO blm: for now we use unfoldingWord for original language bibles
  const [scriptureOwner, setScriptureOwner] = useState('unfoldingWord')
  const [greekRepoUrl, setGreekRepoUrl] = useLocalStorage('greekRepoUrl', null)
  const [hebrewRepoUrl, setHebrewRepoUrl] = useLocalStorage(
    'hebrewRepoUrl',
    null
  )
  const [bibleReference, setBibleReference] = useLocalStorage('bibleReference', {
    bookId: 'mat',
    chapter: '1',
    verse: '1',
  })
  const [supportedBibles, setSupportedBibles] = useLocalStorage('bibles', [])
  const [currentLayout, setCurrentLayout] = useLocalStorage(
    'resourceLayout',
    null
  )

  const {
    savedChanges,
    setSavedChanges,
    checkUnsavedChanges,
    showSaveChangesPrompt,
  } = useSaveChangesPrompt()

  function onReferenceChange(bookId, chapter, verse) {
    setQuote(null)
    console.log("oRC", bookId, chapter, verse)
    setBibleReference(prevState => ({
      ...prevState,
      bookId,
      chapter,
      verse,
    }))
  }

  function updateTaDetails(supportReference) {
    if (typeof supportReference === 'string') {
      const path = supportReference?.replace('rc://*/ta/man/', '')
      const split = path.split('/')

      setTaArticle({
        projectId: split.length > 1 ? split[0] : 'translate',
        filePath: `${split[1] || split[0]}/01.md`,
      })
    } else {
      setTaArticle(null)
    }
  }

  const value = {
    state: {
      showAccountSetup,
      scriptureOwner,
      selectedQuote,
      taArticle,
      server,
      bibleReference,
      supportedBibles,
      currentLayout,
      useUserLocalStorage,
      lastError,
      greekRepoUrl,
      hebrewRepoUrl,
      mainScreenRef,
      savedChanges,
    },
    actions: {
      onReferenceChange,
      setShowAccountSetup,
      setScriptureOwner,
      setServer,
      setQuote,
      setBibleReference,
      setSupportedBibles,
      setCurrentLayout,
      setLastError,
      updateTaDetails,
      setGreekRepoUrl,
      setHebrewRepoUrl,
      setMainScreenRef,
      setSavedChanges,
      checkUnsavedChanges,
      showSaveChangesPrompt,
    },
  }

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  )
}

StoreContextProvider.propTypes = { children: PropTypes.object }
