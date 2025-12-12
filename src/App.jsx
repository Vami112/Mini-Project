// src/App.jsx
import React, { useState } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetails from './components/StudentDetails';
import { getAllStudents, createStudent, updateStudent, deleteStudent } from './services/studentService';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [view, setView] = useState('list'); // list, add, edit, details
  const [selectedStudent, setSelectedStudent] = useState(null);

  const loadStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (error) {
      alert('Failed to load students. Make sure JSON Server is running.');
      console.error(error);
    }
  };

  const handleAddClick = () => {
    setView('add');
    setSelectedStudent(null);
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setView('edit');
  };

  const handleViewClick = (student) => {
    setSelectedStudent(student);
    setView('details');
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        alert('Student deleted successfully.');
        loadStudents();
      } catch (error) {
        alert('Failed to delete student');
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (view === 'add') {
        await createStudent(formData);
        alert('Student added successfully.');
      } else if (view === 'edit') {
        await updateStudent(selectedStudent.id, formData);
        alert('Student updated successfully.');
      }
      setView('list');
      setSelectedStudent(null);
      loadStudents();
    } catch (error) {
      alert('Failed to save student');
      console.error(error);
    }
  };

  const handleCancel = () => {
    setView('list');
    setSelectedStudent(null);
  };

  return (
    <div className="app-root">
      {/* Top Header */}
      <header className="app-header">
        <div className="brand">
          <div className="brand-badge">SR</div>
          <div>
            <h1>Student Result Management</h1>
            <p>Manage student records, update results, and view performance.</p>
          </div>
        </div>

        <div className="header-actions">
          {view === 'list' && (
            <button className="btn btn-primary" onClick={handleAddClick}>
              + Add Student
            </button>
          )}

          {(view === 'add' || view === 'edit' || view === 'details') && (
            <button className="btn btn-outline" onClick={handleCancel}>
              ← Back to List
            </button>
          )}
        </div>
      </header>

      {/* Main Layout */}
      <main className="app-main">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2 className="sidebar-title">Overview</h2>

          <div className="stat-card">
            <p className="stat-label">Total Students</p>
            <p className="stat-value">{students.length}</p>
          </div>

          <nav className="nav-section">
            <p className="nav-label">Views</p>
            <button
              className={`nav-pill ${view === 'list' ? 'active' : ''}`}
              onClick={handleCancel}
            >
              Student List
            </button>
            <button
              className={`nav-pill ${view === 'add' ? 'active' : ''}`}
              onClick={handleAddClick}
            >
              Add Student
            </button>
          </nav>

          <div className="helper-box">
            <h3>Tip</h3>
            <p>Click on a student to view detailed results or edit their record.</p>
          </div>
        </aside>

        {/* Right Content */}
        <section className="content">
          {view === 'list' && (
            <div className="content-card">
              <div className="content-header">
                <h2>All Students</h2>
                <button className="btn btn-ghost" onClick={loadStudents}>
                  ⟳ Refresh
                </button>
              </div>

              <StudentList
                students={students}
                onLoad={loadStudents}
                onAdd={handleAddClick}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
                onView={handleViewClick}
              />
            </div>
          )}

          {(view === 'add' || view === 'edit') && (
            <div className="content-card">
              <div className="content-header">
                <h2>{view === 'add' ? 'Add New Student' : 'Edit Student'}</h2>
                <p className="content-subtitle">
                  Fill in the student details and submit to save.
                </p>
              </div>

              <StudentForm
                initialData={selectedStudent}
                onSubmit={handleFormSubmit}
                onCancel={handleCancel}
              />
            </div>
          )}

          {view === 'details' && (
            <div className="content-card">
              <div className="content-header">
                <h2>Student Details</h2>
              </div>
              <StudentDetails student={selectedStudent} onBack={handleCancel} />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;