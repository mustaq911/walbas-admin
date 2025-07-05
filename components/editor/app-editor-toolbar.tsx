import { Editor } from '@tiptap/react'
import { Bold, Italic, List, Heading1, Heading2, Heading3, Eraser } from 'lucide-react'
import { Button } from '@/components/ui/button'

type ToolbarProps = {
  editor: Editor | null
}

export default function Toolbar({ editor }: ToolbarProps) {
  if (!editor) {
    return null
  }

  return (
    <div className="border-b border-gray-200 p-2 flex flex-wrap gap-2">
        <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            variant={editor.isActive('bold') ? 'secondary' : 'ghost'}
            size="icon"
        >
            <Bold className="h-4 w-4" />
        </Button>
        <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            variant={editor.isActive('italic') ? 'secondary' : 'ghost'}
            size="icon"
        >
            <Italic className="h-4 w-4" />
        </Button>
        <Button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={!editor.can().chain().focus().toggleBulletList().run()}
            variant={editor.isActive('bulletList') ? 'secondary' : 'ghost'}
            size="icon"
        >
            <List className="h-4 w-4" />
        </Button>
        <Button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}
            variant={editor.isActive('heading', { level: 1 }) ? 'secondary' : 'ghost'}
            size="icon"
        >
            <Heading1 className="h-4 w-4" />
        </Button>
        <Button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
            variant={editor.isActive('heading', { level: 2 }) ? 'secondary' : 'ghost'}
            size="icon"
        >
            <Heading2 className="h-4 w-4" />
        </Button>
        <Button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            disabled={!editor.can().chain().focus().toggleHeading({ level: 3 }).run()}
            variant={editor.isActive('heading', { level: 3 }) ? 'secondary' : 'ghost'}
            size="icon"
        >
            <Heading3 className="h-4 w-4" />
        </Button>
        <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}
            size="icon" variant="ghost">
            <Eraser/>
        </Button>
    </div>
  )
}

