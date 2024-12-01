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
              console.log(res)
            if(!res.data.success){
                navigate('/')
            }
            navigate('/home/dashboard')
        } catch (error) {
            console.log(error)
        }
    }
    verifyUser()
  },[])
}
export default useVerifyUser