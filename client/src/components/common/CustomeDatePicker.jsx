import React, { useState, useEffect } from "react";
import { MdDateRange } from "react-icons/md";
import styles from "./CustomDatePicker.module.css";

import {
  months,
  getSortedDays,
  range,
  getNumberOfDaysInMonth,
} from "../../data/CalenderData";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiOutlineCloseCircle,
} from "react-icons/ai";

const CustomDatePicker = ({ onSelectDate, closeDatePicker, isEndDate }) => {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [activeDay, setActiveDay] = useState(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeDatePicker();
      }
    };

    const handleClickOutside = (event) => {
      if (calendarVisible && !event.target.closest(".modalContent")) {
        closeDatePicker();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [calendarVisible, closeDatePicker]);

  const nextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth((prev) => prev + 1);
    } else {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth((prev) => prev - 1);
    } else {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    }
  };

  const toggleCalendar = () => {
    setCalendarVisible(!calendarVisible);
  };

  const handleDateClick = (date) => {
    onSelectDate(date);
    toggleCalendar();
  };

  const defaultText = isEndDate ? "No Date" : "Select Date";

  const handleToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setActiveButton("today");
    setActiveDay(null);
  };

  const handleNextMonday = () => {
    const today = new Date();
    const daysUntilMonday = 1 + (7 - today.getDay());
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilMonday);
    setSelectedDate(nextMonday);
    setActiveButton("nextMonday");
    setActiveDay(null);
  };

  const handleNextTuesday = () => {
    const today = new Date();
    const daysUntilTuesday = 2 + (7 - today.getDay());
    const nextTuesday = new Date(today);
    nextTuesday.setDate(today.getDate() + daysUntilTuesday);
    setSelectedDate(nextTuesday);
    setActiveButton("nextTuesday");
    setActiveDay(null);
  };

  const handleOneWeek = () => {
    const today = new Date();
    const oneWeekLater = new Date(today);
    oneWeekLater.setDate(today.getDate() + 7);
    setSelectedDate(oneWeekLater);
    setActiveButton("oneWeek");
    setActiveDay(null);
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handleSelection = (event) => {
    if (event.target.id === "day") {
      const day = event.target.getAttribute("data-day");
      const newSelectedDate = new Date(currentYear, currentMonth, day);
      if (isToday(newSelectedDate)) {
        setSelectedDate(newSelectedDate);
        setActiveButton(null);
        setActiveDay(null);
      } else {
        setSelectedDate(newSelectedDate);
        setActiveButton(null);
        setActiveDay(day);
      }
    }
  };

  const formatSelectedDate = () => {
    if (!selectedDate) {
      if (isEndDate) {
        return "No Date";
      } else {
        const today = new Date();
        return `${today.getDate()} ${today.toLocaleString("default", {
          month: "short",
        })} ${today.getFullYear()}`;
      }
    } else {
      return `${selectedDate.getDate()} ${selectedDate.toLocaleString(
        "default",
        { month: "short" }
      )} ${selectedDate.getFullYear()}`;
    }
  };

  const handleSave = () => {
    onSelectDate(selectedDate);
    setCalendarVisible(false);
  };

  const handleCancel = () => {
    setSelectedDate(null);
    setActiveButton(null);
    setActiveDay(null);
    setCalendarVisible(false);
  };

  return (
    <div className={styles.datePicker}>
      <div className={styles.dateInput} onClick={toggleCalendar}>
        <MdDateRange className={styles.icon} />
        {selectedDate
          ? `${selectedDate.toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}`
          : defaultText}
      </div>
      {calendarVisible && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.closeButton} onClick={toggleCalendar}>
              <AiOutlineCloseCircle />
            </div>
            <div className={styles.daySelectionButtons}>
              {isEndDate ? (
                <>
                  <button
                    onClick={() => {
                      setSelectedDate(null);
                      setActiveButton(null);
                      setActiveDay(null);
                    }}
                    className={activeButton === null ? styles.active : ""}
                  >
                    No Date
                  </button>
                  <button
                    onClick={handleToday}
                    className={activeButton === "today" ? styles.active : ""}
                  >
                    Today
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleToday}
                    className={
                      activeButton === "today" ? styles.activeButton : ""
                    }
                  >
                    Today
                  </button>
                  <button
                    onClick={handleNextMonday}
                    className={
                      activeButton === "nextMonday" ? styles.activeButton : ""
                    }
                  >
                    Next Monday
                  </button>
                  <button
                    onClick={handleNextTuesday}
                    className={
                      activeButton === "nextTuesday" ? styles.activeButton : ""
                    }
                  >
                    Next Tuesday
                  </button>
                  <button
                    onClick={handleOneWeek}
                    className={
                      activeButton === "oneWeek" ? styles.activeButton : ""
                    }
                  >
                    After One Week
                  </button>
                </>
              )}
            </div>

            <div className={styles.calendar}>
              <header>
                <AiFillCaretLeft onClick={prevMonth} />
                <p>
                  <div>{months[currentMonth]}</div>
                  <div>{currentYear}</div>
                </p>
                <AiFillCaretRight onClick={nextMonth} />
              </header>
              <body>
                <div className={styles.SevenColGrid}>
                  {getSortedDays(currentYear, currentMonth).map((day) => (
                    <p>{day}</p>
                  ))}
                </div>
                <div className={styles.SevenColGrid} onClick={handleSelection}>
                  {range(
                    1,
                    getNumberOfDaysInMonth(currentYear, currentMonth) + 1
                  ).map((day) => {
                    const date = new Date(currentYear, currentMonth, day);
                    const isSelected =
                      selectedDate &&
                      selectedDate.getDate() === day &&
                      selectedDate.getMonth() === currentMonth &&
                      selectedDate.getFullYear() === currentYear;
                    return (
                      <p
                        id='day'
                        data-day={day}
                        className={`${
                          isSelected
                            ? styles.active
                            : isToday(date)
                            ? styles.today
                            : activeDay === day
                            ? styles.active
                            : ""
                        }`}
                      >
                        {day}
                      </p>
                    );
                  })}
                </div>
              </body>
            </div>

            <div className={styles.calendarBottom}>
              <div className={styles.dateInput}>
                <MdDateRange className={styles.icon} />
                <p>{formatSelectedDate()}</p>
              </div>
              <div className={styles.actionButtons}>
                <button className={styles.CancelButton} onClick={handleCancel}>
                  Cancel
                </button>
                <button className={styles.SaveButtons} onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
