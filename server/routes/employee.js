const express = require("express");
const router = express.Router();

const {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
} = require("../controllers/employee");

router.post("/addEmployee", addEmployee);
router.put("/updateEmployee/:id", updateEmployee);
router.delete("/deleteEmployee/:id", deleteEmployee);
router.get("/getAllEmployees", getAllEmployees);

module.exports = router;
