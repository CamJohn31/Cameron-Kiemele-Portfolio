import React, { useState, useEffect } from "react";
import { Trash2, Plus, Edit2, X, Menu } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  content: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", date: "", content: "" });

  // Load posts from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem("blogPosts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("blogPosts", JSON.stringify(posts));
  }, [posts]);

  const handleAddPost = () => {
    setEditingId(null);
    setFormData({ title: "", date: new Date().toISOString().split("T")[0], content: "" });
    setIsModalOpen(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingId(post.id);
    setFormData({ title: post.title, date: post.date, content: post.content });
    setIsModalOpen(true);
  };

  const handleSavePost = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Please fill in all fields");
      return;
    }

    if (editingId) {
      setPosts(
        posts.map((post) =>
          post.id === editingId
            ? { ...post, title: formData.title, date: formData.date, content: formData.content }
            : post
        )
      );
    } else {
      const newPost: BlogPost = {
        id: Date.now().toString(),
        title: formData.title,
        date: formData.date,
        content: formData.content,
      };
      setPosts([newPost, ...posts]);
    }

    setIsModalOpen(false);
    setFormData({ title: "", date: "", content: "" });
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed text-gray-100 py-20 px-6"
      style={{
        backgroundImage: "url('https://img.freepik.com/premium-photo/vintage-books-rustic-wooden-desk-background-with-empty-space-text_829699-6672.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-slate-900/70 -z-10"></div>

      {/* Top Right Navigation */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="p-3 bg-black/60 hover:bg-black/80 rounded-lg transition-all border border-gray-700/60 flex items-center gap-2"
        >
          {isNavOpen ? <X size={24} /> : <Menu size={24} />}
          <span className="text-gray-200 font-semibold hidden sm:inline">Menu</span>
        </button>

        {/* Dropdown Menu */}
        {isNavOpen && (
          <div className="absolute top-16 right-0 bg-slate-900/95 backdrop-blur-sm border border-gray-700/60 rounded-lg shadow-2xl overflow-hidden w-48 animate-in fade-in slide-in-from-top-2">
            <nav className="flex flex-col">
              <Link
                to="/"
                className="px-6 py-3 text-gray-300 hover:text-amber-400 hover:bg-slate-800/50 transition-all border-b border-gray-700/40 flex items-center gap-2"
                onClick={() => setIsNavOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/projects"
                className="px-6 py-3 text-gray-300 hover:text-amber-400 hover:bg-slate-800/50 transition-all flex items-center gap-2"
                onClick={() => setIsNavOpen(false)}
              >
                Projects
              </Link>
            </nav>
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-amber-700/40 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-red-700 bg-clip-text text-transparent pb-4">
            Blog
          </h1>
          <p className="text-xl text-amber-100">Thoughts, insights, and stories</p>
        </div>

        {/* Add Post Button */}
        <button
          onClick={handleAddPost}
          className="mb-12 flex items-center gap-2 px-6 py-3 bg-black/60 hover:bg-black/80 border border-gray-700/60 rounded-lg transition-all hover:scale-105 text-gray-200 font-semibold"
        >
          <Plus size={20} />
          Add New Post
        </button>

        {/* Blog Posts */}
        <div className="space-y-8">
          {posts.length === 0 ? (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-12 border border-emerald-500/20 text-center">
              <p className="text-gray-400 text-lg">No blog posts yet. Start by creating your first post!</p>
            </div>
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 hover:border-emerald-500/40 transition-all group"
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2 text-emerald-400 group-hover:text-emerald-300 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-sm">{new Date(post.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditPost(post)}
                      className="p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit2 size={18} className="text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 size={18} className="text-red-400" />
                    </button>
                  </div>
                </div>
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">{post.content}</div>
              </article>
            ))
          )}
        </div>
      </div>

      {/* Modal for Adding/Editing Posts */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-slate-800 rounded-2xl border border-emerald-500/40 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-emerald-400">
                {editingId ? "Edit Post" : "New Post"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-emerald-400">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Blog post title"
                  className="w-full bg-slate-700/50 border border-emerald-500/20 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>

              {/* Date Input */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-emerald-400">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-slate-700/50 border border-emerald-500/20 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>

              {/* Content Input */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-emerald-400">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your blog post content here..."
                  rows={10}
                  className="w-full bg-slate-700/50 border border-emerald-500/20 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-all resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePost}
                  className="px-6 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 rounded-lg transition-all text-emerald-400 font-semibold"
                >
                  {editingId ? "Update Post" : "Create Post"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
