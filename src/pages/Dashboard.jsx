import React, { useEffect, useState, useRef, memo, useMemo } from 'react';
import axios from 'axios';
import isEqual from 'lodash.isequal';


const StatRow = memo(({ day, count, total }) => {
  return (
    <tr>
      <td style={styles.td}>{day}</td>
      <td style={styles.td}>{count}</td>
      <td style={styles.td}>{total.toLocaleString()}</td>
    </tr>
  );
});

const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
  'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const WeeklyMonthlyStats = () => {
  const [orders, setOrders] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const ordersRef = useRef([]);
  const [loading, setLoading] = useState(true);

 
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('https://suddocs.uz/order');
      if (!isEqual(data, ordersRef.current)) {
        ordersRef.current = data;
        setOrders(data);
      }
    } catch (error) {
      console.error('Xatolik:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

 
    const interval = setInterval(() => {
      fetchOrders();
    }, 600000);

    return () => clearInterval(interval);
  }, []);

  const year = new Date().getFullYear();
  const daysCount = getDaysInMonth(year, selectedMonth);


  const stats = useMemo(() => {
    const statsObj = {};
    for (let d = 1; d <= daysCount; d++) {
      statsObj[d] = { count: 0, total: 0 };
    }
    orders.forEach(order => {
      const date = new Date(order.createdAt);
      if (date.getMonth() === selectedMonth && date.getFullYear() === year) {
        const day = date.getDate();
        statsObj[day].count++;
        statsObj[day].total += order.totalPrice;
      }
    });
    return statsObj;
  }, [orders, selectedMonth, year, daysCount]);

  const totalCount = useMemo(() => Object.values(stats).reduce((acc, val) => acc + val.count, 0), [stats]);
  const totalSum = useMemo(() => Object.values(stats).reduce((acc, val) => acc + val.total, 0), [stats]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{months[selectedMonth]} oyi buyurtmalar statistikasi</h2>
      <div style={styles.monthButtons}>
        {months.map((month, i) => (
          <button
            key={month}
            onClick={() => setSelectedMonth(i)}
            style={i === selectedMonth ? styles.activeMonthButton : styles.monthButton}
          >
            {month}
          </button>
        ))}
      </div>

      {loading ? (
        <div>Yuklanmoqda...</div>
      ) : (
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
                  <StatRow
                    key={day}
                    day={day}
                    count={stats[day].count}
                    total={stats[day].total}
                  />
                );
              })}
              <tr style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                <td style={styles.td}>Jami</td>
                <td style={styles.td}>{totalCount}</td>
                <td style={styles.td}>{totalSum.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: 16, fontFamily: 'Arial, sans-serif' },
  heading: { fontSize: 24, marginBottom: 16, color: '#222' },
  monthButtons: { display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' },
  monthButton: {
    padding: '8px 14px', border: '1px solid #ccc',
    backgroundColor: '#fff', color: '#000',
    cursor: 'pointer', borderRadius: 5,
    fontSize: 14, minWidth: 80,
  },
  activeMonthButton: {
    padding: '8px 14px', border: '1px solid #28a745',
    backgroundColor: '#28a745', color: '#fff',
    borderRadius: 5, fontSize: 14, minWidth: 80,
  },
  tableWrapper: {
    overflowX: 'auto', backgroundColor: '#fff',
    borderRadius: 8, boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  table: { width: '100%', borderCollapse: 'collapse', minWidth: 600 },
  th: {
    backgroundColor: '#f4f4f4',
    padding: 12,
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '1px solid #ddd',
  },
  td: {
    padding: 12,
    borderBottom: '1px solid #eee',
    wordBreak: 'break-word',
  },
};

export default WeeklyMonthlyStats;
