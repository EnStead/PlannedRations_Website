import React, { useState } from 'react';
import { ArrowLeft, Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code, Image, Link, List, ListOrdered, Quote, Undo, Redo, AlignLeft } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import * as Select from '@radix-ui/react-select';

const CreatePosts = () => {
  const [postTitle, setPostTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [selectedTags, setSelectedTags] = useState('');
  const [postType, setPostType] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
    ],
    content: '<p>Start typing here...</p>',
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[650px] p-4',
      },
    },
  });

  const MenuButton = ({ onClick, active, children, title }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-100 transition-colors ${
        active ? 'bg-gray-200' : ''
      }`}
      title={title}
      type="button"
    >
      {children}
    </button>
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className='bg-gray-50 min-h-screen py-10 px-10'>
      {/* LEFT SECTION */}
        <div>
            <div className='text-gray-600 font-medium flex gap-4 items-center cursor-pointer hover:text-gray-800 transition-colors'>
            <ArrowLeft size={20} /> 
            <p>Back</p> 
            </div>
            <h2 className='font-semibold text-xl text-gray-900 mt-4 mb-2'>Create Post</h2>
            <p className='text-gray-500 text-sm'>
            Share your latest recipe, restaurant review, or food story with your readers.
            </p>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-7'>
            <div>
                {/* TITLE SECTION */}
                <div className='flex items-center justify-between mb-6'>
                </div>

                {/* EDITOR SECTION */}
                <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
                {/* Editor Toolbar */}
                {editor && (
                    <div className='border-b border-gray-200 p-3 flex flex-wrap gap-1 items-center'>
                        <MenuButton
                            onClick={() => editor.chain().focus().undo().run()}
                            title="Undo"
                        >
                            <Undo size={18} />
                        </MenuButton>
                        <MenuButton
                            onClick={() => editor.chain().focus().redo().run()}
                            title="Redo"
                        >
                            <Redo size={18} />
                        </MenuButton>

                        <div className='w-px h-6 bg-gray-300 mx-1' />

                        <select
                            onChange={(e) => {
                            const value = e.target.value;
                            if (value === 'paragraph') {
                                editor.chain().focus().setParagraph().run();
                            } else {
                                editor.chain().focus().toggleHeading({ level: parseInt(value) }).run();
                            }
                            }}
                            className='px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-400'
                        >
                            <option value="paragraph">Normal text</option>
                            <option value="1">Heading 1</option>
                            <option value="2">Heading 2</option>
                            <option value="3">Heading 3</option>
                        </select>

                    <div className='w-px h-6 bg-gray-300 mx-1' />

                    <MenuButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        active={editor.isActive('bold')}
                        title="Bold"
                    >
                        <Bold size={18} />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        active={editor.isActive('italic')}
                        title="Italic"
                    >
                        <Italic size={18} />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        active={editor.isActive('underline')}
                        title="Underline"
                    >
                        <UnderlineIcon size={18} />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        active={editor.isActive('strike')}
                        title="Strikethrough"
                    >
                        <Strikethrough size={18} />
                    </MenuButton>

                    <div className='w-px h-6 bg-gray-300 mx-1' />

                    <MenuButton
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        active={editor.isActive('bulletList')}
                        title="Bullet List"
                    >
                        <List size={18} />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        active={editor.isActive('orderedList')}
                        title="Numbered List"
                    >
                        <ListOrdered size={18} />
                    </MenuButton>

                    <div className='w-px h-6 bg-gray-300 mx-1' />

                    <MenuButton
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        active={editor.isActive('blockquote')}
                        title="Quote"
                    >
                        <Quote size={18} />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        active={editor.isActive('codeBlock')}
                        title="Code Block"
                    >
                        <Code size={18} />
                    </MenuButton>
                    </div>
                )}

                {/* Editor Content */}
                <div className='bg-white rounded-b-lg'>
                    <EditorContent editor={editor} className='text-brand-subtext' />
                </div>

                {/* Character Count */}
                <div className='px-4 py-2 bg-brand-secondary/20 text-brand-secondary text-sm font-medium rounded-b-lg'>
                    740 Fill × 22 Hug
                </div>
                </div>
            </div>

            {/* RIGHT SECTION - Post Settings Panel */}
            <div>
                <h3 className='text-sm font-medium text-gray-900 mb-6'>Post Settings Panel</h3>

                {/* Cover Image */}
                <div className='mb-6'>
                <label className={`block text-sm font-medium mb-2 transition-colors ${coverImage ? 'text-gray-900' : 'text-gray-500'}`}>
                    Cover Image
                </label>
                <div 
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    coverImage ? 'border-gray-900' : 'border-gray-300'
                    }`}
                >
                    {coverImage ? (
                    <div className='relative'>
                        <img src={coverImage} alt="Cover" className='w-full h-32 object-cover rounded' />
                        <button
                        onClick={() => setCoverImage(null)}
                        className='absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs'
                        >
                        Remove
                        </button>
                    </div>
                    ) : (
                    <div>
                        <label className='cursor-pointer'>
                        <div className='w-12 h-12 mx-auto mb-3 text-purple-500'>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                        </div>
                            <span className='text-purple-600 hover:text-purple-700 font-medium'>
                                Click to upload
                            </span>
                            <span className='text-gray-500'> or drag and drop</span>
                            <input
                                type="file"
                                className='hidden'
                                accept="image/png,image/jpeg"
                                onChange={handleImageUpload}
                            />
                        </label>
                        <p className='text-xs text-gray-400 mt-1'>PNG or JPG (preferably portrait)</p>
                    </div>
                    )}
                </div>
                </div>

                {/* Post Title */}
                <div className='mb-6'>
                <label className={`block text-sm font-medium mb-2 transition-colors ${postTitle ? 'text-gray-900' : 'text-gray-500'}`}>
                    Post Title
                </label>
                <input
                    type="text"
                    placeholder="Type title here..."
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg transition-colors focus:outline-none ${
                    postTitle 
                        ? 'border-2 border-gray-900' 
                        : 'border border-gray-300 focus:border-gray-900'
                    }`}
                />
                </div>

                {/* Summary */}
                <div className='mb-6'>
                <label className={`block text-sm font-medium mb-2 transition-colors ${summary ? 'text-gray-900' : 'text-gray-500'}`}>
                    Summary / Meta Description
                </label>
                <textarea
                    placeholder="Type short description, good for SEO..."
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    rows={3}
                    className={`w-full px-3 py-2 rounded-lg transition-colors focus:outline-none resize-none ${
                    summary 
                        ? 'border-2 border-gray-900' 
                        : 'border border-gray-300 focus:border-gray-900'
                    }`}
                />
                </div>

                {/* Tags */}
                <div className='mb-6'>
                <label className={`block text-sm font-medium mb-2 transition-colors ${selectedTags ? 'text-gray-900' : 'text-gray-500'}`}>
                    Tag(s)
                </label>
                <Select.Root value={selectedTags} onValueChange={setSelectedTags}>
                    <Select.Trigger 
                    className={`w-full px-3 py-2 rounded-lg flex items-center justify-between transition-colors focus:outline-none ${
                        selectedTags 
                        ? 'border-2 border-gray-900' 
                        : 'border border-gray-300'
                    }`}
                    >
                    <Select.Value placeholder="Choose your type of audience..." />
                    <Select.Icon>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M6 9L1 4h10z" />
                        </svg>
                    </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                    <Select.Content className='bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden'>
                        <Select.Viewport className='p-1'>
                        <Select.Item value="food-lovers" className='px-3 py-2 cursor-pointer hover:bg-brand-secondary/20  rounded outline-none'>
                            <Select.ItemText>Food Lovers</Select.ItemText>
                        </Select.Item>
                        <Select.Item value="chefs" className='px-3 py-2 cursor-pointer hover:bg-brand-secondary/20  rounded outline-none'>
                            <Select.ItemText>Professional Chefs</Select.ItemText>
                        </Select.Item>
                        <Select.Item value="home-cooks" className='px-3 py-2 cursor-pointer hover:bg-brand-secondary/20  rounded outline-none'>
                            <Select.ItemText>Home Cooks</Select.ItemText>
                        </Select.Item>
                        <Select.Item value="foodies" className='px-3 py-2 cursor-pointer hover:bg-brand-secondary/20  rounded outline-none'>
                            <Select.ItemText>Foodies</Select.ItemText>
                        </Select.Item>
                        </Select.Viewport>
                    </Select.Content>
                    </Select.Portal>
                </Select.Root>
                </div>

                {/* Post Type */}
                <div className='mb-8'>
                <label className={`block text-sm font-medium mb-2 transition-colors ${postType ? 'text-gray-900' : 'text-gray-500'}`}>
                    Post Type
                </label>
                <Select.Root value={postType} onValueChange={setPostType}>
                    <Select.Trigger 
                    className={`w-full px-3 py-2 rounded-lg flex items-center justify-between transition-colors focus:outline-none ${
                        postType 
                        ? 'border-2 border-gray-900' 
                        : 'border border-gray-300'
                    }`}
                    >
                    <Select.Value placeholder="Choose if blog/article..." />
                    <Select.Icon>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M6 9L1 4h10z" />
                        </svg>
                    </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                    <Select.Content className='bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden'>
                        <Select.Viewport className='p-1'>
                        <Select.Item value="blog" className='px-3 py-2 cursor-pointer hover:bg-brand-secondary/20 rounded outline-none'>
                            <Select.ItemText>Blog</Select.ItemText>
                        </Select.Item>
                        <Select.Item value="article" className='px-3 py-2 cursor-pointer hover:bg-brand-secondary/20  rounded outline-none'>
                            <Select.ItemText>Article</Select.ItemText>
                        </Select.Item>
                        </Select.Viewport>
                    </Select.Content>
                    </Select.Portal>
                </Select.Root>
                </div>

                {/* Action Buttons */}
                <div className='flex gap-3 font-medium'>
                    <button className='flex-1 bg-brand-secondary hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-full transition-colors'>
                        Publish Post
                    </button>
                    <button className='flex-1 bg-white hover:bg-gray-50 text-brand-subtext font-medium py-3 px-6 rounded-full border-2 border-brand-subtext transition-colors'>
                        Save As Draft
                    </button>
                </div>
            </div>

        </div>
    </section>
  );
};

export default CreatePosts;