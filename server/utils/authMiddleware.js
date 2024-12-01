import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    console.log(re.cookies)
    try {
        if(!token){
            return res.status(401).json({
                message: "Unauthorized Access",
                success: false
            })
        }
        const decodedUser = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        if(!decodedUser.userId){
            return res.status(401).json({
                message: "Invalid User",
                success: false
            })
        }
        req.userId = decodedUser.userId
        next()
    } catch (error) {
        console.log(error)
    }
    
}

export default authMiddleware