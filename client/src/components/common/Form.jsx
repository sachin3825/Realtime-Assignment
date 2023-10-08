import React, { useState } from "react";
import { getITJobRoles } from "../../data/jobRoles";
import styles from "./Form.module.css";
import { FiUser } from "react-icons/fi";
import { LiaBriefcaseSolid } from "react-icons/lia";
import { MdArrowDropDown } from "react-icons/md";
import CustomDatePicker from "./CustomeDatePicker";

function Form({ onSubmit, initialValues }) {
  const [formData, setFormData] = useState(initialValues);
  const jobRoles = getITJobRoles();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.Inputs}>
        <label className={styles.inputGroup} htmlFor='name'>
          <FiUser className={styles.icon} />
          <input
            type='text'
            name='name'
            id='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Name'
          />
        </label>
        <label className={styles.inputGroup} htmlFor='jobRole'>
          <LiaBriefcaseSolid className={styles.icon} />
          <select
            id='jobRole'
            name='jobRole'
            value={formData.jobRole}
            onChange={handleChange}
            placeholder='Job Role'
          >
            <option value=''>Select Job Role</option>
            {jobRoles.map((role) => (
              <option key={role.id} value={role.title}>
                {role.title}
              </option>
            ))}
          </select>
          <div className={styles.icon}>
            <MdArrowDropDown fontSize={"1.2em"} />
          </div>
        </label>
      </div>

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
      <div>
        <CustomDatePicker
          selectedDate={formData.startDate || new Date()}
          onSelectDate={(date) => setFormData({ ...formData, startDate: date })}
        />

        <CustomDatePicker
          selectedDate={formData.endDate || null}
          onSelectDate={(date) => setFormData({ ...formData, endDate: date })}
          isEndDate
        />
      </div>

      <button type='submit' className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
}

export default Form;
