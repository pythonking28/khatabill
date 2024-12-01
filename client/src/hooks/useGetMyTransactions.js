import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { gettransactions } from "../redux/billSlice";

const useGetMyTransactions = () => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const fetchTransactions = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/v1/transaction/getalltransaction",{
                withCredentials: true
            })
            dispatch(gettransactions(res.data.message))
        } catch (error) {
            console.log(error)
        }
    }
    fetchTransactions()
  },[])
}
export default useGetMyTransactions