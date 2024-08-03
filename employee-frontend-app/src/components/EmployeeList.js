import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://free-ap-south-1.cosmocloud.io/development/api/employee', {
        headers: {
          projectId: '66a9f95539e2fdc09bbba167',
          environmentId: '66a9f95539e2fdc09bbba168',
        },
        params: {
          limit: 50,
          offset: 0
        }
      });
      console.log('API response:', response.data); // Log the API response
      // Extract the data array from the response object
      const employeesData = response.data.data;

      // Ensure the data is an array
      if (Array.isArray(employeesData)) {
        setEmployees(employeesData);
      } else {
        console.error('API response data is not an array:', employeesData);
        setEmployees([]);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      setEmployees([]);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(`https://free-ap-south-1.cosmocloud.io/development/api/employee/${id}`, {
        headers: {
          projectId: '66a9f95539e2fdc09bbba167',
          environmentId: '66a9f95539e2fdc09bbba168',
        },
        data: {} // This should be included because API required to include empty body
      });
      console.log('Employee deleted:', response.data);
      fetchEmployees(); // Refresh the list after deletion
    } catch (error) {
          console.error('Error deleting employee:', error.response.data);
      
    }
  };
  
  return (
    <div className="employee-list">
    <h1>Employees List</h1>
    <div className="table-container">
      {employees.length === 0 ? (
        <p className="no-employees">No Employees in the system</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th colspan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee._id}</td>
                <td>{employee.name}</td>
                <td><Link to={`/employee/${employee._id}`}> Details</Link></td>
                   <td> <button onClick={() => deleteEmployee(employee._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    <button className="add-employee-link"><Link to="/add-employee">Add Employee</Link></button>
  </div>
);
};

export default EmployeeList;
