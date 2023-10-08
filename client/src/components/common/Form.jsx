import React, { useState, useEffect } from "react";
import { getITJobRoles } from "../../data/jobRoles";
import styles from "./Form.module.css";
import { FiUser } from "react-icons/fi";
import { LiaBriefcaseSolid } from "react-icons/lia";
import { MdArrowDropDown } from "react-icons/md";
import CustomDatePicker from "./CustomeDatePicker";
import { BsArrowRightShort } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Form({ onSubmit, initialValues }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialValues);
  const jobRoles = getITJobRoles();
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobRoleDropdownVisible, setJobRoleDropdownVisible] = useState(false);
  const [selectedJobRole, setSelectedJobRole] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleButtonClick = () => {
    if (!isDatePickerVisible && !isSubmitting) {
      setIsSubmitting(true);
      onSubmit({
        ...formData,
        startDate: selectedStartDate,
        endDate: selectedEndDate,
        jobRole: selectedJobRole,
      });
    }
  };

  const closeDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleJobRoleSelect = (role) => {
    setSelectedJobRole(role);
    setJobRoleDropdownVisible(false);
  };

  return (
    <div className={styles.form}>
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
        <div className={styles.inputGroup} htmlFor='jobRole'>
          <div
            className={styles.dropdown}
            onClick={() => setJobRoleDropdownVisible(!jobRoleDropdownVisible)}
          >
            <div className={styles.dropdownItem}>
              <div style={{ display: "flex", gap: "10px" }}>
                <LiaBriefcaseSolid className={styles.icon} />
                <span>{selectedJobRole || "Select Job Role"}</span>
              </div>

              <MdArrowDropDown className={styles.icon} />
            </div>
            <div className={styles.options}>
              {jobRoleDropdownVisible && (
                <ul className={styles.customOptions}>
                  {jobRoles.map((role) => (
                    <li
                      key={role.id}
                      onClick={() => handleJobRoleSelect(role.title)}
                    >
                      {role.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className={styles["custom-date-picker"]}>
          <div className={styles.inputGroup}>
            <CustomDatePicker
              selectedDate={selectedStartDate || new Date()}
              onSelectDate={(date) => setSelectedStartDate(date)}
              closeDatePicker={closeDatePicker}
            />
          </div>
          <BsArrowRightShort className={styles.icon} />
          <div className={styles.inputGroup}>
            <CustomDatePicker
              selectedDate={selectedEndDate}
              onSelectDate={(date) => setSelectedEndDate(date)}
              closeDatePicker={closeDatePicker}
              isEndDate={true}
            />
          </div>
        </div>
      </div>
      <div className={styles["form-buttons"]}>
        <button onClick={() => navigate("/")} className={styles.cancelButton}>
          Cancel
        </button>
        <button className={styles.submitButton} onClick={handleButtonClick}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Form;
