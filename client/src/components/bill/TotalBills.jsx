import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaMoneyBillWave,
  FaClock,
  FaUser,
  FaCheckCircle,
  FaExclamationCircle,
  FaBook,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TotalBills = () => {
  const { bills, billbooks } = useSelector((store) => store.bill);
  const [filter, setFilter] = useState("all"); // Filter state: all, pending, completed, ordered, purchased
  const [editBillId, setEditBillId] = useState(null); // Track the bill being edited
  const [editFields, setEditFields] = useState({}); // Track editable field values
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!bills || bills.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">No bills available.</p>
      </div>
    );
  }

  // Filtered bills based on selected filter
  const filteredBills =
    filter === "all"
      ? bills
      : bills.filter((bill) =>
          filter === "pending"
            ? bill.pending
            : filter === "completed"
            ? !bill.pending
            : bill.status === filter
        );

  const handleEditClick = (bill) => {
    setEditBillId(bill.bill_id);
    setEditFields({
      bill_number: bill.bill_number,
      customer_name: bill.customer_name,
      original_amount: bill.original_amount,
      paid_amount: bill.original_amount - bill.due_amount
    });
    setIsModalOpen(true); // Open the modal
  };

  const handleFieldChange = (field, value) => {
    setEditFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put('http://localhost:8000/api/v1/bill//updatebill',{
        billId: editBillId,
        originalAmount: parseFloat(editFields.original_amount),
        dueAmount : parseFloat(editFields.original_amount) - parseFloat(editFields.paid_amount),
        customerName : editFields.customer_name
      },{
        withCredentials: true
      })
      console.log(res)
      navigate("/home/dashboard")
    } catch (error) {
      console.log(error)
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (billId) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/bill//deletebill/${billId}`,{
        withCredentials: true
      })
      navigate("/home/dashboard")
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen py-10 px-6">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Total Bills
      </h2>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-10">
        {["all", "pending", "completed", "order", "purchased"].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded-md font-medium ${
              filter === status
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600 hover:bg-blue-100"
            }`}
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Filtered Bills */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBills.map((bill) => {
          const billbook = billbooks.find(
            (billbook) => billbook.billbook_id === bill.billbook_id
          );
          return (
            <div
              key={bill.bill_id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 transform hover:scale-105 transition-transform duration-300 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    bill.pending
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {bill.pending ? "Pending" : "Completed"}
                </span>
              </div>

              {/* Card Content */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-gray-100 p-4 rounded-full">
                  <FaMoneyBillWave className="text-green-500 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-700">
                    Bill #{bill.bill_number}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Created At: {bill.created_at}
                  </p>
                </div>
              </div>

              <div className="mb-4 flex items-center text-gray-600 text-sm">
                <FaBook className="text-gray-500 mr-2" />
                Billbook: {billbook ? billbook.title : "Unknown"}
              </div>

              <div className="mb-4">
                <p className="flex items-center text-gray-600 text-sm">
                  <FaUser className="text-gray-500 mr-2" /> {bill.customer_name}
                </p>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-gray-600 text-sm">Original Amount:</p>
                  <p className="text-lg font-bold text-gray-800">
                    Rs. {bill.original_amount}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Due Amount:</p>
                  <p className="text-lg font-bold text-red-500">
                    Rs. {bill.due_amount}
                  </p>
                </div>
              </div>


              <div className="mb-4">
                <p className="text-gray-600 text-sm">
                  <strong>Discount:</strong> Rs. {bill.discount}
                </p>
              </div>

              {/* Status */}
              <div className="mt-4 flex items-center space-x-2">
                {bill.status === "purchased" ? (
                  <FaCheckCircle className="text-green-500 text-lg" />
                ) : (
                  <FaExclamationCircle className="text-red-500 text-lg" />
                )}
                <p className="text-gray-600 text-sm">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      bill.status === "purchased"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {bill.status}
                  </span>
                </p>
              </div>

              <div className="flex space-x-4 mt-4">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                  onClick={() => handleEditClick(bill)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={() => handleDelete(bill.bill_id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h4 className="text-lg font-bold mb-4">Update Bill</h4>
            <div className="flex flex-col space-y-2">
              {Object.entries(editFields).map(([field, value]) => (
                <div>
                  <label>{`${field} : `}</label>
                <input
                  key={field}
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleFieldChange(field, e.target.value)
                  }
                  placeholder={field.replace("_", " ").toUpperCase()}
                  className="border border-gray-300 rounded px-2 py-2 w-4/5"
                />
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={handleUpdate}
              >
                Save
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalBills;
