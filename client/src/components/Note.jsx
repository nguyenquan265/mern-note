import { useEffect, useState } from "react"
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js'
import { Editor } from "react-draft-wysiwyg"
import { draftToHtml } from 'draftjs-to-html'

function Note() {
  const note = { id: '999', content: '<p>this is new note</p>' }

  const [editorState, setEditorState] = useState(() => { return EditorState.createEmpty() })
  const [rawHTML, setRawHTML] = useState(note.content)

  const handleChange = (e) => {
    setEditorState(e)
    setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())))
  }

  useEffect(() => {
    const blockFromHTML = convertFromHTML(note.content)
    const state = ContentState.createFromBlockArray(blockFromHTML.contentBlocks, blockFromHTML.entityMap)
    setEditorState(EditorState.createWithContent(state))
  }, [note.id])

  useEffect(() => {
    setRawHTML(note.content)
  }, [note.content])

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleChange}
      placeholder="Write something..."
    />
  )
}

export default Note