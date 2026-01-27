import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Image,
  Link,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  CloudUpload,
  Highlighter,
  ChevronDown,
  Check,
} from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Image as ImageExtension } from "@tiptap/extension-image";
import { Link as LinkExtension } from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import CustomSelect from "../../../Utility/CustomSelect";
import api from "../../../Utility/api";
import { useNavigate, useParams, useBlocker } from "react-router-dom";
import { useToast } from "../../Context/ToastProvider";
import PublishConfirmModal from "../../../Utility/PublishConfirmModal";
import LogoLoader from "../../../Utility/LogoLoader";

const CreatePosts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [postTitle, setPostTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [postType, setPostType] = useState("");
  const [availableTags, setAvailableTags] = useState([]);
  const [tagsOpen, setTagsOpen] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const fileRef = useRef(null);
  const tagsRef = useRef(null);
  const editorImageRef = useRef(null);
  const isSubmittingRef = useRef(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isLoading, setIsLoading] = useState(!!id);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      ImageExtension.configure({
        inline: true,
        allowBase64: true,
      }),
      LinkExtension.configure({
        openOnClick: false,
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
    ],
    content: "<p>Start typing here...</p>",
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none min-h-[650px] p-4",
      },
    },
  });

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await api.get("/admin/tags/list/all?applies_to=post");
        setAvailableTags(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch tags", err);
      }
    };
    fetchTags();
  }, []);

  // Fetch Post Data for Edit Mode
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      const fetchPost = async () => {
        try {
          const res = await api.get(`/admin/view-post/${id}`);
          const data = res.data.data;

          setPostTitle(data.title || "");
          setSummary(data.summary || "");
          // Map lowercase type to capitalized for CustomSelect
          setPostType(data.type ? data.type.charAt(0).toUpperCase() + data.type.slice(1) : "");
          setCoverImage(data.thumbnailUrl || null);

          // Handle tags (assuming backend returns array of objects or IDs)
          if (data.tags) {
            const tagIds = data.tags.map((t) =>
              typeof t === "object" ? t.id : t,
            );
            setSelectedTags(tagIds);
          }

          if (editor && data.contentHtml) {
            editor.commands.setContent(data.contentHtml);
          }
        } catch (err) {
          console.error("Failed to fetch post", err);
          showToast({
            title: "Error",
            description: "Failed to load post details",
            variant: "error",
          });
        } finally {
          setIsLoading(false);
        }
      };
      fetchPost();
    }
  }, [id, editor]); // Added editor dependency to set content once editor is ready

  // Handle click outside for tags dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tagsRef.current && !tagsRef.current.contains(event.target)) {
        setTagsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const MenuButton = ({ onClick, active, children, title }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-100 transition-colors ${
        active ? "bg-gray-200" : ""
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
      setCoverImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setCoverImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImage = () => {
    editorImageRef.current?.click();
  };

  const handleEditorImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        editor.chain().focus().setImage({ src: event.target.result }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleTag = (tagId) => {
    setSelectedTags((prev) => {
      if (prev.includes(tagId)) {
        return prev.filter((id) => id !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
  };

  // --- Navigation Blocker Logic ---
  const hasUnsavedData = useCallback(() => {
    // Simple check: if any field has content.
    // For edit mode, ideally we compare with initial data, but checking for non-empty is a good baseline.
    return (
      postTitle ||
      summary ||
      (editor && !editor.isEmpty) ||
      coverImageFile ||
      selectedTags.length > 0 ||
      postType
    );
  }, [postTitle, summary, editor, coverImageFile, selectedTags, postType]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isSubmittingRef.current || !hasUnsavedData()) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedData]);

  const blockerFn = useCallback(
    ({ currentLocation, nextLocation }) =>
      !isSubmittingRef.current &&
      hasUnsavedData() &&
      currentLocation.pathname !== nextLocation.pathname,
    [hasUnsavedData],
  );

  const blocker = useBlocker(blockerFn);

  useEffect(() => {
    if (blocker.state === "blocked") {
      const confirm = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?",
      );
      if (confirm) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker]);

  const handleSubmit = async (isDraft = false) => {
    if (!postTitle.trim()) {
      showToast({
        title: "Validation Error",
        description: "Post title is required",
        variant: "error",
      });
      return;
    }

    isSubmittingRef.current = true;
    if (!isDraft) setIsPublishing(true);
    try {
      const formData = new FormData();
      formData.append("title", postTitle);
      formData.append("summary", summary);
      formData.append("content", editor.getHTML());
      formData.append("type", postType.toLowerCase());
      formData.append("is_draft", isDraft ? "1" : "0");

      if (coverImageFile) {
        formData.append("thumbnail", coverImageFile);
      }

      if (selectedTags.length > 0) {
        selectedTags.forEach((tag) => formData.append("tags[]", tag));
      }

      let response;
      if (id) {
        // Update
        response = await api.post(`/admin/update-post/${id}`, formData);
      } else {
        // Create
        response = await api.post("/admin/create-post", formData);
      }

      showToast({
        title: "Success",
        description:
          response.data?.message ||
          (isDraft ? "Post saved as draft" : "Post published successfully"),
        variant: "success",
      });

      navigate("/admin/posts");
    } catch (error) {
      isSubmittingRef.current = false;
      if (!isDraft) setIsPublishing(false);
      console.error("Post submit failed", error.response?.data);
      console.error("Post submit failed", error);
      showToast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save post",
        variant: "error",
      });
    } finally {
      if (!isDraft) setIsPublishing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-brand-primary">
        <LogoLoader />
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-10 px-10">
      {/* LEFT SECTION */}
      <div>
        <div
          onClick={() => navigate("/admin/posts")}
          className="text-brand-cardhead font-medium flex gap-4 items-center cursor-pointer hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
          <p>Back</p>
        </div>
        <h2 className="font-medium font-dash text-xl text-brand-primary mt-4 mb-2">
          {id ? "Edit Post" : "Create Post"}
        </h2>
        <p className="text-brand-subtext ">
          Share your latest recipe, restaurant review, or food story with your
          readers.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-7">
        <div>
          {/* TITLE SECTION */}
          <div className="flex items-center justify-between mb-6"></div>

          {/* EDITOR SECTION */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Editor Toolbar */}
            {editor && (
              <div className="border-b border-gray-200 p-3 flex flex-wrap gap-1 items-center sticky top-0 z-10 bg-white rounded-t-lg">
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

                <div className="w-px h-6 bg-gray-300 mx-1" />

                <select
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "paragraph") {
                      editor.chain().focus().setParagraph().run();
                    } else {
                      editor
                        .chain()
                        .focus()
                        .toggleHeading({ level: parseInt(value) })
                        .run();
                    }
                  }}
                  className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-400"
                >
                  <option value="paragraph">Normal text</option>
                  <option value="1">Heading 1</option>
                  <option value="2">Heading 2</option>
                  <option value="3">Heading 3</option>
                </select>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                <MenuButton
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  active={editor.isActive("bold")}
                  title="Bold"
                >
                  <Bold size={18} />
                </MenuButton>
                <MenuButton
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  active={editor.isActive("italic")}
                  title="Italic"
                >
                  <Italic size={18} />
                </MenuButton>
                <MenuButton
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  active={editor.isActive("underline")}
                  title="Underline"
                >
                  <UnderlineIcon size={18} />
                </MenuButton>
                <MenuButton
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  active={editor.isActive("strike")}
                  title="Strikethrough"
                >
                  <Strikethrough size={18} />
                </MenuButton>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                <MenuButton
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  active={editor.isActive("bulletList")}
                  title="Bullet List"
                >
                  <List size={18} />
                </MenuButton>
                <MenuButton
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  active={editor.isActive("orderedList")}
                  title="Numbered List"
                >
                  <ListOrdered size={18} />
                </MenuButton>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                <MenuButton
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                  active={editor.isActive("blockquote")}
                  title="Quote"
                >
                  <Quote size={18} />
                </MenuButton>
                <MenuButton
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                  active={editor.isActive("codeBlock")}
                  title="Code Block"
                >
                  <Code size={18} />
                </MenuButton>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                <MenuButton
                  onClick={setLink}
                  active={editor.isActive("link")}
                  title="Add Link"
                >
                  <Link size={18} />
                </MenuButton>

                <MenuButton onClick={addImage} title="Add Image">
                  <Image size={18} />
                </MenuButton>
                <input
                  type="file"
                  ref={editorImageRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleEditorImageChange}
                />

                <div className="w-px h-6 bg-gray-300 mx-1" />

                <div className="flex items-center gap-2 px-2">
                  <input
                    type="color"
                    onInput={(event) =>
                      editor.chain().focus().setColor(event.target.value).run()
                    }
                    value={editor.getAttributes("textStyle").color || "#000000"}
                    className="w-5 h-5 p-0 border-0 rounded cursor-pointer"
                    title="Text Color"
                  />
                  <div
                    className="flex items-center gap-1 cursor-pointer"
                    title="Highlight Color"
                  >
                    <Highlighter size={16} className="text-gray-600" />
                    <input
                      type="color"
                      onInput={(event) =>
                        editor
                          .chain()
                          .focus()
                          .toggleHighlight({ color: event.target.value })
                          .run()
                      }
                      value={
                        editor.getAttributes("highlight").color || "#ffff00"
                      }
                      className="w-5 h-5 p-0 border-0 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Editor Content */}
            <div className="bg-white rounded-b-lg">
              <EditorContent editor={editor} className="text-brand-subtext" />
            </div>

            {/* Character Count */}
            <div className="px-4 py-2 bg-brand-secondary/20 text-brand-secondary text-sm font-medium rounded-b-lg">
              740 Fill × 22 Hug
            </div>
          </div>
        </div>

        {/* RIGHT SECTION - Post Settings Panel */}
        <div className="sticky top-10 h-fit bg-white rounded-lg">
          <h3 className="text-sm font-medium text-center text-brand-subtext py-2 mb-5 border-b border-brand-planoff">
            Post Settings Panel
          </h3>

          {/* Cover Image */}
          <div className="mb-4 px-3">
            <label
              className={`block text-sm font-medium mb-2 transition-colors ${coverImage ? "text-gray-900" : "text-gray-500"}`}
            >
              Cover Image
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileRef.current?.click()}
              className="bg-brand-carhead border flex justify-center flex-col 
                                items-center border-brand-planoff rounded-xl h-40 text-center p-4 cursor-pointer"
            >
              {coverImage ? (
                <img
                  src={coverImage}
                  alt="Cover"
                  className="h-full object-contain rounded-lg"
                />
              ) : (
                <>
                  <div className="text-center mb-1 rounded-full text-brand-cloud p-2 w-fit bg-brand-purp border border-brand-background1 text-xl">
                    <CloudUpload />
                  </div>
                  <p className="text-brand-muted mb-1 text-sm">
                    <span className="font-medium text-brand-purUp">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-brand-muted mt-1">
                    PNG or JPG (preferably portrait)
                  </p>
                </>
              )}
              <input
                ref={fileRef}
                type="file"
                className="hidden"
                accept="image/png,image/jpeg"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          {/* Post Title */}
          <div className="mb-4 px-3">
            <label
              className={` font-medium transition ${postTitle ? "text-brand-primary" : "text-brand-cartext"}`}
            >
              Post Title
            </label>
            <input
              type="text"
              placeholder="Type title here..."
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className={`border ${postTitle ? "border-brand-primary" : "border-brand-planoff"} bg-brand-carhead rounded-full mt-1 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff w-full`}
            />
          </div>

          {/* Summary */}
          <div className="mb-4 px-3">
            <label
              className={` font-medium transition ${summary ? "text-brand-primary" : "text-brand-cartext"}`}
            >
              Summary / Meta Description
            </label>
            <textarea
              placeholder="Type short description, good for SEO..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={3}
              className={`border ${summary ? "border-brand-primary" : "border-brand-planoff"} bg-brand-carhead rounded-2xl mt-1 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff w-full resize-none`}
            />
          </div>

          {/* Tags */}
          <div className="mb-4 px-3 relative" ref={tagsRef}>
            <label
              className={` font-medium transition ${selectedTags.length > 0 ? "text-brand-primary" : "text-brand-cartext"}`}
            >
              Tag(s)
            </label>
            <button
              type="button"
              onClick={() => setTagsOpen(!tagsOpen)}
              className={`w-full flex items-center justify-between border ${selectedTags.length > 0 ? "border-brand-primary" : "border-brand-planoff"} bg-brand-carhead rounded-full mt-1 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff`}
            >
              <span className="truncate">
                {selectedTags.length > 0
                  ? availableTags
                      .filter((t) => selectedTags.includes(t.id))
                      .map((t) => t.title)
                      .join(", ")
                  : "Choose your type of audience..."}
              </span>
              <ChevronDown size={18} className="text-gray-500" />
            </button>

            {tagsOpen && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border border-brand-planoff rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto p-2">
                {availableTags.map((tag) => (
                  <div
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className="flex items-center justify-between px-4 py-2 hover:bg-brand-secondary/10 rounded-lg cursor-pointer transition"
                  >
                    <span className="text-brand-subtext">{tag.title}</span>
                    {selectedTags.includes(tag.id) && (
                      <Check size={16} className="text-brand-secondary" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Post Type */}
          <div className="mb-8 px-3">
            <CustomSelect
              label="Post Type"
              options={["Blog", "Article"]}
              value={postType}
              onChange={setPostType}
              classNameLabel={
                postType ? "text-brand-primary" : "text-brand-cartext"
              }
              classNameSelect={
                postType ? "border-brand-primary" : "border-brand-planoff"
              }
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 font-medium">
            <button
              onClick={() => setPublishModalOpen(true)}
              disabled={isPublishing}
              className="flex-1 bg-brand-secondary text-white font-bold py-3 rounded-full hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Publish Post
            </button>
            <button
              onClick={() => handleSubmit(true)}
              className="flex-1 text-brand-primary font-bold border border-brand-primary rounded-full py-3 hover:bg-brand-primary hover:text-white transition"
            >
              Save As Draft
            </button>
          </div>
        </div>
      </div>

      <PublishConfirmModal
        open={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
        onConfirm={async () => {
            // Keep modal open while loading if desired, or close it immediately.
            // Usually for async actions inside modals, we keep it open to show loading state on the modal button.
            await handleSubmit(false);
            setPublishModalOpen(false);
          }}
        loading={isPublishing}
        title="Ready to Publish this Post?"
        subtext="Publishing this post will make it visible to all users on the platform."
        actionBtn="Publish Now"
      />
    </section>
  );
};

export default CreatePosts;
