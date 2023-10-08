const Employee = require("../model/Empolyee");

// Add a new employee
exports.addEmployee = async (req, res) => {
  try {
    const { name, jobRole, startDate, endDate } = req.body;

    // Validation: Check if required fields are provided
    if (!name || !jobRole || !startDate) {
      return res
        .status(400)
        .json({ error: "Name, job role, and start date are required." });
    }

    // Validation: Check if startDate is less than endDate
    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      return res
        .status(400)
        .json({ error: "Start date must be earlier than end date." });
    }

    const employee = new Employee({
      name,
      jobRole,
      startDate,
      endDate,
    });

    await employee.save();

    console.log("Employee added:", employee);

    res.status(201).json({
      success: true,
      employee,
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ success: false, message: "Failed to add employee" });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { name, jobRole, startDate, endDate } = req.body;
    const employeeId = req.params.id;

    // Validation: Check if the employee ID is provided
    if (!employeeId) {
      return res.status(400).json({ error: "Employee ID is required." });
    }

    const employee = await Employee.findById(employeeId);

    // Validation: Check if the employee exists
    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    employee.name = name || employee.name;
    employee.jobRole = jobRole || employee.jobRole;
    employee.startDate = startDate || employee.startDate;
    employee.endDate = endDate || employee.endDate;

    await employee.save();

    console.log("Employee updated:", employee);

    res.status(200).json({ success: true, employee });
  } catch (error) {
    console.error("Error updating employee:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to update employee." });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;

    // Validation: Check if the employee ID is provided
    if (!employeeId) {
      return res
        .status(400)
        .json({ success: false, error: "Employee ID is required." });
    }

    const employee = await Employee.findById(employeeId);

    // Validation: Check if the employee exists
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found." });
    }

    await Employee.deleteOne({ _id: employeeId });

    console.log("Employee deleted:", employee);

    return res
      .status(204)
      .json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete employee." });
  }
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    console.log("All employees retrieved:", employees);

    res.status(200).json({ sucess: true, employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res
      .status(500)
      .json({ sucess: false, error: "Failed to fetch employees." });
  }
};
