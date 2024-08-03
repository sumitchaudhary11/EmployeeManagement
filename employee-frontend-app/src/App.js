import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';
import AddEmployee from './components/AddEmployee';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
          <Route path="/add-employee" element={<AddEmployee />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
