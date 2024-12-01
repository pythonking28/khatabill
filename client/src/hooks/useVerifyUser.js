import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { backendRoot } from "../components/constants"
import { useDispatch } from "react-redux"
import { setIsUserLoggedIn } from "../redux/billSlice"

const useVerifyUser = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
  useEffect(()=>{
    const verifyUser = async() => {
        try {
            const res = await axios.get(`${backendRoot}/api/v1/user/verifyuser`,{
                withCredentials: true
              })
              console.log(res)
            if(!res.data.success){
                navigate('/')
                dispatch(setIsUserLoggedIn(false))

            }else{
              dispatch(setIsUserLoggedIn(true))
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    verifyUser()
  },[])
}
export default useVerifyUser