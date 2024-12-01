import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

const Graph = () => {

  const { bills, transactions } = useSelector(store => store.bill);

  // Initialize arrays for storing monthly data
  const revenuePerMonth = Array(12).fill(0);
  const paymentReceivedPerMonth = Array(12).fill(0);
  const paidBillsPerMonth = Array(12).fill(0);
  const unpaidBillsPerMonth = Array(12).fill(0);

  let totalRevenue = 0;
  let totalPendingRevenue = 0;

  const billPayments = {};

  transactions.forEach((transaction) => {
    const billId = transaction.bill_id;
    const paymentAmount = parseFloat(transaction.amount_paid);

    if (!billPayments[billId]) {
      billPayments[billId] = 0; 
    }

    billPayments[billId] += paymentAmount;
  });

  bills.forEach((bill) => {
    const billAmount = parseFloat(bill.original_amount);
    const dueAmount = parseFloat(bill.due_amount);
    const billId = bill.bill_id;
    const month = new Date(bill.created_at).getMonth();

    revenuePerMonth[month] += billAmount;
    paymentReceivedPerMonth[month] += (billAmount - dueAmount); 

    const amountPaid = billPayments[billId] || 0;

    if (bill.pending === false) {
      paidBillsPerMonth[month] += 1;
    } else {
      unpaidBillsPerMonth[month] += 1;
    }

    totalRevenue += billAmount;
    totalPendingRevenue += dueAmount;
  });

  const billStatusTrendData = {
    labels: ['Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'],
    datasets: [
      {
        label: 'Paid Bills',
        data: paidBillsPerMonth,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
      {
        label: 'Partially Paid Bills',
        data: unpaidBillsPerMonth,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 2,
      },
    ],
  };

  const lineChartData = {
    labels: ['Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'],
    datasets: [
      {
        label: 'Total Deals (Revenue)',
        data: revenuePerMonth,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'Total Payment Received',
        data: paymentReceivedPerMonth,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  // Chart Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 20,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxRotation: 45,
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 space-y-12">
      <h2 className="text-3xl font-semibold text-center">Business Insights</h2>

      <div className="space-y-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-center text-gray-800">Monthly Revenue Trend</h3>
          <div className="mt-4 w-full h-96">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-center text-gray-800">Bill Status Trend</h3>
          <div className="mt-4 w-full h-96">
            <Bar data={billStatusTrendData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
