import { useEffect, useState } from 'react'
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw
} from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { draftToHtml } from 'draftjs-to-html'
import { useLoaderData } from 'react-router-dom'
import { graphQLRequest } from '../utils/request'

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ params }) => {
  const query = `query Note($noteId: String!) {
    note(noteId: $noteId) {
      content
      id
    }
  }`

  const data = await graphQLRequest({
    query,
    variables: { noteId: params.noteId }
  })

  return data
}

function Note() {
  const { note } = useLoaderData()
  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty()
  })
  const [rawHTML, setRawHTML] = useState(note.content)

  const handleChange = (e) => {
    setEditorState(e)
    setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())))
  }

  useEffect(() => {
    const blockFromHTML = convertFromHTML(note.content)
    const state = ContentState.createFromBlockArray(
      blockFromHTML.contentBlocks,
      blockFromHTML.entityMap
    )
    setEditorState(EditorState.createWithContent(state))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.id])

  useEffect(() => {
    setRawHTML(note.content)
  }, [note.content])

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleChange}
      placeholder='Write something...'
    />
  )
}

export default Note
