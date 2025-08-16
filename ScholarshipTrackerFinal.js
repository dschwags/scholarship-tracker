import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Calendar, DollarSign, User, LogOut, GraduationCap } from 'lucide-react';

const ScholarshipTrackerFinal = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [scholarships, setScholarships] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    amount: '',
    dueDate: '',
    status: 'Not Started'
  });

  const statusOptions = ['Not Started', 'In Progress', 'Submitted', 'Awarded', 'Rejected'];

  const users = [
    { id: 1, name: "Sarah Johnson", email: "sarah@email.com" },
    { id: 2, name: "Michael Chen", email: "mike@email.com" }
  ];

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newScholarship = {
      ...formData,
      id: Date.now()
    };
    setScholarships([...scholarships, newScholarship]);
    setFormData({ name: '', organization: '', amount: '', dueDate: '', status: 'Not Started' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setScholarships(scholarships.filter(s => s.id !== id));
  };

  // Login Screen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Scholarship Tracker</h1>
            <p className="text-gray-600">Select your profile</p>
          </div>

          <div className="space-y-3">
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
                  <div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Main App
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{currentUser.name}</h2>
                <p className="text-sm text-gray-600">{currentUser.email}</p>
              </div>
            </div>
            
            <button
              onClick={() => setCurrentUser(null)}
              className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Scholarship Applications</h1>
                <p className="text-gray-600">Track and manage your scholarship applications</p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus size={16} />
                Add Scholarship
              </button>
            </div>
          </div>

          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <form onSubmit={handleSubmit}>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Scholarship</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Scholarship Name</label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                      <input
                        type="text"
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="$5,000"
                      />
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
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Add Scholarship
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {scholarships.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No scholarships added yet</h3>
                <p className="text-gray-600 mb-6">Start tracking scholarship applications by adding the first one!</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
                >
                  <Plus size={16} />
                  Add First Scholarship
                </button>
              </div>
            ) : (
              scholarships.map(scholarship => (
                <div key={scholarship.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{scholarship.name}</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        {scholarship.organization && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Organization:</span>
                            <span>{scholarship.organization}</span>
                          </div>
                        )}
                        
                        {scholarship.amount && (
                          <div className="flex items-center gap-2">
                            <DollarSign size={16} className="text-green-600" />
                            <span className="font-medium">Amount:</span>
                            <span>{scholarship.amount}</span>
                          </div>
                        )}
                        
                        {scholarship.dueDate && (
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-blue-600" />
                            <span className="font-medium">Due:</span>
                            <span>{scholarship.dueDate}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-2">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {scholarship.status}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(scholarship.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipTrackerFinal;
