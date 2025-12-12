// src/components/StudentForm.jsx
import React, { useState, useEffect } from 'react';

function StudentForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    rollNo: '',
    className: '',
    marks: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter student name"
          required
        />
      </div>

      <div className="form-row">
        <label>Roll No</label>
        <input
          name="rollNo"
          value={form.rollNo}
          onChange={handleChange}
          placeholder="Enter roll number"
          required
        />
      </div>

      <div className="form-row">
        <label>Class</label>
        <input
          name="className"
          value={form.className}
          onChange={handleChange}
          placeholder="Enter class"
          required
        />
      </div>

      <div className="form-row">
        <label>Marks</label>
        <input
          type="number"
          name="marks"
          value={form.marks}
          onChange={handleChange}
          placeholder="Enter marks"
          required
        />
      </div>

      <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default StudentForm;