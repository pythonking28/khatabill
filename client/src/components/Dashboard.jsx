import { MdOutlineNoteAdd, MdOutlineLibraryBooks, MdOutlinePendingActions } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Importing useSelector
import useGetMyBills from "../hooks/useGetMyBills";
import useGetMyBillbooks from "../hooks/useGetMyBillbooks";
import useGetMyTransactions from "../hooks/useGetMyTransactions";

const Dashboard = () => {
  const navigate = useNavigate();
  const { bills, billbooks, transactions } = useSelector(store => store.bill); // Accessing Redux store for bills, billbooks, and transactions

  useGetMyBills();
  useGetMyBillbooks();
  useGetMyTransactions();

  // Calculate the pending bills and total revenue
  const pendingBills = bills.filter(bill => bill.pending).length;
  const totalRevenue = transactions.reduce((acc, item) => acc + parseFloat(item.amount_paid), 0);
  const duePayments = bills.reduce((acc, item) => acc + parseFloat(item.original_amount), 0) - totalRevenue;

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Summary Section */}
        <div className="border border-gray-300 rounded-2xl bg-gradient-to-br from-sky-600 to-sky-900 shadow-xl">
          <div className="flex flex-col gap-8 p-8">
            <h1 className="text-3xl text-white font-bold text-center uppercase tracking-wide">Summary</h1>

            <div className="grid grid-cols-2 gap-6">
              {/* Card for Total Billbooks */}
              <div className="relative flex flex-col items-center bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 duration-200 ease-out">
                <MdOutlineLibraryBooks size={48} className="text-white opacity-20 absolute top-4 right-4" />
                <p className="uppercase text-sm font-medium tracking-wider opacity-90 mb-1">Total Billbooks</p>
                <p className="text-3xl font-bold">{billbooks.length}</p>
                <span className="text-xs opacity-70 mt-2">Tracking all active billbooks</span>
              </div>

              {/* Card for Total Bills */}
              <div className="relative flex flex-col items-center bg-gradient-to-br from-green-500 to-green-700 text-white p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 duration-200 ease-out">
                <MdOutlineNoteAdd size={48} className="text-white opacity-20 absolute top-4 right-4" />
                <p className="uppercase text-sm font-medium tracking-wider opacity-90 mb-1">Total Bills</p>
                <p className="text-3xl font-bold">{bills.length}</p>
                <span className="text-xs opacity-70 mt-2">All generated bills count</span>
              </div>

              {/* Card for Pending Bills */}
              <div className="relative flex flex-col items-center bg-gradient-to-br from-yellow-500 to-yellow-700 text-white p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 duration-200 ease-out">
                <MdOutlinePendingActions size={48} className="text-white opacity-20 absolute top-4 right-4" />
                <p className="uppercase text-sm font-medium tracking-wider opacity-90 mb-1">Pending Bills</p>
                <p className="text-3xl font-bold">{pendingBills}</p>
                <span className="text-xs opacity-70 mt-2">Bills awaiting clearance</span>
              </div>

              {/* Card for Total Revenue */}
              <div className="relative flex flex-col items-center bg-gradient-to-br from-teal-500 to-teal-700 text-white p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 duration-200 ease-out">
                <MdOutlinePendingActions size={48} className="text-white opacity-20 absolute top-4 right-4" />
                <p className="uppercase text-sm font-medium tracking-wider opacity-90 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold">₹{totalRevenue}</p>
                <span className="text-xs opacity-70 mt-2">Revenue from all settled transactions</span>
              </div>
            </div>

            {/* Link to More Details */}
            <Link
              to="/home/summary"
              className="flex justify-center items-center w-fit mx-auto bg-gradient-to-br from-pink-500 to-pink-700 text-white py-3 px-6 rounded-full shadow-md transform transition-all hover:scale-105 duration-200 ease-out mt-6"
            >
              <p className="uppercase text-lg font-semibold tracking-wider">View More</p>
            </Link>
          </div>
        </div>

        {/* Add Bill Card Section */}
        <div className="flex justify-center">
          <div className="w-full max-w-md rounded-3xl bg-gradient-to-br from-[#e887a9f5] to-[#e4637b] text-white p-8 shadow-lg transform transition-all hover:scale-105 duration-200 ease-out">
            <h2 className="text-center text-2xl font-semibold mb-4">Add New Entry</h2>
            <p className="text-center text-sm opacity-80 mb-6">
              Easily create new billbooks or add individual bills for streamlined transaction management.
            </p>

            <div className="flex flex-col gap-4">
              <Link
                to="/home/add-billbook"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#ec2d4f] to-[#d91b3d] py-4 rounded-xl shadow-md transform transition-all hover:scale-105 duration-200 ease-out"
              >
                <MdOutlineNoteAdd size={24} />
                <span onClick={() => navigate("/home/add-billbook")} className="font-semibold text-lg">Add Billbook</span>
              </Link>

              <Link
                to="/home/add-bill"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#ec2d4f] to-[#d91b3d] py-4 rounded-xl shadow-md transform transition-all hover:scale-105 duration-200 ease-out"
              >
                <MdOutlineNoteAdd size={24} />
                <span onClick={() => navigate("/home/add-bill")} className="font-semibold text-lg">Add Bill</span>
              </Link>
              <Link
                to="/home/add-transaction"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#ec2d4f] to-[#d91b3d] py-4 rounded-xl shadow-md transform transition-all hover:scale-105 duration-200 ease-out"
              >
                <MdOutlineNoteAdd size={24} />
                <span onClick={() => navigate("/home/add-transaction")} className="font-semibold text-lg">Add Transaction</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
