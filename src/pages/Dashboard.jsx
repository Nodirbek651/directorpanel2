import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeeklyMonthlyStats = () => {
  const [orders, setOrders] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return now.getMonth(); // 0 - Yanvar, 1 - Fevral, ...
  });

  useEffect(() => {
    axios.get('http://109.172.37.41:4000/order')
      .then(response => setOrders(response.data))
      .catch(error => console.error('Xatolik:', error));
  }, []);

  const months = [
    'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
    'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
  ];

  // Tanlangan oy uchun kunlar sonini olish (28-31)
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  // Tanlangan oy va yil uchun orders ni filtrlaymiz va kunlik stats hisoblaymiz
  const calculateStats = () => {
    const stats = {};
    const year = new Date().getFullYear();
    const daysCount = getDaysInMonth(year, selectedMonth);

    // Har bir kun uchun boshlang'ich obyekt yaratamiz
    for (let d = 1; d <= daysCount; d++) {
      stats[d] = { count: 0, total: 0 };
    }

    orders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      if (orderDate.getMonth() === selectedMonth && orderDate.getFullYear() === year) {
        const day = orderDate.getDate();
        stats[day].count++;
        stats[day].total += order.totalPrice;
      }
    });

    return stats;
  };

  const stats = calculateStats();
  const year = new Date().getFullYear();
  const daysCount = getDaysInMonth(year, selectedMonth);

  // Jami buyurtmalar va jami summa tanlangan oy uchun
  const totalCount = Object.values(stats).reduce((sum, day) => sum + day.count, 0);
  const totalSum = Object.values(stats).reduce((sum, day) => sum + day.total, 0);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{months[selectedMonth]} oyi buyurtmalar statistikasi</h2>

      <div style={styles.monthButtons}>
        {months.map((month, i) => (
          <button
            key={month}
            style={i === selectedMonth ? styles.activeMonthButton : styles.monthButton}
            onClick={() => setSelectedMonth(i)}
          >
            {month}
          </button>
        ))}
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Kun</th>
              <th style={styles.th}>Buyurtmalar soni</th>
              <th style={styles.th}>Jami summa (so'm)</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(daysCount)].map((_, idx) => {
              const day = idx + 1;
              return (
                <tr key={day}>
                  <td style={styles.td}>{day}</td>
                  <td style={styles.td}>{stats[day].count}</td>
                  <td style={styles.td}>{stats[day].total.toLocaleString()}</td>
                </tr>
              );
            })}

            {/* Jami qator */}
            <tr style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
              <td style={styles.td}>Jami</td>
              <td style={styles.td}>{totalCount}</td>
              <td style={styles.td}>{totalSum.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '16px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '16px',
    color: '#222',
  },
  monthButtons: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  monthButton: {
    padding: '8px 14px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    color: '#000',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '14px',
    minWidth: '80px',
  },
  activeMonthButton: {
    padding: '8px 14px',
    border: '1px solid #28a745',
    backgroundColor: '#28a745',
    color: '#fff',
    borderRadius: '5px',
    fontSize: '14px',
    minWidth: '80px',
  },
  tableWrapper: {
    overflowX: 'auto',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '600px',
  },
  th: {
    backgroundColor: '#f4f4f4',
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '1px solid #ddd',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #eee',
    wordBreak: 'break-word',
  },
};

export default WeeklyMonthlyStats;
