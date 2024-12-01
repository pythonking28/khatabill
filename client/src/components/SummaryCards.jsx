import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const SummaryCards = () => {
  const {bills, billbooks, transactions} = useSelector(store => store.bill)
  console.log(bills)
  console.log(billbooks)
  console.log(transactions)
  return (
    <div>

    <div className="container mx-auto p-8 bg-gray-50">
      {/* Title and Description */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Summary of Billbooks</h1>
        <p className="text-lg text-gray-600">An overview of your business's billbooks and transactions.</p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Billbooks Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
          <h3 className="text-xl font-semibold">Total Billbooks</h3>
          <p className="text-4xl font-bold mt-2">{billbooks.length}</p>
          <p className="mt-2 opacity-75">Total number of active billbooks.</p>
        </div>

        {/* Total Bills Card */}
        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
          <h3 className="text-xl font-semibold">Total Bills</h3>
          <p className="text-4xl font-bold mt-2">{bills.length}</p>
          <p className="mt-2 opacity-75">All generated bills count.</p>
        </div>

        {/* Pending Bills Card */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
          <h3 className="text-xl font-semibold">Pending Bills</h3>
          <p className="text-4xl font-bold mt-2">{bills.filter(bill=>bill.pending).length}</p>
          <p className="mt-2 opacity-75">Bills awaiting payment.</p>
        </div>

        {/* Completed Transactions Card */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
          <h3 className="text-xl font-semibold">Completed Transactions</h3>
          <p className="text-4xl font-bold mt-2">{bills.filter(bill=>!bill.pending).length}</p>
          <p className="mt-2 opacity-75">Completed and settled bills.</p>
        </div>

        {/* Total amoount Card */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-700 text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
          <h3 className="text-xl font-semibold">Total Sales</h3>
          <p className="text-4xl font-bold mt-2">₹{bills.reduce((acc,item)=> acc+parseFloat(item.original_amount), 0)}</p>
          <p className="mt-2 opacity-75">Total revenue generated from bills.</p>
        </div>
        {/* Total Revenue Card */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-700 text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
          <h3 className="text-xl font-semibold">Total Revenue</h3>
          <p className="text-4xl font-bold mt-2">₹{transactions.reduce((acc,item)=> acc+parseFloat(item.amount_paid), 0)}</p>
          <p className="mt-2 opacity-75">Total revenue generated from bills.</p>
        </div>

        {/* Due Payments Card */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
          <h3 className="text-xl font-semibold">Due Payments</h3>
          <p className="text-4xl font-bold mt-2">₹{bills.reduce((acc,item)=> acc + parseFloat(item.original_amount),0) - transactions.reduce((acc,item)=> acc+parseFloat(item.amount_paid), 0)}</p>
          <p className="mt-2 opacity-75">Amount pending to be collected.</p>
        </div>
        {/* Orders Pending Card */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
          <h3 className="text-xl font-semibold">Orders Pending</h3>
          <p className="text-4xl font-bold mt-2">{bills.filter(bill=> bill.status === "order").length}</p>
          <p className="mt-2 opacity-75">Orders that need to be completed.</p>
        </div>
      </div>
    </div>

    </div>
  )
}
export default SummaryCards