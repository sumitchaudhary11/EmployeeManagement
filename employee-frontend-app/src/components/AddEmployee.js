import React, { useState } from 'react';
import axios from 'axios';
import './AddEmployee.css';
import { Link } from 'react-router-dom';

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState({
    line1: '',
    city: '',
    country: '',
    zip_code: ''
  });
  const [contactMethods, setContactMethods] = useState([{ contact_method: '', value: '' }]);

  const handleAddContactMethod = () => {
    if (contactMethods.length<2){
    setContactMethods([...contactMethods, { contact_method: '', value: '' }]);
    }
  };

  const handleContactMethodChange = (index, field, value) => {
    const updatedContacts = contactMethods.map((contact, i) =>
      i === index ? { ...contact, [field]: value } : contact
    );
    setContactMethods(updatedContacts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employee = { name, address, contact_methods: contactMethods };
    try {
      await axios.post('https://free-ap-south-1.cosmocloud.io/development/api/employee', employee, {
        headers: {
          projectId: '66a9f95539e2fdc09bbba167',
          environmentId: '66a9f95539e2fdc09bbba168',
        }
      });
      // Redirect to employee list or show success message
      alert('Employee added successfully!');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="add-employee-container">
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input type="text" placeholder="Line 1" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} required />
          <input type="text" placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} required />
          <input type="text" placeholder="Country" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} required />
          <input type="text" placeholder="Zip Code" value={address.zip_code} onChange={(e) => setAddress({ ...address, zip_code: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Contact Methods:</label>
          {contactMethods.map((contact, index) => (
            <div key={index} className="contact-method">
              <select value={contact.contact_method} onChange={(e) => handleContactMethodChange(index, 'contact_method', e.target.value)} required>
                <option value="">Select</option>
                <option value="EMAIL">Email</option>
                <option value="PHONE">Phone</option>
              </select>
              <input type="text" value={contact.value} onChange={(e) => handleContactMethodChange(index, 'value', e.target.value)} required />
            </div>
          ))}
          <button type="button" className="add-contact-button" onClick={handleAddContactMethod}>Add Contact Method</button>
        </div>
        <div className="button-group">
          <button type="submit">Add Employee</button>
        </div>

            <Link to="/">List of Employees</Link>
      </form>
    </div>
  );
};
export default AddEmployee;
