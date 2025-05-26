import React, { useState } from 'react';

const employeesData = [
  { id: 1, name: 'Jaloliddin', role: 'Ofitsant', ordersTaken: 50, rating: 4.5 },
  { id: 2, name: 'Zarina', role: 'Oshpaz', dishesPrepared: 120, rating: 4.7 },
  { id: 3, name: 'Aziza', role: 'Ofitsant', ordersTaken: 40, rating: 4.3 },
  { id: 4, name: 'Bekzod', role: 'Oshpaz', dishesPrepared: 150, rating: 4.9 },
];

const Employees = () => {
  const [employees, setEmployees] = useState(employeesData);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Xodimlar Faoliyati</h2>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ minWidth: '600px', width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Ism</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Lavozimi</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Buyurtmalar soni</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Chiqargan taomlar soni</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Baholash</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.role}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {employee.ordersTaken !== undefined ? employee.ordersTaken : 'N/A'}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {employee.dishesPrepared !== undefined ? employee.dishesPrepared : 'N/A'}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {employee.rating} / 5
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;
