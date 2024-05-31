import { useEffect, useMemo, useState } from 'react'
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw
} from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { useLoaderData, useLocation, useSubmit } from 'react-router-dom'
import { graphQLRequest } from '../utils/request'
import { debounce } from '@mui/material'

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

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const query = `mutation Mutation($id: String!, $content: String!) {
    updateNote(id: $id, content: $content) {
      id
      content
    }
  }`

  const { updateNote } = await graphQLRequest({ query, variables: data })

  return updateNote
}

function Note() {
  const { note } = useLoaderData()
  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty()
  })
  const [rawHTML, setRawHTML] = useState(note.content)
  const submit = useSubmit()
  const location = useLocation()

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

  useEffect(() => {
    debouncedMemorized(rawHTML, note, location.pathname)
  }, [rawHTML, location.pathname])

  const debouncedMemorized = useMemo(() => {
    return debounce((rawHTML, note, pathname) => {
      if (rawHTML === note.content) {
        return
      }

      submit({ ...note, content: rawHTML }, { method: 'POST', action: pathname })
    }, 1000)
  }, [])

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleChange}
      placeholder='Write something...'
    />
  )
}

export default Note
