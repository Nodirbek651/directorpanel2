import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://109.172.37.41:4000/order')
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Buyurtmalarni olishda xatolik:', error);
        setLoading(false);
      });
  }, []);

  // Sana va vaqtni formatlash: yyyy.mm.dd HH:mm
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  const getStatusBadge = (status) => {
    const commonStyle = {
      color: '#fff',
      padding: '6px 20px',
      borderRadius: '6px',
      fontWeight: 'bold',
      display: 'inline-block',
      letterSpacing: '0.2px',
      minWidth: '120px',
      textAlign: 'center',
    };

    switch (status?.toLowerCase()) {
      case "pending":
        return <span style={{ ...commonStyle, backgroundColor: 'red' }}>Yangi buyurtma</span>;
      case "cooking":
        return <span style={{ ...commonStyle, backgroundColor: 'orange' }}>Tayyorlanmoqda</span>;
      case "ready":
        return <span style={{ ...commonStyle, backgroundColor: 'green' }}>Buyurtma Tayyor</span>;
      case "cancelled":
        return <span style={{ ...commonStyle, backgroundColor: '#555' }}>Bekor qilindi</span>;
      case "completed":
        return <span style={{ ...commonStyle, backgroundColor: '#228B22' }}>Bajarildi</span>;
      default:
        return <span style={{ ...commonStyle, backgroundColor: 'gray' }}>Nomaʼlum</span>;
    }
  };

  if (loading) {
    return <div style={styles.loading}>Yuklanmoqda...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Buyurtmalar ro'yxati</h2>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Stol raqami</th>
              <th style={styles.th}>Mahsulotlar</th>
              <th style={styles.th}>Jami narx</th>
              <th style={styles.th}>Xizmat xaqi</th>
              <th style={styles.th}>Umumiy to'lov</th>
              <th style={styles.th}>Vaqt</th>
              <th style={styles.th}>Holati</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id || index}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{order.tableNumber || 'Nomaʼlum'}</td>
                <td style={styles.td}>
                  {order.orderItems?.map(item => `${item.product.name} (${item.count})`).join(', ')}
                </td>
                <td style={styles.td}>{order.totalPrice} so'm</td>
                <td style={styles.td}>{Math.round(order.totalPrice * 0.04)} so'm</td>
                <td style={styles.td}>{Math.round(order.totalPrice * 1.04)} so'm</td>
                {/* Vaqt ustuni uchun maxsus stil qo‘lladik */}
                <td style={styles.timeTd}>{formatDateTime(order.createdAt)}</td>
                <td style={styles.td}>{getStatusBadge(order.status)}</td>
              </tr>
            ))}
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
  loading: {
    textAlign: 'center',
    marginTop: '40px',
    fontSize: '18px',
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
  // Vaqt ustuni uchun kenglik va matnni bo‘linmasligi uchun stil
  timeTd: {
    padding: '12px',
    borderBottom: '1px solid #eee',
    wordBreak: 'break-word',
    width: '150px',        // kenglikni xohlagancha oshiring
    whiteSpace: 'nowrap',  // vaqtni qator bo‘lib chiqmasligi uchun
  },
};

export default Orders;
