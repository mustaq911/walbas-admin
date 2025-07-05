'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Toolbar from './app-editor-toolbar'
import { useEffect } from 'react'

interface AppEditorProps {
    onChange?: (content: string) => void,
    defaultValue?: string
}

const AppEditor: React.FC<AppEditorProps> = ({ onChange, defaultValue = '' }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: defaultValue,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML();  // Get the HTML content
      if (onChange) {
        onChange(htmlContent); // Only call if onChange is defined
      }
    },
  })

  useEffect(() => {
    if (editor && defaultValue !== editor.getHTML()) {
      editor.commands.setContent(defaultValue);  // Set the editor content dynamically
    }
  }, [defaultValue, editor])

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden border">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="p-4" />
    </div>
  )
}


export default AppEditor;
