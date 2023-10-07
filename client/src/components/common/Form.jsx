import React, { useState } from "react";

function Form({ onSubmit, initialValues }) {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='name'
        value={formData.name}
        onChange={handleChange}
        placeholder='Name'
      />
      <input
        type='text'
        name='jobRole'
        value={formData.jobRole}
        onChange={handleChange}
        placeholder='Job Role'
      />
      <input
        type='date'
        name='startDate'
        value={formData.startDate}
        onChange={handleChange}
      />
      <input
        type='date'
        name='endDate'
        value={formData.endDate}
        onChange={handleChange}
      />
      <button type='submit'>Submit</button>
    </form>
  );
}

export default Form;
