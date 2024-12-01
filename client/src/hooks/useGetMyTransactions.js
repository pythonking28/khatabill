import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { gettransactions } from "../redux/billSlice";
import { backendRoot } from "../components/constants";

const useGetMyTransactions = () => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const fetchTransactions = async () => {
        try {
            const res = await axios.get(`${backendRoot}/api/v1/transaction/getalltransaction`,{
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