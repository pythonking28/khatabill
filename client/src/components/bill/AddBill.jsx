import { useState, useEffect } from "react";
import axios from "axios";
import NepaliDate from "nepali-date";
import toast from "react-hot-toast";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import { backendRoot } from "../constants";

const AddBill = () => {
  const currentDate = new NepaliDate();

  // States for fields
  const [billbookName, setBillbookName] = useState("");
  const [billbookOptions, setBillbookOptions] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [billNumber, setBillNumber] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [status, setStatus] = useState("purchased");
  const [isPending, setIsPending] = useState(true);
  const [discount, setDiscount] = useState(0);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBillbooks = async () => {
      try {
        const res = await axios.get(
          `${backendRoot}/api/v1/billbook/getallbillbook`,
          {
            withCredentials: true,
          }
        );
        setBillbookOptions(res?.data?.billbook);
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch BillBooks.");
      }
    };

    fetchBillbooks();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();

    const billbookId = billbookOptions.find(
      (billbook) => billbook.title === billbookName
    )?.billbook_id;

    // Validate inputs
    if (
      !billbookId ||
      !customerName ||
      !billNumber ||
      !totalAmount ||
      !paidAmount ||
      !date
    ) {
      toast.error("Please fill out all fields.");
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
      const res = await axios.post(
        `${backendRoot}/api/v1/bill/createbill`,
        {
          billbookId: parseInt(billbookId),
          customerName,
          billNumber: parseInt(billNumber),
          totalAmount: parseFloat(totalAmount),
          dueAmount: parseFloat(totalAmount - paidAmount),
          status,
          isPending,
          discount: parseFloat(discount),
          date,
        },
        { withCredentials: true }
      );
      if (!res?.data.success) {
        toast.error(res.data.message || "Failed to create bill. Please Try Later");
        return;
      }

      if(res.data.success){
        const transactionData = await axios.post(`${backendRoot}/api/v1/transaction/createtransaction`,{billId: parseInt(res?.data.data), amountPaid: parseInt(paidAmount)},{
          withCredentials: true
        })
        if(!transactionData?.data.success){
          toast.error("Failed to add Bill. Please try again.");
          return;
        }
      }
       
      


      toast.success("Bill added successfully!");
      setBillbookName("");
      setCustomerName("");
      setBillNumber("");
      setTotalAmount("");
      setPaidAmount("");
      setStatus([]);
      setIsPending(true);
      setDiscount(0);
      setDate("");
    } catch (err) {
      console.log(err);
      toast.error( err.response.data.message ||"Failed to add Bill. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Add a New Bill
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
              <option key={billbook?.billbook_id} value={billbook.id}>
                {billbook.title}
              </option>
            ))}
          </select>
        </div>

        {/* Customer Name */}
        <div className="flex flex-col">
          <label
            htmlFor="customerName"
            className="font-semibold text-gray-700 mb-2"
          >
            Customer Name
          </label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="p-3 rounded-md border focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter Customer Name"
            required
          />
        </div>

        {/* Bill Number */}
        <div className="flex flex-col">
          <label
            htmlFor="billNumber"
            className="font-semibold text-gray-700 mb-2"
          >
            Bill Number
          </label>
          <input
            type="text"
            id="billNumber"
            value={billNumber}
            onChange={(e) => setBillNumber(e.target.value)}
            className="p-3 rounded-md border focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter Bill Number"
            required
          />
        </div>

        {/* Total Amount */}
        <div className="flex flex-col">
          <label
            htmlFor="totalAmount"
            className="font-semibold text-gray-700 mb-2"
          >
            Total Amount
          </label>
          <input
            type="text"
            id="totalAmount"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            className="p-3 rounded-md border focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter Total Amount"
            required
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
            onChange={(e) => setPaidAmount(e.target.value)}
            className="p-3 rounded-md border focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter Due Amount"
            required
          />
        </div>

        {/* Status Checkboxes */}
        <div className="flex flex-col">
          <label htmlFor="status" className="font-semibold text-gray-700 mb-2">
            Status
          </label>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                value="order"
                checked={status === "order"}
                onChange={() => setStatus("order")}
                className="mr-2"
              />
              Order
            </label>
            <label>
              <input
                type="radio"
                value="purchased"
                checked={status === "purchased"}
                onChange={() => setStatus("purchased")}
                className="mr-2"
              />
              Purchased
            </label>
          </div>
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

        {/* Discount */}
        <div className="flex flex-col">
          <label
            htmlFor="discount"
            className="font-semibold text-gray-700 mb-2"
          >
            Discount
          </label>
          <input
            type="text"
            id="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="p-3 rounded-md border focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter Discount Amount (if any)"
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

export default AddBill;
