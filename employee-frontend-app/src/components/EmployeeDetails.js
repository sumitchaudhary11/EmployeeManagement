import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchEmployeeDetails();
  });


  const fetchEmployeeDetails = async () => {
    try {
      const response = await axios.get(`https://free-ap-south-1.cosmocloud.io/development/api/employee/${id}`, {
        headers: {
          projectId: '66a9f95539e2fdc09bbba167',
          environmentId: '66a9f95539e2fdc09bbba168',
        }
      });
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };

  return (
    <div style={{ width:'90%', padding:'50px' }}>
        
      <h1>Employee Details</h1>
      
      {employee ? (
        <div>
        <table>
            <thead>
                <tr>
                <th> Employee Name </th>
                <th> Employee ID: </th>
                <th> Employee Address </th>
                <th> Employee Contacts </th>
                </tr>
            </thead>
            <tbody>
            <tr>
          <td> {employee.name}</td>
          <td> {employee._id}</td>
          <td> {employee.address.line1}, {employee.address.city}, {employee.address.country}, {employee.address.zip_code}</td>
          <td>
          <ul>
            {employee.contact_methods.map((contact, index) => (
              <li key={index}>{contact.contact_method}: {contact.value}</li>
            ))}
            </ul>
            </td>

          </tr>
          </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EmployeeDetails;
