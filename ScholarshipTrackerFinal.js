import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Calendar, DollarSign, Clock, Award, FileText, AlertCircle, User, LogOut, Settings, ArrowLeft, Users, Download, GraduationCap, AlertTriangle, ExternalLink, BarChart3, TrendingUp, Target } from 'lucide-react';

const ScholarshipTrackerFinal = () => {
  // Consolidated app state
  const [appState, setAppState] = useState({
    currentUser: null,
    showAdminPanel: false,
    showProgressDashboard: false,
    showForm: false,
    editingId: null,
    showCreateForm: false,
    showDeleteModal: false,
    deletingUser: null,
    deleteConfirmation: '',
    filterStatus: 'all',
    sortBy: 'dueDate'
  });

  // User data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      graduationYear: "2025",
      school: "Lincoln High School",
      createdAt: "2024-01-15T10:00:00.000Z",
      lastLogin: "2024-08-10T14:30:00.000Z"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "mike.chen@email.com",
      graduationYear: "2026",
      school: "Roosevelt High School",
      createdAt: "2024-02-20T09:00:00.000Z",
      lastLogin: "2024-08-12T16:45:00.000Z"
    }
  ]);

  // Simplified scholarship data structure
  const [allScholarships, setAllScholarships] = useState({
    1: [
      {
        id: 1,
        name: "National Merit Scholarship",
        organization: "National Merit Scholarship Corporation",
        website: "https://www.nationalmerit.org",
        status: "In Progress",
        dueDate: "2024-10-15",
        amount: "$2,500",
        type: "Merit-Based",
        priority: "High",
        progress: 75,
        notes: "Semi-finalist status confirmed",
        documents: {
          transcript: "https://drive.google.com/file/d/transcript123",
          essay: "https://docs.google.com/document/d/essay456"
        }
      }
    ],
    2: [
      {
        id: 3,
        name: "Tech Future Leaders Grant",
        organization: "Silicon Valley Tech Foundation",
        website: "https://www.svtechfoundation.org",
        status: "Not Started",
        dueDate: "2024-11-30",
        amount: "$5,000",
        type: "STEM",
        priority: "High",
        progress: 15,
        notes: "Need to complete coding portfolio",
        documents: {
          portfolio: "https://github.com/michaelchen/portfolio"
        }
      }
    ]
  });

  const [scholarships, setScholarships] = useState([]);
  const [createFormData, setCreateFormData] = useState({ name: '', email: '', graduationYear: '', school: '' });
  
  // Simplified form data
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    website: '',
    status: 'Not Started',
    dueDate: '',
    amount: '',
    type: '',
    priority: 'Medium',
    progress: 0,
    notes: '',
    documents: {}
  });

  // Options
  const statusOptions = ['Not Started', 'In Progress', 'Submitted', 'Rejected', 'Awarded'];
  const typeOptions = ['Merit-Based', 'Need-Based', 'Athletic', 'STEM', 'Essay Contest', 'Community Service', 'Local/Regional', 'Other'];
  const priorityOptions = ['High', 'Medium', 'Low'];

  // Load scholarships when user changes
  useEffect(() => {
    if (appState.currentUser) {
      setScholarships(allScholarships[appState.currentUser.id] || []);
    }
  }, [appState.currentUser, allScholarships]);

  // Utility functions
  const updateAppState = (updates) => setAppState(prev => ({ ...prev, ...updates }));

  const getDaysUntilDue = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    return Math.ceil((due - today) / (1000 * 60 * 60 * 24));
  };

  const getStatusColor = (status) => {
    const colors = {
      'Not Started': 'bg-gray-100 text-gray-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Submitted': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Awarded': 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'bg-red-100 text-red-800 border-red-200',
      'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Low': 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatLastLogin = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor(Math.abs(now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getStatusSummary = () => ({
    total: scholarships.length,
    notStarted: scholarships.filter(s => s.status === 'Not Started').length,
    inProgress: scholarships.filter(s => s.status === 'In Progress').length,
    submitted: scholarships.filter(s => s.status === 'Submitted').length,
    awarded: scholarships.filter(s => s.status === 'Awarded').length,
    rejected: scholarships.filter(s => s.status === 'Rejected').length
  });

  // Handlers
  const handleLogin = (user) => updateAppState({ currentUser: user });
  
  const handleLogout = () => updateAppState({ 
    currentUser: null, 
    showAdminPanel: false, 
    showProgressDashboard: false 
  });

  const handleCreateUser = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    
    setUsers(prev => [...prev, newUser]);
    updateAppState({ currentUser: newUser, showCreateForm: false });
    setCreateFormData({ name: '', email: '', graduationYear: '', school: '' });
  };

  const handleDeleteUser = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    setAllScholarships(prev => {
      const updated = { ...prev };
      delete updated[userId];
      return updated;
    });
    
    if (appState.currentUser && appState.currentUser.id === userId) {
      handleLogout();
    }
    updateAppState({ showDeleteModal: false, deletingUser: null, deleteConfirmation: '' });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      organization: '',
      website: '',
      status: 'Not Started',
      dueDate: '',
      amount: '',
      type: '',
      priority: 'Medium',
      progress: 0,
      notes: '',
      documents: {}
    });
    updateAppState({ editingId: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newScholarship = {
      ...formData,
      id: appState.editingId || Date.now()
    };
    
    if (appState.editingId) {
      setScholarships(prev => prev.map(s => s.id === appState.editingId ? newScholarship : s));
      setAllScholarships(prev => ({
        ...prev,
        [appState.currentUser.id]: prev[appState.currentUser.id].map(s => 
          s.id === appState.editingId ? newScholarship : s
        )
      }));
    } else {
      setScholarships(prev => [...prev, newScholarship]);
      setAllScholarships(prev => ({
        ...prev,
        [appState.currentUser.id]: [...(prev[appState.currentUser.id] || []), newScholarship]
      }));
    }
    
    updateAppState({ showForm: false });
    resetForm();
  };

  const handleEdit = (scholarship) => {
    setFormData(scholarship);
    updateAppState({ editingId: scholarship.id, showForm: true });
  };

  const handleDelete = (id) => {
    setScholarships(prev => prev.filter(s => s.id !== id));
    setAllScholarships(prev => ({
      ...prev,
      [appState.currentUser.id]: prev[appState.currentUser.id].filter(s => s.id !== id)
    }));
  };

  const filteredScholarships = scholarships
    .filter(s => appState.filterStatus === 'all' || s.status === appState.filterStatus)
    .sort((a, b) => {
      if (appState.sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (appState.sortBy === 'priority') {
        const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      if (appState.sortBy === 'amount') {
        const aAmount = parseInt(a.amount.replace(/[^\d]/g, '')) || 0;
        const bAmount = parseInt(b.amount.replace(/[^\d]/g, '')) || 0;
        return bAmount - aAmount;
      }
      return a.name.localeCompare(b.name);
    });

  // Document Links Component
  const DocumentLinks = ({ scholarship }) => {
    const docs = scholarship.documents || {};
    const hasDocuments = Object.keys(docs).length > 0;

    if (!hasDocuments) return null;

    return (
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="text-sm font-medium text-gray-700 mb-2">📄 Documents:</div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(docs).map(([label, url]) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs hover:bg-blue-100"
            >
              <FileText size={12} />
              {label}
              <ExternalLink size={10} />
            </a>
          ))}
        </div>
      </div>
    );
  };

  // Login Screen
  if (!appState.currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Scholarship Tracker</h1>
            <p className="text-gray-600">Select your profile or create a new one</p>
          </div>

          {!appState.showCreateForm ? (
            <div className="space-y-4">
              {users.length > 0 && (
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => updateAppState({ showAdminPanel: true })}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                  >
                    <Settings size={16} />
                    <span className="text-sm">Manage Students</span>
                  </button>
                </div>
              )}

              {users.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Select Student:</h3>
                  {users.map(user => (
                    <button
                      key={user.id}
                      onClick={() => handleLogin(user)}
                      className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User size={20} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-600">
                            {user.graduationYear && `Class of ${user.graduationYear}`}
                            {user.email && ` • ${user.email}`}
                          </div>
                          <div className="text-xs text-gray-500">
                            Last active: {formatLastLogin(user.lastLogin)}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              <div className={users.length > 0 ? 'border-t pt-4 mt-6' : ''}>
                <button
                  onClick={() => updateAppState({ showCreateForm: true })}
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600"
                >
                  <Plus size={20} />
                  <span>Add New Student</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={(e) => {
              e.preventDefault();
              if (createFormData.name.trim()) {
                handleCreateUser(createFormData);
              }
            }} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Student Profile</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={createFormData.name}
                  onChange={(e) => setCreateFormData({...createFormData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter student's full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
                <input
                  type="email"
                  value={createFormData.email}
                  onChange={(e) => setCreateFormData({...createFormData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="student@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Graduation Year</label>
                <input
                  type="number"
                  min="2024"
                  max="2035"
                  value={createFormData.graduationYear}
                  onChange={(e) => setCreateFormData({...createFormData, graduationYear: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="2025"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">School/Institution</label>
                <input
                  type="text"
                  value={createFormData.school}
                  onChange={(e) => setCreateFormData({...createFormData, school: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="High School or University name"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    updateAppState({ showCreateForm: false });
                    setCreateFormData({ name: '', email: '', graduationYear: '', school: '' });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Profile
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Admin Panel
  if (appState.showAdminPanel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateAppState({ showAdminPanel: false })}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
                  <p className="text-gray-600">Manage student profiles and data</p>
                </div>
              </div>
              
              <button
                onClick={() => updateAppState({ showAdminPanel: false })}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                {appState.currentUser ? 'Back to Dashboard' : 'Back to Login'}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Users size={20} className="text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Students ({users.length})</h2>
              </div>
              <p className="text-gray-600">Manage student profiles and export scholarship data</p>
            </div>

            <div className="divide-y divide-gray-200">
              {users.map(user => (
                <div key={user.id} className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {user.name}
                          {appState.currentUser && appState.currentUser.id === user.id && (
                            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Current</span>
                          )}
                        </h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          {user.email && <div>📧 {user.email}</div>}
                          {user.graduationYear && <div>🎓 Class of {user.graduationYear}</div>}
                          {user.school && <div>🏫 {user.school}</div>}
                          <div>📅 Created: {new Date(user.createdAt).toLocaleDateString()}</div>
                          <div>🕒 Last Login: {formatLastLogin(user.lastLogin)}</div>
                          <div>📚 Scholarships: {allScholarships[user.id]?.length || 0}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert(`Export ${user.name}'s scholarship data as CSV`)}
                        className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 flex items-center gap-2"
                      >
                        <Download size={16} />
                        Export Data
                      </button>
                      
                      {(!appState.currentUser || appState.currentUser.id !== user.id) && (
                        <button
                          onClick={() => updateAppState({ 
                            deletingUser: user, 
                            showDeleteModal: true, 
                            deleteConfirmation: '' 
                          })}
                          className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center gap-2"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {appState.showDeleteModal && appState.deletingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle size={24} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Delete Student Profile</h3>
                  <p className="text-sm text-gray-600">This action cannot be undone</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-3">
                  Type the student's full name to confirm deletion:
                </p>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">
                    Type: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{appState.deletingUser.name}</span>
                  </div>
                  <input
                    type="text"
                    value={appState.deleteConfirmation}
                    onChange={(e) => updateAppState({ deleteConfirmation: e.target.value })}
                    placeholder={`Type "${appState.deletingUser.name}" to confirm`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    autoFocus
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => updateAppState({ 
                    showDeleteModal: false, 
                    deletingUser: null, 
                    deleteConfirmation: '' 
                  })}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteUser(appState.deletingUser.id)}
                  disabled={appState.deleteConfirmation !== appState.deletingUser.name}
                  className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
                    appState.deleteConfirmation === appState.deletingUser.name
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Trash2 size={16} />
                  Delete Forever
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Main Application
  const summary = getStatusSummary();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{appState.currentUser.name}</h2>
                <p className="text-sm text-gray-600">
                  {appState.currentUser.graduationYear && `Class of ${appState.currentUser.graduationYear}`}
                  {appState.currentUser.email && ` • ${appState.currentUser.email}`}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateAppState({ showAdminPanel: true })}
                className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg flex items-center gap-2"
              >
                <Settings size={16} />
                <span className="hidden sm:inline">Manage</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg flex items-center gap-2"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <div className="text-2xl font-bold text-blue-600">{summary.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <div className="text-2xl font-bold text-gray-600">{summary.notStarted}</div>
              <div className="text-sm text-gray-600">Not Started</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <div className="text-2xl font-bold text-blue-600">{summary.inProgress}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <div className="text-2xl font-bold text-green-600">{summary.submitted}</div>
              <div className="text-sm text-gray-600">Submitted</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <div className="text-2xl font-bold text-purple-600">{summary.awarded}</div>
              <div className="text-sm text-gray-600">Awarded</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <div className="text-2xl font-bold text-red-600">{summary.rejected}</div>
              <div className="text-sm text-gray-600">Rejected</div>
            </div>
          </div>

          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Scholarship Applications</h1>
                <p className="text-gray-600">Track and manage {appState.currentUser.name}'s scholarship applications</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => alert(`Export ${appState.currentUser.name}'s scholarship data as CSV`)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
                >
                  <FileText size={16} />
                  Export CSV
                </button>
                <button
                  onClick={() => updateAppState({ showForm: true })}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Scholarship
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
                <select
                  value={appState.filterStatus}
                  onChange={(e) => updateAppState({ filterStatus: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Applications</option>
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                <select
                  value={appState.sortBy}
                  onChange={(e) => updateAppState({ sortBy: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="dueDate">Due Date</option>
                  <option value="priority">Priority Level</option>
                  <option value="amount">Amount</option>
                  <option value="name">Scholarship Name</option>
                </select>
              </div>
            </div>
          </div>

          {/* Form Modal */}
          {appState.showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
                <form onSubmit={handleSubmit} className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {appState.editingId ? 'Edit' : 'Add New'} Scholarship
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Scholarship Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({...formData, organization: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({...formData, website: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com/scholarship"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                      <input
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                      <input
                        type="text"
                        placeholder="$5,000"
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Type</option>
                        {typeOptions.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <select
                        value={formData.priority}
                        onChange={(e) => setFormData({...formData, priority: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {priorityOptions.map(priority => (
                          <option key={priority} value={priority}>{priority}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Progress (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.progress}
                        onChange={(e) => setFormData({...formData, progress: parseInt(e.target.value) || 0})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                      <textarea
                        rows="3"
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Any additional notes or reminders..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => { 
                        updateAppState({ showForm: false }); 
                        resetForm(); 
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {appState.editingId ? 'Update' : 'Add'} Scholarship
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Scholarship List */}
          <div className="space-y-4">
            {filteredScholarships.map(scholarship => {
              const daysUntilDue = getDaysUntilDue(scholarship.dueDate);
              const isOverdue = daysUntilDue !== null && daysUntilDue < 0;
              const isDueSoon = daysUntilDue !== null && daysUntilDue <= 7 && daysUntilDue >= 0;

              return (
                <div key={scholarship.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {scholarship.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(scholarship.status)}`}>
                          {scholarship.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(scholarship.priority)}`}>
                          {scholarship.priority} Priority
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign size={16} className="text-green-600" />
                          <span className="font-medium">Amount:</span>
                          <span>{scholarship.amount || 'Not specified'}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className={isOverdue ? 'text-red-600' : isDueSoon ? 'text-yellow-600' : 'text-gray-600'} />
                          <span className="font-medium">Due:</span>
                          <span className={isOverdue ? 'text-red-600' : isDueSoon ? 'text-yellow-600' : ''}>
                            {scholarship.dueDate ? (
                              <>
                                {scholarship.dueDate}
                                {daysUntilDue !== null && (
                                  <span className="ml-1">
                                    ({isOverdue ? `${Math.abs(daysUntilDue)} days overdue` : 
                                      daysUntilDue === 0 ? 'Due today' : 
                                      `${daysUntilDue} days left`})
                                  </span>
                                )}
                              </>
                            ) : 'Not set'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Award size={16} className="text-blue-600" />
                          <span className="font-medium">Type:</span>
                          <span>{scholarship.type || 'Not specified'}</span>
                        </div>

                        {scholarship.organization && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Organization:</span>
                            <span>{scholarship.organization}</span>
                          </div>
                        )}

                        {scholarship.progress > 0 && (
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-blue-600" />
                            <span className="font-medium">Progress:</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{width: `${scholarship.progress}%`}}
                                ></div>
                              </div>
                              <span className="text-xs">{scholarship.progress}%</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {scholarship.website && (
                        <div className="mt-3">
                          <a
                            href={scholarship.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm underline"
                          >
                            View Application →
                          </a>
                        </div>
                      )}

                      <DocumentLinks scholarship={scholarship} />
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(scholarship)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(scholarship.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {(isOverdue || isDueSoon) && scholarship.status !== 'Submitted' && scholarship.status !== 'Awarded' && (
                    <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${isOverdue ? 'bg-red-50 text-red-800' : 'bg-yellow-50 text-yellow-800'}`}>
                      <AlertCircle size={16} />
                      <span className="text-sm font-medium">
                        {isOverdue ? 'This application is overdue!' : 'This application is due soon!'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredScholarships.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Award size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {appState.filterStatus === 'all' ? 'No scholarships added yet' : `No ${appState.filterStatus.toLowerCase()} scholarships`}
              </h3>
              <p className="text-gray-600 mb-6">
                {appState.filterStatus === 'all' 
                  ? 'Start tracking scholarship applications by adding the first one!'
                  : 'Try changing the filter to see more scholarships.'
                }
              </p>
              {appState.filterStatus === 'all' && (
                <button
                  onClick={() => updateAppState({ showForm: true })}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
                >
                  <Plus size={16} />
                  Add First Scholarship
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipTrackerFinal;
