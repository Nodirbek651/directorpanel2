import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initialFinancialData = {
  revenue: 0,
  expenses: {
    productCost: 0,
    laborCost: 0,
    utilityCost: 0,
    otherCost: 0,
  },
  profit: 0,
};

const Finance = () => {
  const [data, setData] = useState(initialFinancialData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersRes = await axios.get('https://suddocs.uz/order');
        const expensesRes = await axios.get('https://suddocs.uz/order');

        const orders = ordersRes.data;
        const expenses = expensesRes.data;

       
        const revenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

        
        const expenseCategories = {
          productCost: 0,
          laborCost: 0,
          utilityCost: 0,
          otherCost: 0,
        };

        expenses.forEach((item) => {
          switch (item.category) {
            case 'Mahsulot':
              expenseCategories.productCost += item.amount;
              break;
            case 'Xodim':
              expenseCategories.laborCost += item.amount;
              break;
            case 'Kommunal':
              expenseCategories.utilityCost += item.amount;
              break;
            case 'Boshqa':
              expenseCategories.otherCost += item.amount;
              break;
            default:
              break;
          }
        });

       
        const totalExpense =
          expenseCategories.productCost +
          expenseCategories.laborCost +
          expenseCategories.utilityCost +
          expenseCategories.otherCost;

        const profit = revenue - totalExpense;

        
        setData({
          revenue,
          expenses: expenseCategories,
          profit,
        });
      } catch (err) {
        console.error('Maʼlumotlarni olishda xatolik:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Moliyaviy Hisobotlar</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ padding: '10px', backgroundColor: '#f4f4f4', borderRadius: '8px', width: '48%' }}>
          <h3>Jami Daromad</h3>
          <p>{data.revenue.toLocaleString()} so‘m</p>
        </div>
        <div style={{ padding: '10px', backgroundColor: '#f4f4f4', borderRadius: '8px', width: '48%' }}>
          <h3>Jami Xarajatlar</h3>
          <p>{(
            data.expenses.productCost +
            data.expenses.laborCost +
            data.expenses.utilityCost +
            data.expenses.otherCost
          ).toLocaleString()} so‘m</p>
        </div>
      </div>

      <div style={{ padding: '10px', backgroundColor: '#ffe6e6', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Oylik Foyda / Zarar</h3>
        <p style={{ color: data.profit >= 0 ? 'green' : 'red' }}>
          {data.profit.toLocaleString()} so‘m
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Xarajatlar Tahlili</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Kategoriya</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Miqdor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Mahsulot xarajatlari</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{data.expenses.productCost.toLocaleString()} so‘m</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Xodimlar maoshi</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{data.expenses.laborCost.toLocaleString()} so‘m</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Kommunal xarajatlar</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{data.expenses.utilityCost.toLocaleString()} so‘m</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Boshqa xarajatlar</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{data.expenses.otherCost.toLocaleString()} so‘m</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Finance;
