import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { backendRoot } from "../components/constants"

const useVerifyUser = () => {
    const navigate = useNavigate()
  useEffect(()=>{
    const verifyUser = async() => {
        try {
            const res = await axios.get(`${backendRoot}/api/v1/user/verifyuser`,{
                withCredentials: true
              })
            if(!res.data.success){
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
    verifyUser()
  },[])
}
export default useVerifyUser