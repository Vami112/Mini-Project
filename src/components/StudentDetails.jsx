// src/components/StudentDetails.jsx
import React from 'react';

function StudentDetails({ student, onBack }) {
  if (!student) return null;

  return (
    <div>
      <div className="details-grid">
        <div className="details-item">
          <div className="details-label">Name</div>
          <div className="details-value">{student.name}</div>
        </div>
        <div className="details-item">
          <div className="details-label">Roll No</div>
          <div className="details-value">{student.rollNo}</div>
        </div>
        <div className="details-item">
          <div className="details-label">Class</div>
          <div className="details-value">{student.className}</div>
        </div>
        <div className="details-item">
          <div className="details-label">Marks</div>
          <div className="details-value">{student.marks}</div>
        </div>
      </div>

      <div style={{ marginTop: '0.9rem' }}>
        <button className="btn btn-outline" onClick={onBack}>
          ← Back
        </button>
      </div>
    </div>
  );
}

export default StudentDetails;