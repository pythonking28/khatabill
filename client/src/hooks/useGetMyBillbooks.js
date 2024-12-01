import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getbillbooks } from "../redux/billSlice";
import { backendRoot } from "../components/constants";

const useGetMyBillbooks = () => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const fetchBillbooks = async () => {
        try {
            const res = await axios.get(`${backendRoot}/api/v1/billbook/getallbillbook`,{
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