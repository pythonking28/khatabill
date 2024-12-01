import { useState } from "react";
import axios from "axios";
import NepaliDate from "nepali-date";
import toast from "react-hot-toast";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import { backendRoot } from "../constants";

const AddBillBook = () => {
  const currentDate = new NepaliDate()
  const [title, setTitle] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title, totalPages, date)
    const [year, month, day] = date.split("-").map(Number)



    // Basic Validation
    if (!title || !totalPages || !date) {
      toast.error("Please fill out all fields.");
      return;
    }

    if(parseInt(year) > currentDate.year ){
      toast.error("Year is not valid")
      return;
    }
    if(parseInt(year) == currentDate.year && parseInt(month) > (currentDate.month + 1) ){
      toast.error("Month is not valid")
      return;
    }
    if(parseInt(year) == currentDate.year && parseInt(month) == (currentDate.month + 1) && parseInt(day) > currentDate.day){
      toast.error("Day is not valid")
      return;
    }

    if (parseInt(totalPages, 10) <= 0) {
      toast.error("Total pages must be a positive number.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${backendRoot}/api/v1/billbook/create`, {
        title,
        totalPages: parseInt(totalPages, 10),
        date,
      },{ withCredentials: true });

      console.log(res)

      if(!res.data.success){
        toast.error("Failed to add BillBook. Please try again.");
        return;
      }

      toast.success("BillBook added successfully!");
      setTitle("");
      setTotalPages("");
      setDate("");
    } catch (err) {
      console.log(err)
      toast.error("Failed to add BillBook. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Add a New BillBook
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div className="flex flex-col">
          <label htmlFor="title" className="font-semibold text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 rounded-md border focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter billbook title"
            required
          />
        </div>

        {/* Total Pages Input */}
        <div className="flex flex-col">
          <label htmlFor="totalPages" className="font-semibold text-gray-700 mb-2">
            Total Pages
          </label>
          <input
            type="number"
            id="totalPages"
            value={totalPages}
            onChange={(e) => setTotalPages(e.target.value)}
            className="p-3 rounded-md border focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter total pages"
            required
          />
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
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 bg-blue-500 text-white font-bold rounded-md shadow-md transform transition-transform hover:scale-105 hover:shadow-lg duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add BillBook"}
        </button>
      </form>
    </div>
  );
};

export default AddBillBook;
