import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getbills } from "../redux/billSlice";

const useGetMyBills = () => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const fetchBills = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/v1/bill/getallbill",{
                withCredentials: true
            })
            dispatch(getbills(res.data.bills))
        } catch (error) {
            console.log(error)
        }
    }
    fetchBills()
  },[])
}
export default useGetMyBills