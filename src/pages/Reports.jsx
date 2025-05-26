import React, { useState } from 'react';

const Finance = () => {
  const monthlyData = [
    { month: 'Yanvar', revenue: 5000000, expenses: 3000000, profit: 2000000 },
    { month: 'Fevral', revenue: 6000000, expenses: 3200000, profit: 2800000 },
    { month: 'Mart', revenue: 7000000, expenses: 3500000, profit: 3500000 },
    { month: 'Aprel', revenue: 8000000, expenses: 4000000, profit: 4000000 },
  ];

  const [data, setData] = useState(monthlyData);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Moliyaviy Hisobotlar</h2>


      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Oylik</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Daromad (so‘m)</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Xarajatlar (so‘m)</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Foyda (so‘m)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.month}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.revenue.toLocaleString()}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.expenses.toLocaleString()}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.profit.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Finance;
