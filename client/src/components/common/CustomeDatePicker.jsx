import React, { useState } from "react";
import { MdDateRange } from "react-icons/md";
import styles from "./CustomDatePicker.module.css";
import {
  months,
  getSortedDays,
  range,
  getNumberOfDaysInMonth,
} from "../../data/CalenderData";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const CustomDatePicker = ({
  selectedDate,
  onSelectDate,
  closeDatePicker,
  isEndDate,
}) => {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [seletedDate, setSelectedDate] = useState(null);

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
      setCurrentMonth(0);
      setCurrentYear((prev) => prev - 1);
    }
  };

  const handleSelection = (event) => {
    if (event.target.id === "day") {
      setSelectedDate(
        new Date(
          currentYear,
          currentMonth,
          event.target.getAttribute("data-day")
        )
      );
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
  const defaultDate = isEndDate ? null : new Date();

  const handleToday = () => {
    const today = new Date();
    onSelectDate(today);
  };

  const handleNextMonday = () => {
    const today = new Date();
    const daysUntilMonday = 1 + (7 - today.getDay());
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilMonday);
    onSelectDate(nextMonday);
  };

  const handleNextTuesday = () => {
    const today = new Date();
    const daysUntilTuesday = 2 + (7 - today.getDay());
    const nextTuesday = new Date(today);
    nextTuesday.setDate(today.getDate() + daysUntilTuesday);
    onSelectDate(nextTuesday);
  };

  const handleOneWeek = () => {
    const today = new Date();
    const oneWeekLater = new Date(today);
    oneWeekLater.setDate(today.getDate() + 7);
    onSelectDate(oneWeekLater);
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
              &times;
            </div>

            {isEndDate ? (
              <>
                <button onClick={() => onSelectDate(null)}>No Date</button>
                <button onClick={handleToday}>Today</button>
              </>
            ) : (
              <>
                <button onClick={handleToday}>Today</button>
                <button onClick={handleNextMonday}>Next Monday</button>
                <button onClick={handleNextTuesday}>Next Tuesday</button>
                <button onClick={handleOneWeek}>After One Week</button>
              </>
            )}
            <div className={styles.calendar}>
              <header>
                <AiFillCaretLeft onClick={prevMonth} />
                <p>{months[currentMonth]}</p>
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
                  ).map((day) => (
                    <p
                      id='day'
                      data-day={day}
                      className={
                        selectedDate?.getTime() ===
                        new Date(currentMonth, currentYear, day).getTime()
                          ? `{styles.active}`
                          : ""
                      }
                    >
                      {day}
                    </p>
                  ))}
                </div>
              </body>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
