import { useState, useEffect } from "react";
import axios from "axios";
import NepaliDate from "nepali-date";
import toast from "react-hot-toast";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import { useSelector } from "react-redux";
import { backendRoot } from "../constants";

const AddTransaction = () => {
  const { billbooks: billbookOptions, bills } = useSelector(
    (store) => store.bill
  );
  const currentDate = new NepaliDate();

  const [billbookName, setBillbookName] = useState("");
  const [billNumber, setBillNumber] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const billbookId = billbookOptions.find(
      (billbook) => billbook.title === billbookName
    )?.billbook_id;
    
    const billData = bills.find(
      (bill) => bill.bill_id === parseInt(billNumber)
    );
    if (!billbookId || !billNumber || !paidAmount || !date) {
      toast.error("Please fill out all fields.");
      return;
    }

    if((billData.due_amount - paidAmount) < 0){
      toast.error("Paid Amount not valid")
      return;
    }

    const [year, month, day] = date.split("-").map(Number);
    if (
      parseInt(year) > currentDate.year ||
      (parseInt(year) === currentDate.year &&
        parseInt(month) > currentDate.month + 1) ||
      (parseInt(year) === currentDate.year &&
        parseInt(month) === currentDate.month + 1 &&
        parseInt(day) > currentDate.day)
    ) {
      toast.error("Invalid date.");
      return;
    }

    setLoading(true);

    try {
      const transactionData = await axios.post(
        `${backendRoot}/api/v1/transaction/createtransaction`,
        {
          billId: parseInt(billNumber),
          billbookId: parseInt(billbookId),
          amountPaid: parseInt(paidAmount),
          date,
        },
        {
          withCredentials: true,
        }
      );
      if (!transactionData?.data.success) {
        toast.error("Failed to add Transaction. Please try again.");
        return;
      }
      toast.success("Transaction added successfully!");
      const billUpdate = await axios.put(
        `${backendRoot}/api/v1/bill/updateBill`,
        {
          billId: parseInt(billData.bill_id),
          billbookId: parseInt(billData.billbook_id),
          dueAmount: parseInt(billData.due_amount) - parseInt(paidAmount),
          isPending,
          date,
        },
        {
          withCredentials: true,
        }
      );

      if (!billUpdate.data.success) {
        toast.error("Failed to update bill. Please try again.");
        return;
      }
      toast.success("Bill updated successfully!");

      setBillbookName("");
      setBillNumber("");
      setPaidAmount("");
      setIsPending(true);
      setDate("");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add Transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Add a New Transaction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* BillBook ID Select */}
        <div className="flex flex-col">
          <label
            htmlFor="billbookId"
            className="font-semibold text-gray-700 mb-2"
          >
            BillBook
          </label>
          <select
            id="billbookId"
            value={billbookName}
            onChange={(e) => setBillbookName(e.target.value)}
            className="p-3 rounded-md border focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          >
            <option value="">Select a BillBook</option>
            {billbookOptions?.map((billbook) => (
              <option key={billbook?.id} value={billbook.id}>
                {billbook.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="billId" className="font-semibold text-gray-700 mb-2">
            BillId
          </label>
          <select
            id="billId"
            value={billNumber}
            onChange={(e) => setBillNumber(e.target.value)}
            className="p-3 rounded-md border focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          >
            <option value="">Select a Bill</option>
            {bills
              .filter(
                (bill) =>
                  bill.billbook_id ===
                  billbookOptions.filter(
                    (billbook) => billbook.title === billbookName
                  )[0]?.billbook_id
              )
              ?.map((bill) => (
                <option key={bill?.bill_id} value={bill.bill_id}>
                  {bill.bill_number}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="paidAmount"
            className="font-semibold text-gray-700 mb-2"
          >
            Due Amount
          </label>
          <input
            type="text"
            id="dueAmount"
            value={bills?.find(
              (bill) => bill?.bill_id === parseInt(billNumber)
            )?.due_amount}
            readOnly
            className="p-3 rounded-md border bg-gray-100 text-gray-500 focus:outline-none"
            placeholder="0"
          />
        </div>

        {/* Paid Amount */}
        <div className="flex flex-col">
          <label
            htmlFor="paidAmount"
            className="font-semibold text-gray-700 mb-2"
          >
            Paid Amount
          </label>
          <input
            type="text"
            id="paidAmount"
            value={paidAmount}
            onChange={(e) => setPaidAmount(parseInt(e.target.value))}
            className="p-3 rounded-md border focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter Paid Amount"
            required
          />
        </div>

        

        {/* Pending Checkbox */}
        <div className="flex flex-col">
          <label htmlFor="pending" className="font-semibold text-gray-700 mb-2">
            Pending
          </label>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                name="pending"
                value="true"
                checked={isPending === true}
                onChange={() => setIsPending(true)}
                className="mr-2"
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="pending"
                value="false"
                checked={isPending === false}
                onChange={() => setIsPending(false)}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        {/* Date Input */}
        <div className="flex flex-col">
          <label htmlFor="date" className="font-semibold text-gray-700 mb-2">
            Date
          </label>
          <NepaliDatePicker
            inputClassName="p-3 rounded-md border outline-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={date}
            onChange={(value) => setDate(value)}
            options={{ calenderLocale: "en", valueLocale: "en" }}
            placeholder="Pick a Date"
          />
        </div>

        <button
          type="submit"
          className={`w-full p-3 text-white rounded-lg ${
            loading ? "bg-gray-400" : "bg-blue-600"
          } ${loading ? "cursor-not-allowed" : "hover:bg-blue-700"}`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Bill"}
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
