import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getbillbooks } from "../redux/billSlice";

const useGetMyBillbooks = () => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const fetchBillbooks = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/v1/billbook/getallbillbook",{
                withCredentials: true
            })
            dispatch(getbillbooks(res.data.billbook))
        } catch (error) {
            console.log(error)
        }
    }
    fetchBillbooks()
  },[])
}
export default useGetMyBillbooks