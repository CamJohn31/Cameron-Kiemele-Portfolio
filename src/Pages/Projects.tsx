import React, { useState, useEffect } from "react";
import { Trash2, Plus, Edit2, X, Menu, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  date: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    link: "",
    date: "",
  });

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleAddProject = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      technologies: "",
      link: "",
      date: new Date().toISOString().split("T")[0],
    });
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(", "),
      link: project.link || "",
      date: project.date,
    });
    setIsModalOpen(true);
  };

  const handleSaveProject = () => {
    if (!formData.title.trim() || !formData.description.trim() || !formData.technologies.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    const newProjectData = {
      title: formData.title,
      description: formData.description,
      technologies: formData.technologies.split(",").map((tech) => tech.trim()),
      link: formData.link,
      date: formData.date,
    };

    if (editingId) {
      setProjects(
        projects.map((project) =>
          project.id === editingId ? { ...project, ...newProjectData } : project
        )
      );
    } else {
      const newProject: Project = {
        id: Date.now().toString(),
        ...newProjectData,
      };
      setProjects([newProject, ...projects]);
    }

    setIsModalOpen(false);
    setFormData({
      title: "",
      description: "",
      technologies: "",
      link: "",
      date: "",
    });
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((project) => project.id !== id));
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed text-gray-100 py-20 px-6"
      style={{
        backgroundImage: "url('https://www.technocrazed.com/wp-content/uploads/2015/12/black-wallpaper-to-set-as-background-5.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-slate-900/70 -z-10"></div>

      {/* Top Right Navigation */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="p-3 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg transition-all border border-emerald-500/40 flex items-center gap-2"
        >
          {isNavOpen ? <X size={24} /> : <Menu size={24} />}
          <span className="text-emerald-400 font-semibold hidden sm:inline">Menu</span>
        </button>

        {/* Dropdown Menu */}
        {isNavOpen && (
          <div className="absolute top-16 right-0 bg-slate-900/95 backdrop-blur-sm border border-emerald-500/40 rounded-lg shadow-2xl overflow-hidden w-48 animate-in fade-in slide-in-from-top-2">
            <nav className="flex flex-col">
              <Link
                to="/"
                className="px-6 py-3 text-gray-300 hover:text-emerald-400 hover:bg-slate-800/50 transition-all border-b border-emerald-500/20 flex items-center gap-2"
                onClick={() => setIsNavOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/blog"
                className="px-6 py-3 text-gray-300 hover:text-emerald-400 hover:bg-slate-800/50 transition-all flex items-center gap-2"
                onClick={() => setIsNavOpen(false)}
              >
                Blog
              </Link>
            </nav>
          </div>
        )}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent pb-4">
            Projects
          </h1>
          <p className="text-xl text-gray-300">Showcasing my work and technical implementations</p>
        </div>

        {/* Add Project Button */}
        <button
          onClick={handleAddProject}
          className="mb-12 flex items-center gap-2 px-6 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 rounded-lg transition-all hover:scale-105 text-emerald-400 font-semibold"
        >
          <Plus size={20} />
          Add New Project
        </button>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.length === 0 ? (
            <div className="col-span-full bg-slate-800/50 backdrop-blur-sm rounded-2xl p-12 border border-emerald-500/20 text-center">
              <p className="text-gray-400 text-lg">No projects yet. Start by creating your first project!</p>
            </div>
          ) : (
            projects.map((project) => (
              <article
                key={project.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-500/40 transition-all group flex flex-col"
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2 text-emerald-400 group-hover:text-emerald-300 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-gray-400 text-sm">{new Date(project.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProject(project)}
                      className="p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit2 size={18} className="text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 size={18} className="text-red-400" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed mb-4 flex-grow">{project.description}</p>

                {/* Technologies */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-xs text-emerald-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Link */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mt-4"
                  >
                    <span>View Project</span>
                    <ExternalLink size={16} />
                  </a>
                )}
              </article>
            ))
          )}
        </div>
      </div>

      {/* Modal for Adding/Editing Projects */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-slate-800 rounded-2xl border border-emerald-500/40 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-emerald-400">
                {editingId ? "Edit Project" : "New Project"}
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
                <label className="block text-sm font-semibold mb-2 text-emerald-400">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Project title"
                  className="w-full bg-slate-700/50 border border-emerald-500/20 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-emerald-400">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Project description"
                  rows={6}
                  className="w-full bg-slate-700/50 border border-emerald-500/20 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-all resize-none"
                />
              </div>

              {/* Technologies Input */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-emerald-400">Technologies * (comma-separated)</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="e.g., React, TypeScript, Tailwind CSS"
                  className="w-full bg-slate-700/50 border border-emerald-500/20 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>

              {/* Link Input */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-emerald-400">Project Link (optional)</label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://example.com"
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

              {/* Buttons */}
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProject}
                  className="px-6 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 rounded-lg transition-all text-emerald-400 font-semibold"
                >
                  {editingId ? "Update Project" : "Create Project"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
