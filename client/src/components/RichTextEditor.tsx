import { useEffect, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import DOMPurify from 'dompurify';
import './rich-text-editor.css';

interface Props {
  value?: string;
  onChange?: (html: string) => void;
  readOnly?: boolean;
  className?: string;
}

export default function RichTextEditor({ value = '', onChange, readOnly = false, className = '' }: Props) {
  const changeHandler = useRef(onChange);
  changeHandler.current = onChange;
  const editor = useEditor({
    extensions: [StarterKit.configure({ link: { openOnClick: false } }), Image],
    content: DOMPurify.sanitize(value),
    editable: !readOnly,
    onUpdate: ({ editor }) => changeHandler.current?.(DOMPurify.sanitize(editor.getHTML())),
  });
  useEffect(() => {
    if (!editor) return;
    const html = DOMPurify.sanitize(value);
    if (editor.getHTML() !== html) editor.commands.setContent(html, { emitUpdate: false });
  }, [editor, value]);
  useEffect(() => { editor?.setEditable(!readOnly); }, [editor, readOnly]);
  if (!editor) return null;
  const insertUrl = (image: boolean) => {
    const input = window.prompt(image ? 'Image URL (HTTPS)' : 'Link URL (HTTPS)');
    if (!input) return;
    try {
      const url = new URL(input);
      if (url.protocol !== 'https:') return;
      if (image) editor.chain().focus().setImage({ src: url.href }).run();
      else editor.chain().focus().setLink({ href: url.href }).run();
    } catch { /* Keep the document unchanged when the URL is invalid. */ }
  };
  return <div className={`rich-text-editor ${className}`}>
    {!readOnly && <div role="toolbar" aria-label="Text formatting">
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()}>Underline</button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()}>Strike</button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()}>Quote</button>
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>Bullets</button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}>Numbered list</button>
      <button type="button" onClick={() => insertUrl(false)}>Link</button>
      <button type="button" onClick={() => insertUrl(true)}>Image</button>
      <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>Clear formatting</button>
    </div>}
    <EditorContent editor={editor} />
  </div>;
}
