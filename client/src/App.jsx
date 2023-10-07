import "./App.css";
import { Routes, Route } from "react-router-dom";
import Topbar from "./components/common/Topbar";

import EmployeeList from "./pages/EmployeeList";
import UpdateEmployee from "./pages/UpdateEmployee";
import AddEmployee from "./pages/AddEmployee";
import Error from "./pages/Error";
function App() {
  return (
    <div className='App'>
      <Topbar />
      <Routes>
        <Route path='/' element={<EmployeeList />} />
        <Route path='/updateEmployee/:id' element={<UpdateEmployee />} />
        <Route path='/addEmployee' element={<AddEmployee />} />
        <Route path='*' element={<Error />} />

        <Route />
      </Routes>
    </div>
  );
}

export default App;
