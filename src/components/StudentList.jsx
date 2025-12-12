// src/components/StudentList.jsx
import React, { useEffect } from 'react';

function StudentList({ students, onLoad, onEdit, onDelete, onView }) {
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  return (
    <div className="table-wrapper">
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Class</th>
            <th>Marks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 && (
            <tr>
              <td colSpan={5}>No students found. Click “Add Student” to create one.</td>
            </tr>
          )}
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.rollNo}</td>
              <td>{s.className}</td>
              <td>{s.marks}</td>
              <td>
                <button className="btn btn-ghost" onClick={() => onView(s)}>
                  View
                </button>
                <button className="btn btn-outline" onClick={() => onEdit(s)}>
                  Edit
                </button>
                <button className="btn btn-outline" onClick={() => onDelete(s.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;