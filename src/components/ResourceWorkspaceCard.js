import { useContext } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'translation-helps-rcl'
import { BIBLE_AND_OBS } from '@common/BooksOfTheBible'
import { StoreContext } from '@context/StoreContext'
import React from 'react';
import CircularProgress from './CircularProgress'

export default function ResourceWorkspaceCard({
  id,
  resource,
  onClose: removeResource,
  classes,
}) {
  const {
    state: {
      bibleReference: {
        bookId,
      },
    },
  } = useContext(StoreContext)

  // const editorProps = {
  //   onSave: (bookCode,usfmText) => setDoSave(usfmText),
  //   docSetId,
  //   // usfmText: resource.rawContent,
  //   bookId: bookId,
  // }

  let title = '';
  if ( BIBLE_AND_OBS[bookId] ) {
    title += BIBLE_AND_OBS[bookId];
  }
  if ( resource.url ) {
    title += " (" + resource.url + ")"
  } else {
    title += " (" + resource.docSetId + ")"
  }
  console.log("owner and id:", resource.owner, id)
  return (
    <Card title={title}
      classes={classes}
      hideMarkdownToggle={true}
      closeable={true}
      onClose={() => removeResource(id)}
      key={resource.id}
      disableSettingsButton={true}
    >
      {(
        typeof resource.content === "string"
        ?
        <div><h1>{resource.content}</h1></div>
        :
        <CircularProgress/>
      )}
    </Card>
  )
}

ResourceWorkspaceCard.propTypes = {
  bookId: PropTypes.string,
  classes: PropTypes.object,
}
