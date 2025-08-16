import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Calendar, DollarSign, Clock, Award, FileText, AlertCircle, HelpCircle, User, LogOut, Settings, ArrowLeft, Users, Download, GraduationCap, AlertTriangle, ExternalLink, Link, BarChart3, TrendingUp, Target } from 'lucide-react';

const ScholarshipTrackerFinal = () => {
  // Main app state
  const [currentUser, setCurrentUser] = useState(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showProgressDashboard, setShowProgressDashboard] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      graduationYear: "2025",
      school: "Lincoln High School",
      createdAt: "2024-01-15T10:00:00.000Z",
      lastLogin: "2024-08-10T14:30:00.000Z",
      notes: "Interested in Engineering scholarships"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "mike.chen@email.com",
      graduationYear: "2026",
      school: "Roosevelt High School",
      createdAt: "2024-02-20T09:00:00.000Z",
      lastLogin: "2024-08-12T16:45:00.000Z",
      notes: "Planning to study Computer Science"
    }
  ]);

  // Sample scholarship data
  const [allScholarships, setAllScholarships] = useState({
    1: [
      {
        id: 1,
        scholarshipName: "National Merit Scholarship",
        organization: "National Merit Scholarship Corporation",
        websiteLink: "https://www.nationalmerit.org",
        applicationStatus: "In Progress",
        submissionDate: "",
        dueDate: "2024-10-15",
        amount: "$2,500",
        type: "Merit-Based",
        eligibilityRequirements: "PSAT/NMSQT scores, 3.5+ GPA, US citizen",
        incomeDependent: "No",
        essayRequirements: "500-word essay on leadership experience",
        requiredMaterials: "Transcripts, SAT scores, letter of recommendation",
        notes: "Semi-finalist status confirmed",
        responseDate: "",
        responseDetails: "",
        expectedResponseDate: "2024-12-01",
        contactInfo: "info@nationalmerit.org",
        priorityLevel: "High",
        renewalRequirements: "Renewable for 4 years with 3.0 GPA",
        awardNotificationDate: "2024-12-15",
        interviewRequired: "No",
        recommendationLetterStatus: "Requested from Ms. Smith - received",
        progressPercent: 75,
        // New document fields
        transcriptLink: "https://drive.google.com/file/d/transcript123",
        essayLink: "https://docs.google.com/document/d/essay456",
        recommendationLink: "https://drive.google.com/folder/d/letters789",
        portfolioLink: "",
        otherDocuments: "FAFSA: https://drive.google.com/file/d/fafsa234"
      },
      {
        id: 2,
        scholarshipName: "Local Rotary Club Scholarship",
        organization: "Downtown Rotary Club",
        websiteLink: "https://www.rotary.org/scholarships",
        applicationStatus: "Submitted",
        submissionDate: "2024-07-30",
        dueDate: "2024-08-01",
        amount: "$1,000",
        type: "Community Service",
        eligibilityRequirements: "Local resident, 100+ volunteer hours",
        incomeDependent: "Yes",
        essayRequirements: "300-word essay on community service impact",
        requiredMaterials: "Application form, volunteer log, FAFSA",
        notes: "Strong community service record",
        responseDate: "",
        responseDetails: "",
        expectedResponseDate: "2024-09-15",
        contactInfo: "scholarships@downtownrotary.org",
        priorityLevel: "Medium",
        renewalRequirements: "One-time award only",
        awardNotificationDate: "2024-09-30",
        interviewRequired: "Yes",
        recommendationLetterStatus: "Complete - 2/2 received",
        progressPercent: 100,
        transcriptLink: "https://drive.google.com/file/d/transcript567",
        essayLink: "https://docs.google.com/document/d/community890",
        recommendationLink: "",
        portfolioLink: "",
        otherDocuments: "Volunteer Log: https://drive.google.com/file/d/volunteer123"
      }
    ],
    2: [
      {
        id: 3,
        scholarshipName: "Tech Future Leaders Grant",
        organization: "Silicon Valley Tech Foundation",
        websiteLink: "https://www.svtechfoundation.org",
        applicationStatus: "Not Started",
        submissionDate: "",
        dueDate: "2024-11-30",
        amount: "$5,000",
        type: "Major/Field Specific",
        eligibilityRequirements: "STEM major, 3.7+ GPA, coding portfolio",
        incomeDependent: "No",
        essayRequirements: "Two essays: Why STEM? and Innovation project description",
        requiredMaterials: "Portfolio, transcripts, 3 letters of recommendation",
        notes: "Need to complete coding portfolio",
        responseDate: "",
        responseDetails: "",
        expectedResponseDate: "2025-01-15",
        contactInfo: "grants@svtechfoundation.org",
        priorityLevel: "High",
        renewalRequirements: "Renewable annually with continued STEM study",
        awardNotificationDate: "2025-02-01",
        interviewRequired: "Yes",
        recommendationLetterStatus: "Not requested yet",
        progressPercent: 15,
        transcriptLink: "",
        essayLink: "",
        recommendationLink: "",
        portfolioLink: "https://github.com/michaelchen/portfolio",
        otherDocuments: ""
      }
    ]
  });

  // Scholarship tracker state
  const [scholarships, setScholarships] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Login form state
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    name: '',
    email: '',
    graduationYear: '',
    school: '',
    notes: ''
  });

  // Admin handlers
  const [deletingUser, setDeletingUser] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Scholarship form state
  const [formData, setFormData] = useState({
    scholarshipName: '',
    organization: '',
    websiteLink: '',
    applicationStatus: 'Not Started',
    submissionDate: '',
    dueDate: '',
    amount: '',
    type: '',
    eligibilityRequirements: '',
    incomeDependent: 'No',
    essayRequirements: '',
    requiredMaterials: '',
    notes: '',
    responseDate: '',
    responseDetails: '',
    expectedResponseDate: '',
    contactInfo: '',
    priorityLevel: 'Medium',
    renewalRequirements: '',
    awardNotificationDate: '',
    interviewRequired: 'No',
    recommendationLetterStatus: '',
    progressPercent: 0,
    // New document fields
    transcriptLink: '',
    essayLink: '',
    recommendationLink: '',
    portfolioLink: '',
    otherDocuments: ''
  });

  // Load user scholarships when user changes
  useEffect(() => {
    if (currentUser) {
      setScholarships(allScholarships[currentUser.id] || []);
    }
  }, [currentUser, allScholarships]);

  // Options
  const statusOptions = ['Not Started', 'In Progress', 'Submitted', 'Rejected/Denied', 'Awarded/Accepted'];
  const typeOptions = ['Merit-Based', 'Need-Based', 'Athletic', 'Major/Field Specific', 'Essay Contest', 'Community Service', 'Local/Regional', 'Other'];
  const priorityOptions = ['High', 'Medium', 'Low'];

  const tooltips = {
    scholarshipName: "The full, official name of the scholarship as listed by the organization",
    organization: "The company, university, foundation, or group offering the scholarship",
    websiteLink: "Direct URL to the scholarship application page or information page",
    applicationStatus: "Current stage of your application process",
    submissionDate: "Date you actually submitted/sent the completed application",
    dueDate: "Final deadline for submitting the application (not postmark date)",
    amount: "Dollar value or range (e.g., '$5,000' or '$1,000-$5,000' or 'Up to $2,500')",
    type: "Category that best describes this scholarship's main criteria",
    eligibilityRequirements: "Key requirements you must meet (GPA, major, location, etc.)",
    incomeDependent: "Whether this scholarship requires financial information (FAFSA, tax returns)",
    essayRequirements: "Essay topics, word counts, or 'None required' if no essay needed",
    requiredMaterials: "All documents needed: transcripts, letters of rec, resume, portfolio, etc.",
    notes: "Personal notes, reminders, or important details about this scholarship",
    responseDate: "Date you received their decision (acceptance, rejection, or other response)",
    responseDetails: "The outcome: amount awarded, waitlist status, rejection reason, etc.",
    expectedResponseDate: "When they typically notify applicants (check their website or ask)",
    contactInfo: "Name, email, or phone of scholarship coordinator for questions",
    priorityLevel: "Your personal ranking: High = top choice/best fit, Medium = good option, Low = backup",
    renewalRequirements: "Can this be renewed? What GPA or other requirements to keep it?",
    awardNotificationDate: "Specific date they announce winners (may differ from response date)",
    interviewRequired: "Whether scholarship process includes an interview step",
    recommendationLetterStatus: "Track progress: 'Requested from Ms. Smith', 'Received 2/3', etc.",
    progressPercent: "How complete is your application? 0%=not started, 50%=half done, 100%=ready to submit",
    transcriptLink: "Link to your transcript in Google Drive, Dropbox, or other cloud storage",
    essayLink: "Link to your essay document (Google Docs, Word Online, etc.)",
    recommendationLink: "Link to folder containing recommendation letters",
    portfolioLink: "Link to your portfolio, GitHub, or work samples",
    otherDocuments: "Links to other required documents (FAFSA, resume, certificates, etc.)"
  };

  // Progress Dashboard Analytics
  const getProgressAnalytics = () => {
    if (!scholarships.length) return null;

    const totalAmount = scholarships.reduce((sum, s) => {
      const amount = parseInt(s.amount.replace(/[^\d]/g, '')) || 0;
      return sum + amount;
    }, 0);

    const avgProgress = Math.round(
      scholarships.reduce((sum, s) => sum + s.progressPercent, 0) / scholarships.length
    );

    const upcomingDeadlines = scholarships
      .filter(s => s.dueDate && s.applicationStatus !== 'Submitted')
      .map(s => ({
        ...s,
        daysLeft: Math.ceil((new Date(s.dueDate) - new Date()) / (1000 * 60 * 60 * 24))
      }))
      .filter(s => s.daysLeft >= 0)
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .slice(0, 5);

    const progressByStatus = statusOptions.map(status => ({
      status,
      count: scholarships.filter(s => s.applicationStatus === status).length,
      percentage: Math.round((scholarships.filter(s => s.applicationStatus === status).length / scholarships.length) * 100)
    }));

    const highPriorityIncomplete = scholarships.filter(s => 
      s.priorityLevel === 'High' && 
      s.applicationStatus !== 'Submitted' && 
      s.applicationStatus !== 'Awarded/Accepted'
    ).length;

    return {
      totalAmount,
      avgProgress,
      upcomingDeadlines,
      progressByStatus,
      highPriorityIncomplete
    };
  };

  // Utility functions
  const getDaysUntilDue = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status) => {
    const colors = {
      'Not Started': 'bg-gray-100 text-gray-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Submitted': 'bg-green-100 text-green-800',
      'Rejected/Denied': 'bg-red-100 text-red-800',
      'Awarded/Accepted': 'bg-purple-100 text-purple-800'
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
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getStatusSummary = () => {
    const summary = {
      total: scholarships.length,
      notStarted: scholarships.filter(s => s.applicationStatus === 'Not Started').length,
      inProgress: scholarships.filter(s => s.applicationStatus === 'In Progress').length,
      submitted: scholarships.filter(s => s.applicationStatus === 'Submitted').length,
      awarded: scholarships.filter(s => s.applicationStatus === 'Awarded/Accepted').length,
      rejected: scholarships.filter(s => s.applicationStatus === 'Rejected/Denied').length
    };
    return summary;
  };

  // Document Link Component
  const DocumentLinks = ({ scholarship }) => {
    const documents = [
      { label: 'Transcript', link: scholarship.transcriptLink, icon: FileText },
      { label: 'Essay', link: scholarship.essayLink, icon: FileText },
      { label: 'Recommendations', link: scholarship.recommendationLink, icon: Users },
      { label: 'Portfolio', link: scholarship.portfolioLink, icon: Award },
    ];

    const hasDocuments = documents.some(doc => doc.link) || scholarship.otherDocuments;

    if (!hasDocuments) return null;

    return (
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="text-sm font-medium text-gray-700 mb-2">📄 Documents:</div>
        <div className="flex flex-wrap gap-2">
          {documents.map(doc => doc.link && (
            <a
              key={doc.label}
              href={doc.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs hover:bg-blue-100"
            >
              <doc.icon size={12} />
              {doc.label}
              <ExternalLink size={10} />
            </a>
          ))}
          {scholarship.otherDocuments && scholarship.otherDocuments.split(',').map((doc, idx) => {
            const [label, url] = doc.split(':').map(s => s.trim());
            if (url && url.startsWith('http')) {
              return (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded text-xs hover:bg-green-100"
                >
                  <Link size={12} />
                  {label}
                  <ExternalLink size={10} />
                </a>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  };

  // Handlers
  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowAdminPanel(false);
    setShowProgressDashboard(false);
  };

  const handleCreateUser = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    
    setUsers(prevUsers => [...prevUsers, newUser]);
    setCurrentUser(newUser);
    setCreateFormData({ name: '', email: '', graduationYear: '', school: '', notes: '' });
    setShowCreateForm(false);
  };

  const handleDeleteUser = (userId) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    
    // Remove user's scholarship data
    setAllScholarships(prev => {
      const updated = { ...prev };
      delete updated[userId];
      return updated;
    });
    
    // If deleting current user, log them out
    if (currentUser && currentUser.id === userId) {
      handleLogout();
    }
  };

  const handleDeleteStart = (user) => {
    setDeletingUser(user);
    setDeleteConfirmation('');
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setDeletingUser(null);
    setDeleteConfirmation('');
    setShowDeleteModal(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmation === deletingUser.name && deletingUser) {
      handleDeleteUser(deletingUser.id);
      handleDeleteCancel();
    }
  };

  const isDeleteConfirmationValid = deleteConfirmation === deletingUser?.name;

  const resetForm = () => {
    setFormData({
      scholarshipName: '',
      organization: '',
      websiteLink: '',
      applicationStatus: 'Not Started',
      submissionDate: '',
      dueDate: '',
      amount: '',
      type: '',
      eligibilityRequirements: '',
      incomeDependent: 'No',
      essayRequirements: '',
      requiredMaterials: '',
      notes: '',
      responseDate: '',
      responseDetails: '',
      expectedResponseDate: '',
      contactInfo: '',
      priorityLevel: 'Medium',
      renewalRequirements: '',
      awardNotificationDate: '',
      interviewRequired: 'No',
      recommendationLetterStatus: '',
      progressPercent: 0,
      transcriptLink: '',
      essayLink: '',
      recommendationLink: '',
      portfolioLink: '',
      otherDocuments: ''
    });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newScholarship = {
      ...formData,
      id: editingId || Date.now()
    };
    
    if (editingId) {
      setScholarships(scholarships.map(s => s.id === editingId ? newScholarship : s));
      setAllScholarships(prev => ({
        ...prev,
        [currentUser.id]: prev[currentUser.id].map(s => s.id === editingId ? newScholarship : s)
      }));
    } else {
      setScholarships([...scholarships, newScholarship]);
      setAllScholarships(prev => ({
        ...prev,
        [currentUser.id]: [...(prev[currentUser.id] || []), newScholarship]
      }));
    }
    
    setShowForm(false);
    resetForm();
  };

  const handleEdit = (scholarship) => {
    setFormData(scholarship);
    setEditingId(scholarship.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setScholarships(scholarships.filter(s => s.id !== id));
    setAllScholarships(prev => ({
      ...prev,
      [currentUser.id]: prev[currentUser.id].filter(s => s.id !== id)
    }));
  };

  const filteredScholarships = scholarships
    .filter(s => filterStatus === 'all' || s.applicationStatus === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (sortBy === 'priority') {
        const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        return priorityOrder[b.priorityLevel] - priorityOrder[a.priorityLevel];
      }
      if (sortBy === 'amount') {
        const aAmount = parseInt(a.amount.replace(/[^\d]/g, '')) || 0;
        const bAmount = parseInt(b.amount.replace(/[^\d]/g, '')) || 0;
        return bAmount - aAmount;
      }
      return a.scholarshipName.localeCompare(b.scholarshipName);
    });

  const Tooltip = ({ field, children }) => (
    <div className="relative">
      {children}
      <button
        type="button"
        className="ml-1 text-gray-400 hover:text-gray-600"
        onMouseEnter={() => setActiveTooltip(field)}
        onMouseLeave={() => setActiveTooltip(null)}
        onClick={() => setActiveTooltip(activeTooltip === field ? null : field)}
      >
        <HelpCircle size={14} />
      </button>
      {activeTooltip === field && (
        <div className="absolute z-10 w-64 p-2 mt-1 text-sm bg-gray-800 text-white rounded-lg shadow-lg">
          {tooltips[field]}
          <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
        </div>
      )}
    </div>
  );

  // Progress Dashboard Component
  if (showProgressDashboard && currentUser) {
    const analytics = getProgressAnalytics();
    
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowProgressDashboard(false)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Progress Dashboard</h1>
                  <p className="text-gray-600">{currentUser.name}'s scholarship analytics</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowProgressDashboard(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Back to Applications
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          {analytics ? (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Target size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Potential</p>
                      <p className="text-2xl font-bold text-gray-900">${analytics.totalAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <TrendingUp size={24} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Avg Progress</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.avgProgress}%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-100 rounded-lg">
                      <AlertTriangle size={24} className="text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">High Priority Incomplete</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.highPriorityIncomplete}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Calendar size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Upcoming Deadlines</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.upcomingDeadlines.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status Breakdown</h3>
                  <div className="space-y-3">
                    {analytics.progressByStatus.map(status => (
                      <div key={status.status} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(status.status)}`}>
                            {status.status}
                          </span>
                          <span className="text-sm text-gray-600">{status.count} applications</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{width: `${status.percentage}%`}}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 w-8">{status.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Deadlines */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
                  {analytics.upcomingDeadlines.length > 0 ? (
                    <div className="space-y-3">
                      {analytics.upcomingDeadlines.map(scholarship => (
                        <div key={scholarship.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{scholarship.scholarshipName}</p>
                            <p className="text-sm text-gray-600">Due: {scholarship.dueDate}</p>
                          </div>
                          <div className="text-right">
                            <p className={`text-sm font-medium ${
                              scholarship.daysLeft <= 3 ? 'text-red-600' : 
                              scholarship.daysLeft <= 7 ? 'text-yellow-600' : 'text-green-600'
                            }`}>
                              {scholarship.daysLeft === 0 ? 'Due Today!' :
                               scholarship.daysLeft === 1 ? '1 day left' :
                               `${scholarship.daysLeft} days left`}
                            </p>
                            <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{width: `${scholarship.progressPercent}%`}}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No upcoming deadlines</p>
                  )}
                </div>
              </div>

              {/* Progress by Priority */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress by Priority Level</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {priorityOptions.map(priority => {
                    const priorityScholarships = scholarships.filter(s => s.priorityLevel === priority);
                    const avgProgress = priorityScholarships.length > 0 
                      ? Math.round(priorityScholarships.reduce((sum, s) => sum + s.progressPercent, 0) / priorityScholarships.length)
                      : 0;
                    
                    return (
                      <div key={priority} className="text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${getPriorityColor(priority)}`}>
                          {priority} Priority
                        </span>
                        <div className="text-2xl font-bold text-gray-900">{avgProgress}%</div>
                        <div className="text-sm text-gray-600">{priorityScholarships.length} applications</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className={`h-2 rounded-full ${
                              priority === 'High' ? 'bg-red-500' :
                              priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{width: `${avgProgress}%`}}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <BarChart3 size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Available</h3>
              <p className="text-gray-600 mb-6">Add some scholarship applications to see your progress analytics.</p>
              <button
                onClick={() => setShowProgressDashboard(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Scholarships
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show Admin Panel first (highest priority)
  if (showAdminPanel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAdminPanel(false)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
                  <p className="text-gray-600">Manage student profiles and data</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('Export functionality - downloads all student data as JSON')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <Download size={16} />
                  Export All Data
                </button>
                
                <button
                  onClick={() => setShowAdminPanel(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  {currentUser ? 'Back to Dashboard' : 'Back to Login'}
                </button>
              </div>
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
                          {currentUser && currentUser.id === user.id && (
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
                      
                      <button
                        onClick={() => alert(`Edit ${user.name}'s profile`)}
                        className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center gap-2"
                      >
                        <Edit3 size={16} />
                        Edit
                      </button>
                      
                      {(!currentUser || currentUser.id !== user.id) && (
                        <button
                          onClick={() => handleDeleteStart(user)}
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
              
              {users.length === 0 && (
                <div className="p-12 text-center">
                  <Users size={48} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No students yet</h3>
                  <p className="text-gray-600">Students will appear here once they create profiles</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && deletingUser && (
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
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-red-800 mb-2">⚠️ Warning: This will permanently delete:</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• {deletingUser.name}'s profile information</li>
                    <li>• All {allScholarships[deletingUser.id]?.length || 0} scholarship applications</li>
                    <li>• All notes, progress tracking, and application data</li>
                    <li>• This data cannot be recovered</li>
                  </ul>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  To confirm deletion, please type the student's full name below:
                </p>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">
                    Type: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{deletingUser.name}</span>
                  </div>
                  <input
                    type="text"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    placeholder={`Type "${deletingUser.name}" to confirm`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    autoFocus
                  />
                  {deleteConfirmation && !isDeleteConfirmationValid && (
                    <p className="text-sm text-red-600">Name doesn't match. Please type exactly: {deletingUser.name}</p>
                  )}
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleDeleteCancel}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={!isDeleteConfirmationValid}
                  className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
                    isDeleteConfirmationValid
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

  // Login Screen Component  
  if (!currentUser) {
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

          {!showCreateForm ? (
            <div className="space-y-4">
              {/* Settings Button */}
              {users.length > 0 && (
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setShowAdminPanel(true)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                    title="Manage Students"
                  >
                    <Settings size={16} />
                    <span className="text-sm">Manage Students</span>
                  </button>
                </div>
              )}

              {/* Existing Users */}
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

              {/* Create New User Button */}
              <div className={users.length > 0 ? 'border-t pt-4 mt-6' : ''}>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600"
                >
                  <Plus size={20} />
                  <span>Add New Student</span>
                </button>
              </div>
            </div>
          ) : (
            /* Create New User Form */
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
                    setShowCreateForm(false);
                    setCreateFormData({ name: '', email: '', graduationYear: '', school: '', notes: '' });
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

  // Main Application
  const summary = getStatusSummary();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with user info and controls */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{currentUser.name}</h2>
                <p className="text-sm text-gray-600">
                  {currentUser.graduationYear && `Class of ${currentUser.graduationYear}`}
                  {currentUser.email && ` • ${currentUser.email}`}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowProgressDashboard(true)}
                className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                title="Progress Dashboard"
              >
                <BarChart3 size={16} />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
              
              <button
                onClick={() => setShowAdminPanel(true)}
                className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                title="Manage Users"
              >
                <Settings size={16} />
                <span className="hidden sm:inline">Manage</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                title="Logout"
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
                <p className="text-gray-600">Track and manage {currentUser.name}'s scholarship applications</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => alert(`Export ${currentUser.name}'s scholarship data as CSV`)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
                >
                  <FileText size={16} />
                  Export CSV
                </button>
                <button
                  onClick={() => setShowForm(true)}
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
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
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
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
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

          {/* FIXED: Wrap all adjacent JSX elements in a fragment */}
          <>
            {/* Form Modal */}
            {showForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
                  <form onSubmit={handleSubmit} className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      {editingId ? 'Edit' : 'Add New'} Scholarship
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Tooltip field="scholarshipName">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Scholarship Name *</label>
                        </Tooltip>
                        <input
                          type="text"
                          required
                          value={formData.scholarshipName}
                          onChange={(e) => setFormData({...formData, scholarshipName: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <Tooltip field="organization">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Organization/Sponsor</label>
                        </Tooltip>
                        <input
                          type="text"
                          value={formData.organization}
                          onChange={(e) => setFormData({...formData, organization: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <Tooltip field="websiteLink">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Website/Link</label>
                        </Tooltip>
                        <input
                          type="url"
                          value={formData.websiteLink}
                          onChange={(e) => setFormData({...formData, websiteLink: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="https://example.com/scholarship"
                        />
                      </div>

                      <div>
                        <Tooltip field="applicationStatus">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Application Status</label>
                        </Tooltip>
                        <select
                          value={formData.applicationStatus}
                          onChange={(e) => setFormData({...formData, applicationStatus: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <Tooltip field="dueDate">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                        </Tooltip>
                        <input
                          type="date"
                          value={formData.dueDate}
                          onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <Tooltip field="amount">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                        </Tooltip>
                        <input
                          type="text"
                          placeholder="$5,000 or $1,000-$5,000"
                          value={formData.amount}
                          onChange={(e) => setFormData({...formData, amount: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <Tooltip field="type">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                        </Tooltip>
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
                        <Tooltip field="priorityLevel">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                        </Tooltip>
                        <select
                          value={formData.priorityLevel}
                          onChange={(e) => setFormData({...formData, priorityLevel: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {priorityOptions.map(priority => (
                            <option key={priority} value={priority}>{priority}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <Tooltip field="incomeDependent">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Income Dependent</label>
                        </Tooltip>
                        <select
                          value={formData.incomeDependent}
                          onChange={(e) => setFormData({...formData, incomeDependent: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>

                      <div>
                        <Tooltip field="interviewRequired">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Interview Required</label>
                        </Tooltip>
                        <select
                          value={formData.interviewRequired}
                          onChange={(e) => setFormData({...formData, interviewRequired: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>

                      <div>
                        <Tooltip field="progressPercent">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Application Progress %</label>
                        </Tooltip>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={formData.progressPercent}
                          onChange={(e) => setFormData({...formData, progressPercent: parseInt(e.target.value) || 0})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <Tooltip field="submissionDate">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Submission Date</label>
                        </Tooltip>
                        <input
                          type="date"
                          value={formData.submissionDate}
                          onChange={(e) => setFormData({...formData, submissionDate: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <Tooltip field="expectedResponseDate">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Expected Response Date</label>
                        </Tooltip>
                        <input
                          type="date"
                          value={formData.expectedResponseDate}
                          onChange={(e) => setFormData({...formData, expectedResponseDate: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <Tooltip field="responseDate">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Actual Response Date</label>
                        </Tooltip>
                        <input
                          type="date"
                          value={formData.responseDate}
                          onChange={(e) => setFormData({...formData, responseDate: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <Tooltip field="awardNotificationDate">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Award Notification Date</label>
                        </Tooltip>
                        <input
                          type="date"
                          value={formData.awardNotificationDate}
                          onChange={(e) => setFormData({...formData, awardNotificationDate: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Document Links Section */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">📄 Document Links</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Tooltip field="transcriptLink">
                            <label className="block text-sm font-medium text-gray-700 mb-2">📄 Transcript Link</label>
                          </Tooltip>
                          <input
                            type="url"
                            value={formData.transcriptLink}
                            onChange={(e) => setFormData({...formData, transcriptLink: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://drive.google.com/file/d/..."
                          />
                        </div>

                        <div>
                          <Tooltip field="essayLink">
                            <label className="block text-sm font-medium text-gray-700 mb-2">📝 Essay Link</label>
                          </Tooltip>
                          <input
                            type="url"
                            value={formData.essayLink}
                            onChange={(e) => setFormData({...formData, essayLink: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://docs.google.com/document/d/..."
                          />
                        </div>

                        <div>
                          <Tooltip field="recommendationLink">
                            <label className="block text-sm font-medium text-gray-700 mb-2">👥 Recommendation Letters Link</label>
                          </Tooltip>
                          <input
                            type="url"
                            value={formData.recommendationLink}
                            onChange={(e) => setFormData({...formData, recommendationLink: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://drive.google.com/folder/d/..."
                          />
                        </div>

                        <div>
                          <Tooltip field="portfolioLink">
                            <label className="block text-sm font-medium text-gray-700 mb-2">🎨 Portfolio Link</label>
                          </Tooltip>
                          <input
                            type="url"
                            value={formData.portfolioLink}
                            onChange={(e) => setFormData({...formData, portfolioLink: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://github.com/username or portfolio URL"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <Tooltip field="otherDocuments">
                          <label className="block text-sm font-medium text-gray-700 mb-2">🔗 Other Documents</label>
                        </Tooltip>
                        <textarea
                          rows="2"
                          value={formData.otherDocuments}
                          onChange={(e) => setFormData({...formData, otherDocuments: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Format: Document Name: URL, Document Name: URL (e.g., FAFSA: https://drive.google.com/file/d/123, Resume: https://docs.google.com/document/d/456)"
                        ></textarea>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div>
                        <Tooltip field="eligibilityRequirements">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Eligibility Requirements</label>
                        </Tooltip>
                        <textarea
                          rows="2"
                          value={formData.eligibilityRequirements}
                          onChange={(e) => setFormData({...formData, eligibilityRequirements: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="GPA requirements, location restrictions, etc."
                        ></textarea>
                      </div>

                      <div>
                        <Tooltip field="essayRequirements">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Essay Requirements</label>
                        </Tooltip>
                        <textarea
                          rows="2"
                          value={formData.essayRequirements}
                          onChange={(e) => setFormData({...formData, essayRequirements: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Essay topics, word counts, or 'None required'"
                        ></textarea>
                      </div>

                      <div>
                        <Tooltip field="requiredMaterials">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Required Materials</label>
                        </Tooltip>
                        <textarea
                          rows="2"
                          placeholder="Transcripts, 2 letters of recommendation, FAFSA, etc."
                          value={formData.requiredMaterials}
                          onChange={(e) => setFormData({...formData, requiredMaterials: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                      </div>

                      <div>
                        <Tooltip field="recommendationLetterStatus">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Recommendation Letter Status</label>
                        </Tooltip>
                        <textarea
                          rows="2"
                          placeholder="e.g., 'Requested from Ms. Smith and Mr. Jones', 'Received 2/3 letters'"
                          value={formData.recommendationLetterStatus}
                          onChange={(e) => setFormData({...formData, recommendationLetterStatus: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                      </div>

                      <div>
                        <Tooltip field="renewalRequirements">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Renewal Requirements</label>
                        </Tooltip>
                        <textarea
                          rows="2"
                          placeholder="e.g., 'Renewable for 4 years with 3.5 GPA' or 'One-time award only'"
                          value={formData.renewalRequirements}
                          onChange={(e) => setFormData({...formData, renewalRequirements: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                      </div>

                      <div>
                        <Tooltip field="responseDetails">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Response Details</label>
                        </Tooltip>
                        <textarea
                          rows="2"
                          placeholder="e.g., 'Awarded $2,500', 'Waitlisted', 'Not selected - try again next year'"
                          value={formData.responseDetails}
                          onChange={(e) => setFormData({...formData, responseDetails: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                      </div>

                      <div>
                        <Tooltip field="contactInfo">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Information</label>
                        </Tooltip>
                        <textarea
                          rows="2"
                          placeholder="e.g., 'Jane Smith, scholarships@university.edu, (555) 123-4567'"
                          value={formData.contactInfo}
                          onChange={(e) => setFormData({...formData, contactInfo: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                      </div>

                      <div>
                        <Tooltip field="notes">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Notes/Comments</label>
                        </Tooltip>
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
                        onClick={() => { setShowForm(false); resetForm(); }}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        {editingId ? 'Update' : 'Add'} Scholarship
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
                            {scholarship.scholarshipName}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(scholarship.applicationStatus)}`}>
                            {scholarship.applicationStatus}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(scholarship.priorityLevel)}`}>
                            {scholarship.priorityLevel} Priority
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

                          {scholarship.progressPercent > 0 && (
                            <div className="flex items-center gap-2">
                              <Clock size={16} className="text-blue-600" />
                              <span className="font-medium">Progress:</span>
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full" 
                                    style={{width: `${scholarship.progressPercent}%`}}
                                  ></div>
                                </div>
                                <span className="text-xs">{scholarship.progressPercent}%</span>
                              </div>
                            </div>
                          )}

                          {scholarship.expectedResponseDate && (
                            <div className="flex items-center gap-2">
                              <Clock size={16} className="text-purple-600" />
                              <span className="font-medium">Expected Response:</span>
                              <span>{scholarship.expectedResponseDate}</span>
                            </div>
                          )}
                        </div>

                        {scholarship.websiteLink && (
                          <div className="mt-3">
                            <a
                              href={scholarship.websiteLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm underline"
                            >
                              View Application →
                            </a>
                          </div>
                        )}

                        {/* Document Links */}
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

                    {(isOverdue || isDueSoon) && scholarship.applicationStatus !== 'Submitted' && scholarship.applicationStatus !== 'Awarded/Accepted' && (
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
                  {filterStatus === 'all' ? 'No scholarships added yet' : `No ${filterStatus.toLowerCase()} scholarships`}
                </h3>
                <p className="text-gray-600 mb-6">
                  {filterStatus === 'all' 
                    ? 'Start tracking scholarship applications by adding the first one!'
                    : 'Try changing the filter to see more scholarships.'
                  }
                </p>
                {filterStatus === 'all' && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
                  >
                    <Plus size={16} />
                    Add First Scholarship
                  </button>
                )}
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipTrackerFinal;
